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

// 상한을 넘으면 말없이 잘라 내지 않고 거절 (관리자 화면에는 저장된 것처럼 보이는데 실제로는 빠지는 일이 없게)
const LIM = { words: 400, word: 30, fix: 3000, title: 300 };
function clean(r) {
  if (!r || typeof r !== "object") return { error: "no-rules" };
  const out = {};
  for (const g of GROUPS) {
    const arr = [...new Set((Array.isArray(r[g]) ? r[g] : []).map((w) => String(w).replace(/\s+/g, " ").trim()).filter(Boolean))];
    if (arr.length > LIM.words || arr.some((w) => w.length > LIM.word)) return { error: "too-many-words" };
    out[g] = arr;
  }
  // 기사별 직접 고친 분류: { "기사 제목": "neg" | "dmg" | "pos" | "neu" }
  out.fix = {};
  const fx = Object.entries(r.fix && typeof r.fix === "object" ? r.fix : {});
  if (fx.length > LIM.fix || fx.some(([t]) => String(t).length > LIM.title)) return { error: "too-many-fixes" };
  fx.forEach(([t, c]) => { if (String(t).trim() && ["neg", "dmg", "pos", "neu"].includes(c)) out.fix[String(t)] = c; });
  return { rules: out };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const sb = supabase();
  if (!sb) return res.status(503).json({ error: "not-configured" });
  const q = (method, query, body) => sb(method, "sync_profiles", query, body);
  try {
    if (req.method === "GET") {
      const rows = await q("GET", `?code=eq.${CODE}&select=data,updated_at`);
      // 관리자 화면은 주소에 ?fresh=… 를 붙여 캐시 없이 최신을 받음
      res.setHeader("Cache-Control", req.query.fresh ? "no-store" : "public, s-maxage=30, stale-while-revalidate=60");
      return res.status(200).json(rows.length ? { rules: rows[0].data, updated_at: rows[0].updated_at } : { rules: null, updated_at: null });
    }
    const admin = process.env.STATS_ADMIN_KEY || "";
    if (!admin) return res.status(503).json({ error: "no-admin-key" });
    const key = String(req.headers["x-admin-key"] || "");
    if (!key || !sameKey(key, admin)) { await new Promise((ok) => setTimeout(ok, 600)); return res.status(401).json({ error: "wrong-key" }); }
    if (req.method === "POST") return res.status(200).json({ ok: true });
    if (req.method === "PUT") {
      const body = await readBody(req);
      const { rules, error } = clean(body.rules);
      if (error) return res.status(error === "no-rules" ? 400 : 413).json({ error });
      if (JSON.stringify(rules).length > 512 * 1024) return res.status(413).json({ error: "too-big" });
      const now = new Date().toISOString();
      // 처음 저장(base 없음): 새 줄 만들기. 동시에 두 번 만들면 한쪽은 409
      if (!body.base) {
        try { const r = await q("POST", "", { code: CODE, data: rules }); return res.status(200).json({ updated_at: r[0].updated_at }); }
        catch (e) { if (e.status === 409) return res.status(409).json({ error: "conflict" }); throw e; }
      }
      // 그사이 다른 관리자가 저장했으면(updated_at이 base와 다르면) 덮지 않음 — 확인과 저장을 한 번에(원자적으로)
      const r = await q("PATCH", `?code=eq.${CODE}&updated_at=eq.${encodeURIComponent(body.base)}`, { data: rules, updated_at: now });
      if (!r.length) return res.status(409).json({ error: "conflict" });
      return res.status(200).json({ updated_at: r[0].updated_at });
    }
    res.setHeader("Allow", "GET, POST, PUT");
    return res.status(405).json({ error: "method" });
  } catch (e) {
    console.error("rules", e);
    return res.status(e instanceof SyntaxError ? 400 : 502).json({ error: e instanceof SyntaxError ? "bad-json" : "server" });
  }
}
