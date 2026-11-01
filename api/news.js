// 네이버 뉴스 검색을 대신 불러오는 서버 기능 (Vercel)
// GET /api/news?q=검색어1,검색어2&ex=빼는말1,빼는말2
// - 키는 Vercel 환경변수 NAVER_CLIENT_ID, NAVER_CLIENT_SECRET 에만 둔다 (코드·브라우저에 노출하지 않음)
// - 기본은 NAVER API HUB 방식. 예전 개발자센터 키를 쓸 때만 NAVER_API_MODE=legacy
// - 같은 소식을 다룬 기사는 하나로 묶고 매체 수(media)와 관련 기사(rel)를 붙여 돌려준다
// - 결과는 Vercel 캐시에 10분 보관해서 여러 사람이 열어도 네이버 호출은 적게 나간다

const HUB = "https://naverapihub.apigw.ntruss.com/search/v1/news";
const LEGACY = "https://openapi.naver.com/v1/search/news.json";

const PRESS = {
  "chosun.com": "조선일보", "joongang.co.kr": "중앙일보", "donga.com": "동아일보", "hani.co.kr": "한겨레", "khan.co.kr": "경향신문",
  "hankookilbo.com": "한국일보", "kmib.co.kr": "국민일보", "seoul.co.kr": "서울신문", "segye.com": "세계일보", "munhwa.com": "문화일보",
  "mk.co.kr": "매일경제", "hankyung.com": "한국경제", "sedaily.com": "서울경제", "mt.co.kr": "머니투데이", "edaily.co.kr": "이데일리",
  "fnnews.com": "파이낸셜뉴스", "asiae.co.kr": "아시아경제", "heraldcorp.com": "헤럴드경제", "etnews.com": "전자신문", "zdnet.co.kr": "지디넷코리아",
  "ddaily.co.kr": "디지털데일리", "yna.co.kr": "연합뉴스", "yonhapnewstv.co.kr": "연합뉴스TV", "newsis.com": "뉴시스", "news1.kr": "뉴스1",
  "kbs.co.kr": "KBS", "imbc.com": "MBC", "sbs.co.kr": "SBS", "jtbc.co.kr": "JTBC", "ytn.co.kr": "YTN", "mbn.co.kr": "MBN", "ichannela.com": "채널A",
  "nongmin.com": "농민신문", "agrinet.co.kr": "한국농어민신문", "aflnews.co.kr": "농수축산신문", "farminsight.net": "팜인사이트",
  "korea.kr": "대한민국 정책브리핑", "dongascience.com": "동아사이언스", "hellodd.com": "헬로디디", "bosa.co.kr": "보안뉴스",
  "spotvnews.co.kr": "스포티비뉴스", "osen.co.kr": "OSEN", "sportschosun.com": "스포츠조선", "isplus.com": "일간스포츠", "xportsnews.com": "엑스포츠뉴스",
};

const clean = (s = "") => s.replace(/<[^>]+>/g, "").replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
function press(url = "") {
  try {
    const h = new URL(url).hostname.replace(/^www\.|^m\.|^news\.|^biz\.|^sports\./, "");
    const k = Object.keys(PRESS).find((d) => h === d || h.endsWith("." + d));
    return k ? PRESS[k] : h.split(".")[0];
  } catch { return "뉴스"; }
}
function hash(s) { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
const words = (t) => new Set(t.replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter((w) => w.length >= 2));
// 제목 단어가 3개 이상 겹치고, 짧은 쪽 제목의 60% 이상이 같으면 같은 소식으로 본다
function similar(a, b) { let n = 0; for (const w of a) if (b.has(w)) n++; return n >= 3 ? n / Math.min(a.size, b.size || 1) : 0; }

async function search(query, { id, secret, legacy }) {
  const url = `${legacy ? LEGACY : HUB}?query=${encodeURIComponent(query)}&display=40&sort=date`;
  const headers = legacy ? { "X-Naver-Client-Id": id, "X-Naver-Client-Secret": secret } : { "X-NCP-APIGW-API-KEY-ID": id, "X-NCP-APIGW-API-KEY": secret };
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`naver ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  return j.items || [];
}

export function group(items, ex = [], dayMs = 36 * 3600 * 1000, now = Date.now()) {
  const exl = ex.map((e) => e.toLowerCase()).filter(Boolean);
  const seen = new Set(), list = [];
  for (const it of items) {
    const title = clean(it.title), desc = clean(it.description), link = it.originallink || it.link;
    const t = Date.parse(it.pubDate) || now;
    if (now - t > dayMs) continue;
    const low = (title + " " + desc).toLowerCase();
    if (exl.some((e) => low.includes(e))) continue;
    const key = title.replace(/\s+/g, "");
    if (seen.has(key)) continue; seen.add(key);
    list.push({ id: "n" + hash(link || title), title, desc, link: it.link || link, src: press(it.originallink || it.link), t, w: words(title) });
  }
  list.sort((a, b) => b.t - a.t);
  const groups = [];
  for (const a of list) {
    const g = groups.find((x) => similar(x.head.w, a.w) >= 0.6);
    if (g) g.more.push(a); else groups.push({ head: a, more: [] });
  }
  return groups.map(({ head, more }) => {
    const srcs = new Set([head.src, ...more.map((m) => m.src)]);
    return { id: head.id, title: head.title, sum: head.desc, link: head.link, src: head.src, t: head.t,
      media: srcs.size > 1 ? srcs.size : 0, rel: more.slice(0, 5).map((m) => [m.src, m.title, m.link]) };
  });
}

export default async function handler(req, res) {
  const id = process.env.NAVER_CLIENT_ID, secret = process.env.NAVER_CLIENT_SECRET;
  if (!id || !secret) return res.status(500).json({ error: "NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 환경변수가 없어요" });
  const q = String(req.query.q || "").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 6);
  const ex = String(req.query.ex || "").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 10);
  if (!q.length) return res.status(400).json({ error: "검색어(q)가 필요해요" });
  try {
    const opt = { id, secret, legacy: process.env.NAVER_API_MODE === "legacy" };
    const all = (await Promise.all(q.map((w) => search(w, opt).catch(() => [])))).flat();
    const items = group(all, ex).slice(0, 30);
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=1800");
    res.status(200).json({ items, at: Date.now() });
  } catch (e) {
    res.status(502).json({ error: String(e.message || e) });
  }
}
