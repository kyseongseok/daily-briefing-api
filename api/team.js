// 팀 스크랩함 (Supabase)
// - 팀 초대 코드: TEAM-XXXX-XXXX. 참여하면 팀원 열쇠(token)를 받고, 서버에는 열쇠의 해시만 저장
// - 기사 빼기는 담은 사람과 팀을 만든 사람만. 팀 삭제는 만든 사람만(팀원·기사도 함께 지워짐). 만든 사람은 나가기 대신 팀 삭제
// GET  /api/team?code=…&token=…                       → { team, members, items, me }
// POST /api/team { action: "create", name, nick }      → { code, name, member, token, owner: true }
// POST /api/team { action: "join", code, nick }        → { code, name, member, token, owner: false }
// POST /api/team { action: "add", code, token, item }  → { item }
// POST /api/team { action: "remove", code, token, id }
// POST /api/team { action: "leave" | "delete", code, token }
import { randomInt, randomBytes, createHash } from "node:crypto";
import { supabase, readBody } from "./_supabase.js";

const ABC = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const CODE_RE = /^TEAM-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/;
const r4 = () => Array.from({ length: 4 }, () => ABC[randomInt(ABC.length)]).join("");
const sha = (s) => createHash("sha256").update(String(s)).digest("hex");
const cut = (s, n) => String(s || "").trim().slice(0, n);
// 링크는 http(s) 주소만 저장 (javascript: 같은 주소 차단)
const httpUrl = (u) => { try { const x = new URL(u); return /^https?:$/.test(x.protocol) ? x.href : ""; } catch { return ""; } };
const fail = (status, error) => Object.assign(new Error(error), { status, public: error });

async function me(db, code, token) {
  if (!CODE_RE.test(code)) throw fail(400, "bad-code");
  if (!token) throw fail(401, "no-token");
  const [team] = await db("GET", "teams", `?code=eq.${code}&select=code,name,owner`);
  if (!team) throw fail(404, "no-team");
  const [m] = await db("GET", "team_members", `?team=eq.${code}&token_hash=eq.${sha(token)}&select=id,name`);
  if (!m) throw fail(403, "not-member");
  return { team, m };
}
const MAX_MEMBERS = 300, MAX_ITEMS = 3000; // 팀 하나의 상한 (아무나 무한히 넣어 저장 공간을 채우지 못하게)
async function addMember(db, code, nick) {
  if ((await db("GET", "team_members", `?team=eq.${code}&select=id&limit=${MAX_MEMBERS}`)).length >= MAX_MEMBERS) throw fail(409, "team-full");
  const member = "m" + randomBytes(6).toString("hex"), token = randomBytes(18).toString("base64url");
  await db("POST", "team_members", "", { team: code, id: member, token_hash: sha(token), name: nick });
  return { member, token };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const db = supabase();
  if (!db) return res.status(503).json({ error: "not-configured" });
  try {
    if (req.method === "GET") {
      const code = String(req.query.code || "").toUpperCase();
      const { team, m } = await me(db, code, String(req.headers["x-team-token"] || req.query.token || ""));
      const members = await db("GET", "team_members", `?team=eq.${code}&select=id,name&order=joined_at.asc`);
      const items = await db("GET", "team_items", `?team=eq.${code}&select=id,art,title,link,src,cat,note,member,who,created_at&order=created_at.desc&limit=300`);
      return res.status(200).json({ team, members, items, me: m.id });
    }
    if (req.method !== "POST") { res.setHeader("Allow", "GET, POST"); return res.status(405).json({ error: "method" }); }
    const b = await readBody(req), act = b.action, code = String(b.code || "").toUpperCase();
    if (act === "create") {
      const name = cut(b.name, 30), nick = cut(b.nick, 20);
      if (!name || !nick) throw fail(400, "need-name");
      for (let i = 0; i < 4; i++) {
        const c = `TEAM-${r4()}-${r4()}`, member = "m" + randomBytes(6).toString("hex");
        try { await db("POST", "teams", "", { code: c, name, owner: member }); } catch (e) { if (e.status === 409) continue; throw e; }
        const token = randomBytes(18).toString("base64url");
        try { await db("POST", "team_members", "", { team: c, id: member, token_hash: sha(token), name: nick }); }
        catch (e) { await db("DELETE", "teams", `?code=eq.${c}`).catch(() => {}); throw e; } // 팀장 없는 팀이 남지 않게
        return res.status(200).json({ code: c, name, member, token, owner: true });
      }
      throw new Error("code collision");
    }
    if (act === "join") {
      const nick = cut(b.nick, 20);
      if (!CODE_RE.test(code)) throw fail(400, "bad-code");
      if (!nick) throw fail(400, "need-name");
      const [team] = await db("GET", "teams", `?code=eq.${code}&select=code,name,owner`);
      if (!team) throw fail(404, "no-team");
      const { member, token } = await addMember(db, code, nick);
      return res.status(200).json({ code, name: team.name, member, token, owner: false });
    }
    const { team, m } = await me(db, code, String(b.token || ""));
    if (act === "add") {
      const it = b.item || {};
      const row = { team: code, art: cut(it.art, 60), title: cut(it.title, 200), link: httpUrl(cut(it.link, 500)), src: cut(it.src, 40), cat: cut(it.cat, 30), note: cut(it.note, 200), member: m.id, who: m.name };
      if (!row.art || !row.title) throw fail(400, "bad-item");
      if ((await db("GET", "team_items", `?team=eq.${code}&select=id&limit=${MAX_ITEMS}`)).length >= MAX_ITEMS) throw fail(409, "items-full");
      try { const [item] = await db("POST", "team_items", "", row); return res.status(200).json({ item }); }
      catch (e) { if (e.status === 409) throw fail(409, "already"); throw e; }
    }
    if (act === "remove") {
      const id = Number(b.id);
      if (!Number.isInteger(id) || id <= 0) throw fail(400, "bad-item");
      const [item] = await db("GET", "team_items", `?id=eq.${id}&team=eq.${code}&select=id,member`);
      if (!item) throw fail(404, "no-item");
      if (item.member !== m.id && team.owner !== m.id) throw fail(403, "not-allowed");
      await db("DELETE", "team_items", `?id=eq.${id}`);
      return res.status(200).json({ ok: true });
    }
    if (act === "leave") {
      if (team.owner === m.id) throw fail(400, "owner-cannot-leave");
      await db("DELETE", "team_members", `?team=eq.${code}&id=eq.${m.id}`);
      return res.status(200).json({ ok: true });
    }
    if (act === "delete") {
      if (team.owner !== m.id) throw fail(403, "not-allowed");
      await db("DELETE", "teams", `?code=eq.${code}`);
      return res.status(200).json({ ok: true });
    }
    throw fail(400, "bad-action");
  } catch (e) {
    if (!e.public) console.error("team", e);
    return res.status(e.status && e.public ? e.status : e instanceof SyntaxError ? 400 : 502).json({ error: e.public || (e instanceof SyntaxError ? "bad-json" : "server") });
  }
}
