// PC·휴대폰 동기화 (Supabase)
// - 로그인 대신 '동기화 코드'(DB-XXXX-XXXX-XXXX)가 열쇠. 같은 코드를 넣은 기기는 같은 기록을 씀
// - 브라우저는 Supabase에 직접 붙지 않고 이 서버를 거침. 비밀 키는 Vercel 환경변수에만 둠
//   SUPABASE_URL, SUPABASE_SECRET_KEY (sb_secret_… 또는 예전 service_role 키)
// GET  /api/sync?code=…            → { data, updated_at }
// POST /api/sync { data }          → 새 코드 만들기 → { code, updated_at }
// PUT  /api/sync { code, data }    → 저장 → { updated_at }
import { randomInt } from "node:crypto";
import { supabase, readBody } from "./_supabase.js";

const ABC = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // 헷갈리는 0·O·1·I 뺌
const CODE_RE = /^DB-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/;
const MAX = 400 * 1024; // 기록 크기 상한 (400KB · 실제 기록은 수십 KB)
const newCode = () => "DB-" + [0, 1, 2].map(() => Array.from({ length: 4 }, () => ABC[randomInt(ABC.length)]).join("")).join("-");

function db() { const sb = supabase(); return sb && ((method, query, body) => sb(method, "sync_profiles", query, body)); }

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
      // base(이 기기가 마지막으로 받은 시각)가 서버 기록과 다르면 그사이 다른 기기가 올린 것 → 409, 기기가 다시 받아서 합침
      // base가 없는 저장(배포 전 예전 화면이 켜져 있는 경우)은 받지 않음 → 예전 화면이 새 기록을 덮지 못하게. 새로고침하면 새 방식으로 맞춤
      if (typeof body.base !== "string" || !body.base) return res.status(409).json({ error: "reload" });
      const base = `&updated_at=eq.${encodeURIComponent(body.base)}`;
      const rows = await q("PATCH", `?code=eq.${code}${base}`, { data, updated_at: new Date().toISOString() });
      if (!rows.length) {
        const exists = (await q("GET", `?code=eq.${code}&select=code`)).length;
        return res.status(exists ? 409 : 404).json({ error: exists ? "conflict" : "not-found" });
      }
      return res.status(200).json({ updated_at: rows[0].updated_at });
    }
    res.setHeader("Allow", "GET, POST, PUT");
    return res.status(405).json({ error: "method" });
  } catch (e) {
    console.error("sync", e);
    return res.status(e instanceof SyntaxError ? 400 : 502).json({ error: e instanceof SyntaxError ? "bad-json" : "server" });
  }
}
