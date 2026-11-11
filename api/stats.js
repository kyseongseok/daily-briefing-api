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
  // 주소 뒤에 아무 값이나 붙이면 캐시를 건너뛰고 네이버를 10번씩 부르게 되므로, 붙은 값은 떼고 같은 주소로 보냄
  if (Object.keys(req.query || {}).length) { res.setHeader("Location", "/api/stats"); res.setHeader("Cache-Control", "public, s-maxage=86400"); return res.status(308).end(); }
  const opt = { id, secret, legacy: process.env.NAVER_API_MODE === "legacy" };
  try {
    // 첫 100건을 받은 뒤 나머지 900건은 3개씩 동시에 받음 (차례로 받으면 10번을 기다려서 느렸음)
    const all = await search(STAT_WORD, opt, { display: 100, start: 1 });
    if (all.length >= 100) {
      const starts = [101, 201, 301, 401, 501, 601, 701, 801, 901];
      for (let i = 0; i < starts.length; i += 3) {
        const pages = await Promise.all(starts.slice(i, i + 3).map((start) => search(STAT_WORD, opt, { display: 100, start })));
        pages.forEach((p) => all.push(...p));
        if (pages.some((p) => p.length < 100)) break;
      }
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
    // 오늘은 아직 집계 중이라, 어제 같은 시각까지의 기사 수와 비교할 수 있게 함께 보냄 [오늘 지금까지, 어제 이 시각까지]
    const tod = (t) => (t + 9 * 3600 * 1000) % 86400000, nowTod = tod(Date.now());
    const yk = dayKey(Date.now() - 86400000);
    const cmp = days[yk] ? [(raw[today] || []).length, (raw[yk] || []).filter((it) => tod(Date.parse(it.pubDate)) <= nowTod).length] : null;
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=3600");
    res.status(200).json({ word: STAT_WORD, from: complete[0] || today, today, days: out, issues, cmp, at: Date.now() });
  } catch (e) {
    res.status(502).json({ error: String(e.message || e) });
  }
}
