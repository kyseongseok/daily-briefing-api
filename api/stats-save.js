// 매일 새벽 0시 30분(한국 시간) Vercel 예약 실행: 어제까지 '다 센 날'의 통계를 Supabase stat_days 표에 저장
// - 네이버는 최신 1,000건(1~2주)만 주므로, 날마다 저장해 두어야 1개월·3개월 그래프가 채워짐
// - 예약 실행만 부를 수 있게 Authorization: Bearer <CRON_SECRET> 확인 (Vercel이 예약 실행 때 자동으로 보냄)
// - 이미 저장된 날도 다시 덮어씀(그사이 늦게 올라온 기사 반영). 오늘은 아직 집계 중이라 저장하지 않음
import { timingSafeEqual, createHash } from "node:crypto";
import { collect, dayKey } from "./stats.js";
import { supabase } from "./_supabase.js";

const same = (a, b) => { const h = (s) => createHash("sha256").update(String(s)).digest(); return timingSafeEqual(h(a), h(b)); };

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  // 예약 실행(CRON_SECRET) 또는 관리자(통계 단어 규칙 화면의 '저장 점검' 버튼, STATS_ADMIN_KEY)만 실행 가능
  const secret = process.env.CRON_SECRET || "", admin = process.env.STATS_ADMIN_KEY || "";
  const byCron = !!secret && same(String(req.headers.authorization || ""), `Bearer ${secret}`);
  const byAdmin = req.method === "POST" && !!admin && !!req.headers["x-admin-key"] && same(String(req.headers["x-admin-key"]), admin);
  if (!byCron && !byAdmin) { if (req.headers["x-admin-key"]) await new Promise((ok) => setTimeout(ok, 600)); return res.status(401).json({ error: "unauthorized" }); }
  const id = process.env.NAVER_CLIENT_ID, key = process.env.NAVER_CLIENT_SECRET, sb = supabase();
  if (!id || !key || !sb) return res.status(503).json({ error: "not-configured" });
  try {
    const { out } = await collect({ id, secret: key, legacy: process.env.NAVER_API_MODE === "legacy" });
    const today = dayKey(Date.now());
    const rows = Object.entries(out).filter(([k]) => k < today).map(([day, v]) => ({ day, n: v.n, media: v.m, list: v.list, updated_at: new Date().toISOString() }));
    if (rows.length) await sb("POST", "stat_days", "?on_conflict=day", rows, "resolution=merge-duplicates");
    // 저장 뒤 표를 다시 읽어 실제로 들어갔는지 확인 (점검 버튼이 보여 줌)
    const stored = await sb("GET", "stat_days", "?select=day&order=day.asc");
    return res.status(200).json({ saved: rows.map((r) => r.day), stored: stored.length, first: stored[0]?.day || null, cron: !!secret });
  } catch (e) {
    console.error("stats-save", e);
    return res.status(502).json({ error: "server", where: /supabase/.test(e.message) ? "supabase" : "naver" });
  }
}
