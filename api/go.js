// 카카오톡 공유 메시지의 '기사 보기'용 이동 주소: /api/go?u=기사주소 → 기사로 이동
// (카카오는 메시지 링크를 등록한 사이트 주소로만 허용해서, 우리 사이트를 한 번 거쳐 언론사 기사로 보냄)
export default function handler(req, res) {
  let to = "/";
  try { const u = new URL(String(req.query.u || "")); if (/^https?:$/.test(u.protocol)) to = u.href; } catch {}
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Location", to);
  res.status(302).end();
}
