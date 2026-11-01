// PC·휴대폰 동기화 (Supabase)
// - 로그인 대신 '동기화 코드'(DB-XXXX-XXXX-XXXX)가 열쇠. 같은 코드를 넣은 기기는 같은 기록을 씀
// - 브라우저는 Supabase에 직접 붙지 않고 이 서버를 거침. 비밀 키는 Vercel 환경변수에만 둠
//   SUPABASE_URL, SUPABASE_SECRET_KEY (sb_secret_… 또는 예전 service_role 키)
// GET  /api/sync?code=…            → { data, updated_at }
// POST /api/sync { data }          → 새 코드 만들기 → { code, updated_at }
// PUT  /api/sync { code, data }    → 저장 → { updated_at }
import { randomInt } from "node:crypto";

const ABC = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // 헷갈리는 0·O·1·I 뺌
const CODE_RE = /^DB-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/;
const MAX = 300 * 1024; // 기록 크기 상한
const newCode = () => "DB-" + [0, 1, 2].map(() => Array.from({ length: 4 }, () => ABC[randomInt(ABC.length)]).join("")).join("-");

function db() {
  const url = (process.env.SUPABASE_URL || "").replace(/\/$/, ""), key = process.env.SUPABASE_SECRET_KEY || "";
  if (!url || !key) return null;
  const headers = { apikey: key, "Content-Type": "application/json", Prefer: "return=representation" };
  if (!key.startsWith("sb_")) headers.Authorization = `Bearer ${key}`; // 예전 JWT 키
  return async (method, query, body) => {
    const r = await fetch(`${url}/rest/v1/sync_profiles${query}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
    const text = await r.text();
    if (!r.ok) { const e = new Error(`supabase ${r.status}: ${text.slice(0, 200)}`); e.status = r.status; throw e; }
    return text ? JSON.parse(text) : [];
  };
}
async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  let s = ""; for await (const c of req) s += c; return JSON.parse(s || "{}");
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const q = db();
  if (!q) return res.status(503).json({ error: "not-configured" });
  try {
    if (req.method === "GET") {
      const code = String(req.query.code || "").trim().toUpperCase();
      if (!CODE_RE.test(code)) return res.status(400).json({ error: "bad-code" });
      const rows = await q("GET", `?code=eq.${code}&select=data,updated_at`);
      if (!rows.length) return res.status(404).json({ error: "not-found" });
      return res.status(200).json(rows[0]);
    }
    const body = await readBody(req);
    const data = body.data;
    if (!data || typeof data !== "object") return res.status(400).json({ error: "no-data" });
    if (JSON.stringify(data).length > MAX) return res.status(413).json({ error: "too-big" });
    if (req.method === "POST") {
      for (let i = 0; i < 3; i++) {
        const code = newCode();
        try { const rows = await q("POST", "", { code, data }); return res.status(200).json({ code, updated_at: rows[0].updated_at }); }
        catch (e) { if (e.status !== 409) throw e; } // 아주 드물게 코드가 겹치면 다시
      }
      throw new Error("code collision");
    }
    if (req.method === "PUT") {
      const code = String(body.code || "").trim().toUpperCase();
      if (!CODE_RE.test(code)) return res.status(400).json({ error: "bad-code" });
      const rows = await q("PATCH", `?code=eq.${code}`, { data, updated_at: new Date().toISOString() });
      if (!rows.length) return res.status(404).json({ error: "not-found" });
      return res.status(200).json({ updated_at: rows[0].updated_at });
    }
    res.setHeader("Allow", "GET, POST, PUT");
    return res.status(405).json({ error: "method" });
  } catch (e) {
    return res.status(502).json({ error: String(e.message || e) });
  }
}
