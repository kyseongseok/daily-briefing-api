// 통계 긍정·부정 단어 규칙 (모든 사람 공통)
// - 규칙은 Supabase sync_profiles 표에 예약 코드(SYS-STAT-RULES)로 한 줄 저장. 새 표를 만들 필요 없음
//   (동기화 API는 DB-XXXX 형식만 받으니 이 줄은 동기화로 읽거나 덮을 수 없음)
// - 고치기는 관리자만: 요청 머리글 X-Admin-Key 가 Vercel 환경변수 STATS_ADMIN_KEY 와 같아야 함
// GET  /api/rules          → { rules, updated_at }   (저장된 게 없으면 rules: null → 화면이 기본 규칙을 씀)
// POST /api/rules {check}  → 관리자 비밀번호 확인만 → { ok: true }
// PUT  /api/rules { rules, base } → 저장 → { updated_at }
import { timingSafeEqual, createHash } from "node:crypto";
import { supabase, readBody } from "./_supabase.js";

const CODE = "SYS-STAT-RULES";
const GROUPS = ["neg", "dmg", "mit", "pos", "ex"];
const sameKey = (a, b) => { const h = (s) => createHash("sha256").update(String(s)).digest(); return timingSafeEqual(h(a), h(b)); };

function clean(r) {
  if (!r || typeof r !== "object") return null;
  const out = {};
  for (const g of GROUPS) {
    const arr = Array.isArray(r[g]) ? r[g] : [];
    out[g] = [...new Set(arr.map((w) => String(w).replace(/\s+/g, " ").trim()).filter((w) => w && w.length <= 30))].slice(0, 400);
  }
  // 기사별 직접 고친 분류: { "기사 제목": "neg" | "dmg" | "pos" | "neu" }
  out.fix = {};
  const fx = r.fix && typeof r.fix === "object" ? r.fix : {};
  Object.entries(fx).slice(0, 3000).forEach(([t, c]) => { const k = String(t).trim().slice(0, 200); if (k && ["neg", "dmg", "pos", "neu"].includes(c)) out.fix[k] = c; });
  return out;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const sb = supabase();
  if (!sb) return res.status(503).json({ error: "not-configured" });
  const q = (method, query, body) => sb(method, "sync_profiles", query, body);
  try {
    if (req.method === "GET") {
      const rows = await q("GET", `?code=eq.${CODE}&select=data,updated_at`);
      res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
      return res.status(200).json(rows.length ? { rules: rows[0].data, updated_at: rows[0].updated_at } : { rules: null, updated_at: null });
    }
    const admin = process.env.STATS_ADMIN_KEY || "";
    if (!admin) return res.status(503).json({ error: "no-admin-key" });
    const key = String(req.headers["x-admin-key"] || "");
    if (!key || !sameKey(key, admin)) { await new Promise((ok) => setTimeout(ok, 600)); return res.status(401).json({ error: "wrong-key" }); }
    if (req.method === "POST") return res.status(200).json({ ok: true });
    if (req.method === "PUT") {
      const body = await readBody(req);
      const rules = clean(body.rules);
      if (!rules) return res.status(400).json({ error: "no-rules" });
      if (JSON.stringify(rules).length > 512 * 1024) return res.status(413).json({ error: "too-big" });
      const now = new Date().toISOString();
      const rows = await q("GET", `?code=eq.${CODE}&select=updated_at`);
      if (!rows.length) { const r = await q("POST", "", { code: CODE, data: rules }); return res.status(200).json({ updated_at: r[0].updated_at }); }
      // 다른 관리자가 그사이 저장했으면 덮지 않음 → 화면이 다시 받아서 보여 줌
      if (body.base !== undefined && body.base !== rows[0].updated_at) return res.status(409).json({ error: "conflict" });
      const r = await q("PATCH", `?code=eq.${CODE}`, { data: rules, updated_at: now });
      return res.status(200).json({ updated_at: r[0].updated_at });
    }
    res.setHeader("Allow", "GET, POST, PUT");
    return res.status(405).json({ error: "method" });
  } catch (e) {
    return res.status(502).json({ error: String(e.message || e) });
  }
}
