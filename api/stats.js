// 통계용: '농촌진흥청'이 들어간 기사만 센다 (내 분야 검색어와 상관없이 모두 같은 기준)
// GET /api/stats
// - 네이버 검색은 지난 날짜별 기사 수를 따로 주지 않아서, 최신순으로 최대 1,000건(100건 × 10번)을 거슬러 받아 날짜별로 센다
// - 가장 오래된 날은 중간에 끊겼을 수 있어서 빼고, 그 다음 날부터를 '다 센 날'로 본다
// - 결과는 Vercel 캐시에 30분 보관
import { search, group, press } from "./news.js";

export const STAT_WORD = "농촌진흥청";
const dayKey = (t) => new Date(t + 9 * 3600 * 1000).toISOString().slice(0, 10); // 한국 시간 기준 날짜

export default async function handler(req, res) {
  const id = process.env.NAVER_CLIENT_ID, secret = process.env.NAVER_CLIENT_SECRET;
  if (!id || !secret) return res.status(500).json({ error: "NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 환경변수가 없어요" });
  const opt = { id, secret, legacy: process.env.NAVER_API_MODE === "legacy" };
  try {
    const all = [];
    for (let start = 1; start <= 901; start += 100) {
      const items = await search(STAT_WORD, opt, { display: 100, start });
      all.push(...items);
      if (items.length < 100) break;
    }
    const seen = new Set(), days = {}, raw = {};
    let oldest = Infinity;
    for (const it of all) {
      const link = it.originallink || it.link; if (seen.has(link)) continue; seen.add(link);
      const t = Date.parse(it.pubDate); if (!t) continue;
      oldest = Math.min(oldest, t);
      const k = dayKey(t), src = press(link);
      const d = (days[k] ||= { n: 0, m: {} }); d.n++; d.m[src] = (d.m[src] || 0) + 1;
      (raw[k] ||= []).push(it);
    }
    const keys = Object.keys(days).sort();
    // 1,000건을 다 받았다면 가장 오래된 날은 일부만 셌으므로 뺀다
    const complete = all.length >= 1000 ? keys.slice(1) : keys;
    // 날마다 기사 목록: 같은 소식은 묶고, 여러 매체가 다룬 소식부터 최대 80개 [제목, 대표 매체, 링크, 매체 수, 시각]
    const listOf = (k) => group(raw[k] || [], [], Infinity).sort((a, b) => (b.media - a.media) || (b.t - a.t)).slice(0, 80).map((g) => [g.title, g.src, g.link, g.media, g.t]);
    const out = Object.fromEntries(complete.map((k) => [k, { ...days[k], list: listOf(k) }]));
    const today = dayKey(Date.now());
    const issues = group(all.filter((it) => dayKey(Date.parse(it.pubDate) || 0) === today))
      .filter((g) => g.media > 1).sort((a, b) => b.media - a.media).slice(0, 5)
      .map((g) => [g.title, g.media, g.link]);
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=3600");
    res.status(200).json({ word: STAT_WORD, from: complete[0] || today, today, days: out, issues, at: Date.now() });
  } catch (e) {
    res.status(502).json({ error: String(e.message || e) });
  }
}
