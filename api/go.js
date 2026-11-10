// 카카오톡 공유 메시지의 '기사 보기'용 이동 주소: /api/go?u=기사주소 → 기사로 이동
// (카카오는 메시지 링크를 등록한 사이트 주소로만 허용해서, 우리 사이트를 한 번 거쳐 언론사 기사로 보냄)
// 아무 주소로나 바로 보내면 피싱 링크에 악용될 수 있어서(열린 리디렉션), 언론사·포털 주소만 바로 보내고
// 그 밖의 주소는 "외부 사이트로 이동해요" 확인 화면을 거침
import { PRESS } from "./news.js";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const TRUST = /(^|\.)(naver\.com|daum\.net|kakao\.com|go\.kr|or\.kr|ac\.kr|re\.kr)$/; // 공공·포털 주소. 그 밖의 언론사는 PRESS 목록에 있으면 바로, 없으면 확인 화면
const known = (host) => TRUST.test(host) || Object.keys(PRESS || {}).some((d) => host === d || host.endsWith("." + d));

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  let u = null;
  try { const x = new URL(String(req.query.u || "")); if (/^https?:$/.test(x.protocol)) u = x; } catch {}
  if (!u) { res.setHeader("Location", "/"); return res.status(302).end(); }
  if (known(u.hostname.toLowerCase())) { res.setHeader("Location", u.href); return res.status(302).end(); }
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>외부 사이트로 이동</title>
<body style="margin:0;font-family:system-ui,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;background:#F3F6FB;color:#0F1B33;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:16px;box-sizing:border-box">
<div style="background:#fff;border:1px solid #E3E9F2;border-radius:16px;padding:22px;max-width:420px;width:100%"><b style="font-size:18px">외부 사이트로 이동해요</b>
<p style="color:#46546B;line-height:1.6;word-break:break-all">DAILY BRIEFING 밖의 주소예요. 보낸 사람을 믿을 수 있을 때만 여세요.<br><b>${esc(u.hostname)}</b></p>
<a href="${esc(u.href)}" rel="noopener noreferrer" style="display:block;text-align:center;background:#2457E6;color:#fff;border-radius:12px;padding:12px;font-weight:700;text-decoration:none">이동하기</a>
<a href="/" style="display:block;text-align:center;margin-top:10px;color:#6B7690">DAILY BRIEFING으로 가기</a></div></body></html>`);
}
