// Supabase REST 호출 공용 (파일 이름이 _로 시작해서 Vercel 주소로는 열리지 않음)
// 환경변수: SUPABASE_URL, SUPABASE_SECRET_KEY (sb_secret_… 또는 예전 service_role 키)
export function supabase() {
  const url = (process.env.SUPABASE_URL || "").replace(/\/$/, ""), key = process.env.SUPABASE_SECRET_KEY || "";
  if (!url || !key) return null;
  const headers = { apikey: key, "Content-Type": "application/json", Prefer: "return=representation" };
  if (!key.startsWith("sb_")) headers.Authorization = `Bearer ${key}`; // 예전 JWT 키
  return async (method, table, query = "", body, prefer) => {
    const h = prefer ? { ...headers, Prefer: `${headers.Prefer},${prefer}` } : headers; // 예: "resolution=merge-duplicates" (있으면 덮어쓰기)
    const r = await fetch(`${url}/rest/v1/${table}${query}`, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
    const text = await r.text();
    if (!r.ok) { const e = new Error(`supabase ${r.status}: ${text.slice(0, 200)}`); e.status = r.status; throw e; }
    return text ? JSON.parse(text) : [];
  };
}
export async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  let s = ""; for await (const c of req) s += c; return JSON.parse(s || "{}");
}
