// 브라우저에 알려 줘도 되는 설정 (카카오 JavaScript 키는 원래 공개용 키이고, 카카오에 등록한 사이트에서만 동작함)
// 환경변수: KAKAO_JS_KEY
export default function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");
  res.status(200).json({ kakao: process.env.KAKAO_JS_KEY || "" });
}
