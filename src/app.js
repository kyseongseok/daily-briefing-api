/* DAILY BRIEFING 시안 — 공통 데이터와 동작 (PC·모바일 같이 씀) */
const PALETTE = [
  { c: "#1E8A4C", t: "#E3F3E8", k: "#17703D", h: "#BFE5CB", nm: "초록" },
  { c: "#0A8C8C", t: "#DDF2F1", k: "#08706F", h: "#BDE6E4", nm: "청록" },
  { c: "#5B47D6", t: "#ECE9FC", k: "#4A37C2", h: "#D9D2FA", nm: "보라" },
  { c: "#E2591B", t: "#FDEBE1", k: "#B5470F", h: "#FBD3BE", nm: "주황" },
  { c: "#D93A3A", t: "#FBE4E4", k: "#B42828", h: "#F6C9C9", nm: "빨강" },
  { c: "#B98200", t: "#FBF1D6", k: "#8A6100", h: "#F3DD9E", nm: "황토" },
  { c: "#2B67E0", t: "#E3ECFC", k: "#1F50B8", h: "#C7D8F8", nm: "파랑" },
  { c: "#C93E86", t: "#F9E3EF", k: "#A42D6B", h: "#F1C4DC", nm: "자주" },
];
const S = {
  mode: "basic", size: 1,
  cats: [
    { id: "agri", name: "농업·농촌", p: 0, count: 0, words: ["농촌진흥청"], ex: [] },
    { id: "sci", name: "과학·바이오", p: 1, count: 0, words: ["그린바이오"], ex: [] },
    { id: "it", name: "IT·AI", p: 2, count: 0, words: ["생성형 AI", "인공지능", "디지털 전환"], ex: ["AI 스피커"] },
  ],
  arts: [
    { id: "a1", cat: "agri", top: true, media: 12, title: "노지 스마트농업 시범지구 운영 결과 공개… 내년 확대 검토", src: "○○일보", time: "2시간 전",
      sum: "시범지구에서 확인된 생산성·노동력 변화와 확대 계획을 발표했다. 현장 농업인 의견 수렴 일정도 함께 안내했다.",
      relCount: 11, rel: [["△△신문", "노지 스마트농업 시범지구 성과… 확대 여부 관심"], ["□□경제", "\"스마트농업 시범지구, 내년 지역 늘린다\""], ["◇◇뉴스", "현장 농업인 \"인력 부담 줄었다\""]] },
    { id: "a2", cat: "agri", pick: 2, media: 7, title: "기후변화로 사과 재배지 북상… 품종 전환 논의 본격화", src: "△△신문", time: "4시간 전" },
    { id: "a3", cat: "it", pick: 3, title: "생성형 AI, 농업 현장 상담 서비스에 도입 확대", src: "□□경제", time: "5시간 전" },
    { id: "a4", cat: "sci", pick: 4, title: "그린바이오 산업 육성 R&D 예산안, 상임위 논의 시작", src: "◇◇뉴스", time: "6시간 전" },
    { id: "a5", cat: "agri", pick: 5, title: "청년농 정착 지원 제도 개선안 공개… 의견 수렴 착수", src: "○○일보", time: "8시간 전" },
    { id: "a6", cat: "agri", title: "가을철 과수 병해충 방제 요령 안내", src: "○○일보", time: "3시간 전" },
    { id: "a7", cat: "agri", title: "신품종 벼 현장 평가회… 농업인 반응 살펴", src: "☆☆농민신문", time: "7시간 전" },
    { id: "a8", cat: "sci", title: "유전자교정 작물 안전성 기준 마련 착수", src: "△△신문", time: "3시간 전" },
    { id: "a9", cat: "sci", title: "미생물 비료 실증 연구 성과 발표", src: "◇◇뉴스", time: "어제" },
    { id: "a10", cat: "it", title: "공공기관 AI 활용 가이드라인 개정안 공개", src: "◇◇뉴스", time: "3시간 전" },
    { id: "a11", cat: "it", title: "AI 반도체 국산화 지원 예산 확대", src: "□□경제", time: "어제" },
    { id: "a15", cat: "agri", media: 3, title: "스마트팜 청년 창업 지원 대상 확대", src: "□□경제", time: "1시간 전" },
    { id: "a16", cat: "agri", title: "가을 배추 작황 양호… 김장철 가격 안정 전망", src: "◇◇뉴스", time: "5시간 전" },
    { id: "a17", cat: "agri", title: "농촌 일손 돕기 주간 운영", src: "△△신문", time: "어제" },
    { id: "a18", cat: "sci", media: 4, title: "기능성 작물 품종 개발 성과 공개", src: "○○일보", time: "2시간 전" },
    { id: "a19", cat: "sci", title: "곤충 단백질 소재 산업화 시동", src: "□□경제", time: "어제" },
    { id: "a20", cat: "it", media: 5, title: "공공 데이터 개방 확대, 농업 데이터 포함", src: "◇◇뉴스", time: "1시간 전" },
    { id: "a21", cat: "it", title: "디지털 전환 교육 공무원 대상 확대", src: "△△신문", time: "6시간 전" },
    { id: "a22", cat: "it", title: "AI 기반 병해충 진단 앱 현장 보급", src: "농민신문", time: "어제" },
  ],
  read: new Set(),
  scrap: new Set(),
  team: [],
  sheet: null, draft: null,
};
const MODES = [["basic", "기본"], ["jogan", "조간"], ["digest", "다이제스트"]];
const SIZES = [[0.9, "작게"], [1, "보통"], [1.15, "크게"], [1.3, "아주 크게"]];
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
const cat = (id) => S.cats.find((c) => c.id === id);
const pal = (c) => PALETTE[c.p];
const cvars = (c) => { const p = pal(c); return `--c:${p.c};--t:${p.t};--k:${p.k};--h:${p.h}`; };
const artsOf = (id) => S.arts.filter((a) => a.cat === id);
const mins = (t) => /분 전/.test(t) ? parseInt(t) : /시간 전/.test(t) ? parseInt(t) * 60 : 1440;
const ICON = {
  dex: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H19v15H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M4 20.5A1.5 1.5 0 0 0 5.5 22H19v-3"/><path d="M12 8.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M3 21v-5h5"/></svg>',
  today: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>',
  team: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 14.3c3 .2 5.5 2.6 5.5 5.7"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7"/></svg>',
  talk: '<svg viewBox="0 0 24 24" fill="none" stroke="#3B1E1E" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 4c-4.8 0-8.5 3-8.5 6.6 0 2.3 1.5 4.3 3.8 5.4L6.5 20l4-2.6c.5.1 1 .1 1.5.1 4.8 0 8.5-3 8.5-6.9S16.8 4 12 4z"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>',
};

/* 저장(이 브라우저에서만): 디자인·글자 크기만 기억 */
/* 날짜: 실제 오늘 */
const TODAY = new Date();
const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };
const longDate = (d = new Date()) => `${d.getMonth() + 1}월 ${d.getDate()}일 ${WD_[d.getDay()]}요일`;
const dotDate = (d = new Date()) => `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}. ${WD_[d.getDay()]}요일`;
const WD_ = ["일", "월", "화", "수", "목", "금", "토"];

/* 저장(이 브라우저): 디자인·글자 크기·스크랩·오늘 읽은 기사·내 분야. 5단계에서 Supabase로 옮겨요 */
const STORE_KEY = "daily-briefing-v2"; // v1은 예시 데이터가 섞여 있어서 새로 시작
function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    if (MODES.some((m) => m[0] === p.mode)) S.mode = p.mode;
    if (SIZES.some((s) => s[0] === p.size)) S.size = p.size;
    if (Array.isArray(p.scrap)) S.scrap = new Set(p.scrap);
    if (p.saved && typeof p.saved === "object") S.saved = p.saved;
    if (p.readDay === todayKey() && Array.isArray(p.read)) S.read = new Set(p.read); else S.read = new Set();
    // 예전 기본 분야(정책·제도 포함 4개)를 손대지 않고 쓰던 경우엔 새 기본 분야로 바꿈
    const oldDefault = !p.catsVer && Array.isArray(p.cats) && p.cats.map((c) => c.id).join() === "agri,sci,it,pol" && !p.cats.some((c) => c.user);
    if (!oldDefault && Array.isArray(p.cats) && p.cats.length) S.cats = p.cats.map((c) => ({ ...c, count: artsOf(c.id).length }));
  } catch (e) {}
}
function savePrefs() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ mode: S.mode, size: S.size, scrap: [...S.scrap], saved: Object.fromEntries([...S.scrap].filter((id) => S.saved[id]).map((id) => [id, S.saved[id]])), read: [...S.read], readDay: todayKey(), catsVer: 2,
      cats: S.cats.map(({ id, name, p, words, ex, user }) => ({ id, name, p, words, ex, user })) }));
  } catch (e) {}
  syncSoon(); // 동기화 코드가 있으면 곧 서버에도 저장
}

/* ── 기사 불러오기: /api/news (네이버 뉴스 검색) ──
   - 분야마다 검색어로 불러와 같은 소식은 묶어서 받음
   - 오늘 받은 기사는 이 브라우저에 보관해서 다음에 열 때 바로 보여 줌
   - 서버가 아직 없거나 실패하면 예시 기사를 그대로 둠 */
const NEWS_KEY = "daily-briefing-news";
S.live = false; S.saved = {};
function ago(t) {
  const m = Math.max(0, Math.round((Date.now() - t) / 60000));
  if (m < 1) return "방금"; if (m < 60) return `${m}분 전`; const h = Math.floor(m / 60); if (h < 24) return `${h}시간 전`; return "어제";
}
function applyNews(byCat) {
  const arts = [];
  S.cats.forEach((c) => (byCat[c.id] || []).forEach((g) => { if (!arts.some((a) => a.id === g.id)) arts.push({ ...g, cat: c.id, time: ago(g.t), relCount: g.media > 1 ? g.media - 1 : (g.rel || []).length }); }));
  // 오늘 꼭 볼 기사: 여러 매체가 다룬 소식 순, 같으면 주요 언론사 기사 먼저, 그다음 최신 순. 1위는 크게(요약·관련 기사), 2~5위는 번호 목록
  const ranked = arts.slice().sort((a, b) => (b.media - a.media) || ((a.tier || 3) - (b.tier || 3)) || (b.t - a.t));
  ranked.slice(0, 5).forEach((a, i) => { if (i === 0) a.top = true; else a.pick = i + 1; });
  S.arts = arts;
  S.cats.forEach((c) => { c.count = artsOf(c.id).length; });
  S.live = true;
}
async function fetchNews() {
  const out = {};
  await Promise.all(S.cats.map(async (c) => {
    const q = (c.words || []).join(","); if (!q) { out[c.id] = []; return; }
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 8000);
    try {
      const r = await fetch(`/api/news?q=${encodeURIComponent(q)}&ex=${encodeURIComponent((c.ex || []).join(","))}`, { signal: ctl.signal });
      if (!r.ok) throw new Error(r.status);
      out[c.id] = (await r.json()).items || [];
    } finally { clearTimeout(tm); }
  }));
  try { localStorage.setItem(NEWS_KEY, JSON.stringify({ day: todayKey(), at: Date.now(), byCat: out })); } catch (e) {}
  return out;
}
function loadCachedNews() {
  try { const c = JSON.parse(localStorage.getItem(NEWS_KEY) || "null"); if (c && c.day === todayKey()) { applyNews(c.byCat); return true; } } catch (e) {}
  return false;
}
/* 스크랩한 기사는 다음 날에도 보이게 따로 보관 */
function rememberScrap(id) { const a = S.arts.find((x) => x.id === id); if (a) S.saved[id] = { id: a.id, cat: a.cat, title: a.title, src: a.src, link: a.link, t: a.t, time: a.time }; }
function scrapList() { return [...S.scrap].map((id) => S.arts.find((a) => a.id === id) || S.saved[id]).filter(Boolean).map((a) => ({ ...a, time: a.t ? ago(a.t) : a.time })); }
/* 새로고침: 다시 불러와서 새로 생긴 기사 수를 알려 줌 */
async function refreshNews(app, btn, rerender, onNew) {
  btn.classList.remove("spin"); void btn.offsetWidth; btn.classList.add("spin");
  const before = new Set(S.arts.map((a) => a.id));
  try {
    applyNews(await fetchNews());
    const fresh = S.arts.filter((a) => !before.has(a.id));
    fresh.forEach((a) => { a.fresh = true; });
    rerender();
    if (!fresh.length) { toast(app, "새 기사가 없어요 · 방금 확인했어요"); return; }
    const p = document.createElement("button"); p.type = "button"; p.className = "newpill"; p.dataset.gonew = ""; p.textContent = `새 기사 ${fresh.length}건 · 분야별에서 보기`; app.append(p);
    setTimeout(() => p.remove(), 5000); setTimeout(() => S.arts.forEach((a) => delete a.fresh), 2500);
  } catch (e) { toast(app, "기사를 불러오지 못했어요 · 잠시 뒤 다시 눌러 주세요"); }
}
/* 처음 열 때: 보관된 오늘 기사 → 바로 표시, 그 뒤 서버에서 최신으로 */
async function bootNews(rerender) {
  loadCachedNews(); rerender();
  fetchStats().then(rerender);
  try { applyNews(await fetchNews()); rerender(); } catch (e) { /* 서버 준비 전에는 예시 기사 유지 */ }
}

function applyAppVars(app) {
  app.dataset.mode = S.mode;
  app.style.setProperty("--s", S.size);
  if (S.size >= 1.15) app.dataset.big = ""; else delete app.dataset.big;
}

/* 공통 조각 */
const chipCat = (c) => `<span class="chip cat" style="${cvars(c)}">${esc(c.name)}</span>`;
function itemHTML(a, opts = {}) {
  const c = cat(a.cat) || { id: "etc", name: "지운 분야", p: 6 }, r = S.read.has(a.id);
  const meta = r ? `읽음 · ${esc(a.src)}` : `${opts.chip === false ? "" : chipCat(c)}${esc(a.src)} · ${esc(a.time)}${a.media ? ` · ${a.media}개 매체` : ""}`;
  return `<article class="it${r ? " read" : ""}${a.fresh ? " fresh" : ""}" data-aid="${a.id}" style="${cvars(c)}">${opts.n ? `<div class="n">${opts.n}</div>` : ""}
    <div class="b"><button type="button" class="t" data-open="${a.id}">${esc(a.title)}</button><div class="m">${meta}</div></div>
    <div class="ibs"><button type="button" class="ib" data-scrap="${a.id}" aria-pressed="${S.scrap.has(a.id)}" aria-label="스크랩">${ICON.star}</button><button type="button" class="ib" data-share="${a.id}" aria-label="공유">${ICON.share}</button></div></article>`;
}
const relCount = (a) => a.relCount != null ? a.relCount : (a.rel || []).length;
function topHTML(withRel = true) {
  const a = S.arts.find((x) => x.top); if (!a) return `<div class="none">오늘 기사를 불러오는 중이에요</div>`;
  const c = cat(a.cat), rels = a.rel || [], n = relCount(a), more = n - rels.length;
  const rel = withRel && rels.length ? `<div class="relbox${S.relOpen && !FX.relAnim ? " open" : ""}"><div class="relin">${rels.map(([m, t]) => `<div><span>${esc(m)}</span>${esc(t)}</div>`).join("")}${more > 0 ? `<div style="color:var(--faint)">외 ${more}건</div>` : ""}</div></div>` : "";
  const info = `${esc(a.src)} · ${a.time}${n ? ` · 관련 ${n}건` : ""}`;
  return `<article class="top"><div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center">${a.media ? `<span class="chip issue">이슈 · <b class="num">${a.media}</b>개 매체</span>` : ""}${chipCat(c)}</div>
    <button type="button" class="t" data-open="${a.id}" style="background:none;border:none;padding:0;text-align:left;color:inherit">${esc(a.title)}</button>
    ${a.sum ? `<p class="sum">${esc(a.sum)}</p>` : ""}
    <div class="m">${withRel && rels.length ? `<button type="button" class="relbtn" data-rel aria-expanded="${!!S.relOpen}" style="margin-right:auto">${info} <span>${S.relOpen ? "▴" : "▾"}</span></button>` : `<span style="margin-right:auto">${info}</span>`}
      <button type="button" class="ib" data-scrap="${a.id}" aria-pressed="${S.scrap.has(a.id)}" aria-label="스크랩">${ICON.star}</button>
      <button type="button" class="ib" data-share="${a.id}" aria-label="공유">${ICON.share}</button></div>${rel}</article>`;
}
function secHTML(c, limit = 2, edit = false) {
  const list = artsOf(c.id).filter((a) => !a.top).slice(0, limit);
  const body = list.length ? list.map((a) => itemHTML(a, { chip: false })).join("") : `<div class="empty">${!S.live ? `검색어(${esc((c.words || []).join(", ") || "-")})로 기사를 찾아 여기에 모아요.` : c.count ? "이 분야 기사는 위 '오늘 꼭 볼 기사'에 있어요." : `오늘은 아직 새 기사가 없어요 · 검색어: ${esc((c.words || []).join(", ") || "-")}`}</div>`;
  return `<section class="sec" style="${cvars(c)}"><div class="sec-h"><span class="nm">${esc(c.name)}</span><span class="ct">새 기사 ${c.count}</span>${edit ? `<button type="button" class="more" data-edit="${c.id}" style="margin-left:auto">수정</button><button type="button" class="more" data-more="${c.id}" style="margin-left:10px">전체 ›</button>` : `<button type="button" class="more" data-more="${c.id}">전체 ›</button>`}</div>${body}</section>`;
}
function attHTML() {
  const n = Math.min(3, S.read.size);
  return `<div class="att"><div class="dots">${[0, 1, 2].map((i) => `<i class="${i < n ? "on" : ""}"></i>`).join("")}</div><span>${n >= 3 ? "<b>오늘 출석 완료</b>" : `출석까지 <b>${3 - n}개</b>`}</span></div>`;
}

/* 시트 */
const findArt = (id) => S.arts.find((x) => x.id === id) || S.saved[id];
function shareText(a) {
  const d = a.t ? new Date(a.t) : new Date();
  return `□ ${a.title}\n - ${a.src}, ${d.getMonth() + 1}.${d.getDate()}.${a.media > 1 ? ` (${a.media}개 매체 보도)` : ""}${a.link ? `\n - ${a.link}` : ""}`;
}
function shareSheet(id) {
  const a = findArt(id); if (!a) return "";
  const canShare = !!navigator.share;
  return `<div class="grab"></div><div class="sh-head"><h2>이 기사 공유</h2><button type="button" class="x" data-close>닫기</button></div>
    <div class="share-g">
      <button type="button" data-copy="kakao" data-sid="${a.id}"><span class="ic" style="background:#FEE500">${ICON.talk}</span>${canShare ? "카카오톡·앱으로" : "카카오톡"}</button>
      <button type="button" data-copy="msg" data-sid="${a.id}"><span class="ic" style="background:#E6F7EE;color:#11804A">${ICON.copy}</span>메신저용 복사</button>
      <button type="button" data-copy="link" data-sid="${a.id}"><span class="ic" style="background:#F1F3F7;color:#46546B">${ICON.link}</span>링크 복사</button>
      <button type="button" data-copy="team" data-sid="${a.id}"><span class="ic" style="background:#E8EFFF;color:#1D4ED8">${ICON.team}</span>팀에 담기</button>
    </div>
    <div class="copybox"><b>메신저용 복사 — 네이버웍스 등 어디든 붙여넣기</b><pre id="copytext">${esc(shareText(a))}</pre></div>
    ${canShare ? "" : `<div class="st-note small" style="text-align:center">PC에서는 '메신저용 복사' 후 카카오톡 PC에 붙여넣어 주세요.</div>`}`;
}
const KW_MAX = 10; // 분야마다 검색어 최대 개수 (검색어 하나당 네이버 검색 1번)
function pushWord(list, v, app) {
  // 쉼표로 여러 개를 한 번에 넣어도 하나씩 나눠서 넣음
  const parts = v.split(/[,，、]/).map((x) => x.trim()).filter(Boolean);
  if (parts.length > 1) return parts.map((x) => pushWord(list, x, app)).some(Boolean);
  v = v.trim(); if (!v) return false;
  if (list.includes(v)) { toast(app, "이미 있는 말이에요"); return false; }
  if (list.length >= KW_MAX) { toast(app, `분야마다 ${KW_MAX}개까지 넣을 수 있어요`); return false; }
  list.push(v); return true;
}
function addSheet() {
  const d = S.draft, editing = !!d.id, used = new Set(S.cats.filter((c) => c.id !== d.id).map((c) => c.p));
  const p = PALETTE[d.p];
  return `<div class="grab"></div><div class="sh-head"><h2>${editing ? "분야 수정" : "분야 추가"}</h2><button type="button" class="x" data-close>취소</button></div>
    <label class="lbl" for="f-name">분야 이름</label>
    <input class="fld" id="f-name" value="${esc(d.name)}" placeholder="예: 스마트팜, 반려동물" autocomplete="off">
    <div style="display:flex;flex-direction:column;gap:8px"><span class="lbl">검색어 <small>· 하나라도 들어간 기사를 모아요 (${d.words.length}/${KW_MAX})</small></span>
      <div class="kws">${d.words.map((w, i) => `<button type="button" class="kw" data-delkw="${i}" aria-label="${esc(w)} 지우기">${esc(w)} <span style="opacity:.6">×</span></button>`).join("")}${d.words.length < KW_MAX ? `<form class="kwf" data-kwf><input class="kw-in" id="f-kw" placeholder="+ 검색어" enterkeyhint="done" autocomplete="off"><button type="submit" class="kw-add">추가</button></form>` : `<span class="kw-max">검색어는 ${KW_MAX}개까지예요</span>`}</div>
      <div class="kws"><span class="lbl" style="font-weight:500">빼는 말</span>${d.ex.map((w, i) => `<button type="button" class="kw ex" data-delex="${i}">${esc(w)} ×</button>`).join("")}<form class="kwf" data-kwf><input class="kw-in" id="f-ex" placeholder="+ 빼는 말" enterkeyhint="done" autocomplete="off"><button type="submit" class="kw-add">추가</button></form></div></div>
    <div style="display:flex;flex-direction:column;gap:8px"><span class="lbl">분야 색 <small>· 이미 쓰는 색은 고를 수 없어요</small></span>
      <div class="sw">${PALETTE.map((q, i) => `<button type="button" style="--c:${q.c}" data-pick="${i}" aria-pressed="${i === d.p}" aria-label="${q.nm}${used.has(i) ? " (사용 중)" : ""}" ${used.has(i) ? "disabled" : ""}>${i === d.p ? ICON.check : ""}</button>`).join("")}</div></div>
    <div style="display:flex;flex-direction:column;gap:6px"><span class="lbl">미리 보기</span>
      ${secPreview({ name: d.name || "새 분야", p: d.p, count: 0 })}</div>
    <button type="button" class="cta" data-addcat ${d.name.trim() && d.words.length ? "" : "disabled"}>${editing ? "저장" : "이 분야 추가"}</button>
    ${editing ? `<button type="button" class="delcat${d.askDel ? " ask" : ""}" data-delask>${d.askDel ? "한 번 더 누르면 삭제돼요 (스크랩은 남아요)" : "이 분야 삭제"}</button>` : ""}`;
}
function secPreview(c) { return `<section class="sec" style="${cvars(c)}"><div class="sec-h"><span class="nm">${esc(c.name)}</span><span class="ct">미리 보기</span></div><div class="empty">${S.draft.words.length ? `"${esc(S.draft.words.join('", "'))}"${S.draft.ex.length ? ` (빼는 말: ${esc(S.draft.ex.join(", "))})` : ""}로 찾은 기사가 여기에 모여요.` : "검색어를 하나 이상 넣어 주세요."}</div></section>`; }

function openSheet(app, kind, arg) {
  S.sheet = { kind, arg };
  if (kind === "edit") { const c = cat(arg); S.draft = { id: c.id, name: c.name, words: (c.words || []).slice(), ex: (c.ex || []).slice(), p: c.p }; }
  if (kind === "add") { const used = new Set(S.cats.map((c) => c.p)); S.draft = { name: "", words: [], ex: [], p: PALETTE.findIndex((_, i) => !used.has(i)) }; if (S.draft.p < 0) S.draft.p = 0; }
  renderSheet(app);
}
function renderSheet(app) {
  const old = $(".sheet", app); if (old && S.sheet) S.sheet.scroll = old.scrollTop;
  $$(".dim, .sheet", app).forEach((n) => n.remove());
  if (!S.sheet) return;
  const dim = document.createElement("div"); dim.className = "dim"; dim.dataset.close = "";
  const sh = document.createElement("section"); sh.className = "sheet"; sh.setAttribute("role", "dialog"); sh.setAttribute("aria-modal", "true");
  const k = S.sheet.kind;
  sh.innerHTML = k === "share" ? shareSheet(S.sheet.arg) : k === "dex" ? dexSheet(S.sheet.arg) : k.startsWith("team") || k === "invite" ? teamSheet(k, S.sheet.arg) : k.startsWith("sync") ? syncSheet(k) : addSheet();
  const keep = S.sheet.scroll || 0; requestAnimationFrame(() => { sh.scrollTop = keep; });
  app.append(dim, sh);
}
function closeSheet(app) { S.sheet = null; S.draft = null; renderSheet(app); }
function toast(app, msg) {
  $$(".toast", app).forEach((t) => t.remove());
  const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg; app.append(t);
  setTimeout(() => t.remove(), 2200);
}

/* 오프닝: 처음 열 때만, 기사 다 모이면 바로 넘어감(최대 2초) */
function playIntro(app, onDone) {
  $$(".intro", app).forEach((n) => n.remove());
  const el = document.createElement("div"); el.className = "intro"; el.setAttribute("aria-label", "오늘 기사를 불러오는 중");
  el.innerHTML = `<div class="in-top"><div class="date">${longDate()}</div><div class="big">DAILY<br> <b>BRIEFING</b></div><div class="msg">오늘 기사를 분야별로 모으고 있어요</div>
    <div class="rows">${S.cats.slice(0, 5).map((c) => `<div class="r" style="${cvars(c)};--w:0"><em>${esc(c.name)}</em><span>대기</span></div>`).join("")}</div></div>
    <div class="foot"><div class="bar"><i></i></div>처음 열 때만 보여요 · 최대 2초</div>`;
  app.append(el);
  const rows = $$(".r", el), bar = $(".bar i", el);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const step = reduce ? 0 : 300;
  rows.forEach((r, i) => setTimeout(() => {
    const c = S.cats[i]; r.classList.add("on"); r.style.setProperty("--w", Math.max(30, c.count * 18) + "px");
    $("span", r).textContent = `${c.count}건 ✓`; bar.style.width = ((i + 1) / rows.length * 100) + "%";
  }, 150 + i * step));
  setTimeout(() => { el.classList.add("out"); setTimeout(() => { el.remove(); onDone && onDone(); }, 380); }, reduce ? 300 : 150 + rows.length * step + 350);
}

/* 공통 클릭 처리 */
function bindCommon(app, rerender) {
  app.addEventListener("click", (e) => {
    const t = e.target.closest("button, [data-close]"); if (!t || !app.contains(t)) return;
    if (t.dataset.open) {
      const id = t.dataset.open, was = S.read.has(id), before = S.read.size; S.read.add(id); savePrefs(); if (!was) { DEX.reads += 1; saveDex(); }
      const art = S.arts.find((a) => a.id === id); if (art && art.link) window.open(art.link, "_blank", "noopener");
      if (!was) { FX.read = id; if (before < 3) FX.att = S.read.size; }
      if (!was && before < 3 && S.read.size >= 3) {
        FX.attDone = true;
        const y = new Date(); y.setDate(y.getDate() - 1); const yk = `${y.getFullYear()}-${y.getMonth() + 1}-${y.getDate()}`;
        DEX.streak = DEX.last === yk ? DEX.streak + 1 : 1; DEX.days += 1; DEX.last = todayKey();
        const pool = DEX.items.filter((x) => !owned(x) && x.kind !== "legend" && x.img);
        if (DEX.days === 1) { const w = DEX.items.find((x) => x.id === "i-wave"); if (w && !owned(w)) { w.got = md(new Date()); FX.hatch = w.id; } saveDex(); }
        else if (DEX.days % 5 === 0) { const nx = pool[Math.floor(Math.random() * pool.length)]; if (nx) { nx.got = md(new Date()); nx.line = nx.line || "오늘 출석으로 만난 새 친구예요."; FX.hatch = nx.id; } saveDex(); }
        else { saveDex(); toast(app, `오늘 출석 완료! 다음 친구까지 출석 ${5 - (DEX.days % 5)}일`); }
      } else if (!(art && art.link)) toast(app, "예시 기사예요 · 기사 연결 후 원문이 열려요");
      rerender(); return;
    }
    if (t.dataset.rel !== undefined) { S.relOpen = !S.relOpen; FX.relAnim = S.relOpen; rerender(); return; }
    if (t.dataset.scrap) { const id = t.dataset.scrap; if (S.scrap.has(id)) S.scrap.delete(id); else { S.scrap.add(id); rememberScrap(id); } savePrefs(); saveDex(); if (S.scrap.has(id)) FX.star = id; toast(app, S.scrap.has(id) ? "스크랩함에 담았어요" : "스크랩을 뺐어요"); rerender(); return; }
    if (t.dataset.share) { openSheet(app, "share", t.dataset.share); return; }
    if (t.dataset.close !== undefined) { closeSheet(app); return; }
    if (t.dataset.copy) {
      const a = findArt(t.dataset.sid), kind = t.dataset.copy; if (!a) return;
      if (kind === "team") { toast(app, "팀 스크랩함은 곧 열려요"); return; }
      const copy = (txt, msg) => { const ok = () => toast(app, msg); try { navigator.clipboard.writeText(txt).then(ok, () => toast(app, "복사하지 못했어요 · 글을 길게 눌러 복사해 주세요")); } catch (err) { toast(app, "복사하지 못했어요 · 글을 길게 눌러 복사해 주세요"); return; } };
      DEX.shares += 1; saveDex();
      // 카카오톡: 휴대폰 공유 창(카카오톡·문자·밴드 등)을 띄움. 공유 창이 없는 PC에서는 복사로 대신
      if (kind === "kakao") {
        if (navigator.share) { navigator.share({ title: a.title, text: shareText(a).replace(/\n - https?:\S+$/, ""), url: a.link || location.origin }).then(() => closeSheet(app)).catch(() => {}); return; }
        copy(shareText(a), "복사했어요 · 카카오톡에 붙여넣으세요"); closeSheet(app); return;
      }
      if (kind === "msg") copy(shareText(a), "복사했어요 · 메신저에 붙여넣으세요");
      if (kind === "link") copy(a.link || location.origin, "링크를 복사했어요");
      closeSheet(app); return;
    }
    if (t.dataset.pick) { S.draft.p = +t.dataset.pick; renderSheet(app); return; }
    if (t.dataset.delkw) { S.draft.words.splice(+t.dataset.delkw, 1); renderSheet(app); $("#f-kw", app).focus(); return; }
    if (t.dataset.delex) { S.draft.ex.splice(+t.dataset.delex, 1); renderSheet(app); return; }
    if (t.dataset.addcat !== undefined) {
      const d = S.draft;
      const pk = $("#f-kw", app), pe = $("#f-ex", app);
      if (pk && pk.value.trim()) pushWord(d.words, pk.value, app);
      if (pe && pe.value.trim()) pushWord(d.ex, pe.value, app);
      if (d.id) { Object.assign(cat(d.id), { name: d.name.trim(), p: d.p, words: d.words.slice(), ex: d.ex.slice() }); toast(app, `'${d.name.trim()}' 분야를 저장했어요 · 다음 새로고침부터 반영`); }
      else { S.cats.push({ id: "u" + Date.now(), name: d.name.trim(), p: d.p, count: 0, words: d.words.slice(), ex: d.ex.slice(), user: true }); toast(app, `'${d.name.trim()}' 분야를 추가했어요`); }
      savePrefs(); closeSheet(app); rerender(); if (S.live) fetchNews().then((n) => { applyNews(n); rerender(); }).catch(() => {}); return;
    }
    if (t.dataset.delask !== undefined) {
      const d = S.draft;
      if (!d.askDel) { d.askDel = true; renderSheet(app); return; }
      const nm = cat(d.id).name; S.cats = S.cats.filter((c) => c.id !== d.id); savePrefs(); toast(app, `'${nm}' 분야를 삭제했어요`); closeSheet(app); rerender(); return;
    }
    if (t.dataset.edit) { openSheet(app, "edit", t.dataset.edit); return; }
    if (t.dataset.dex) { openSheet(app, "dex", t.dataset.dex); return; }
    if (t.dataset.dextab) { dexTab = t.dataset.dextab; rerender(); return; }
    if (t.dataset.addopen !== undefined) { openSheet(app, "add"); return; }
  });
  app.addEventListener("input", (e) => {
    if (e.target.id === "f-kw" && S.draft) { const b = $("[data-addcat]", app); if (b) b.disabled = !(S.draft.name.trim() && (S.draft.words.length || e.target.value.trim())); }
    if (e.target.id === "f-name" && S.draft) { S.draft.name = e.target.value; const pos = e.target.selectionStart; const prev = $(".sheet .sec", app); if (prev) prev.outerHTML = secPreview({ name: S.draft.name || "새 분야", p: S.draft.p }); $("[data-addcat]", app).disabled = !(S.draft.name.trim() && S.draft.words.length); e.target.setSelectionRange(pos, pos); }
  });
  // 검색어 넣기: 키보드 완료(Enter)나 '추가' 버튼 모두 form 제출로 받음 (한글 입력 중 Enter가 무시되는 휴대폰 키보드 대응)
  app.addEventListener("submit", (e) => {
    const f = e.target.closest("[data-kwf]"); if (!f || !S.draft) return;
    e.preventDefault();
    const inp = $("input", f); const fid = inp.id;
    if (pushWord(fid === "f-kw" ? S.draft.words : S.draft.ex, inp.value, app)) { renderSheet(app); const n = $("#" + fid, app); if (n) n.focus(); }
  });
  app.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && S.sheet) closeSheet(app);
  });
}

/* ── 도감: 이삭이 · 새싹이 ── 출석 5일마다 1마리(이삭이/새싹이 중 랜덤), 전설은 업적으로 */
const IMG = __IMGS__;
const DEX = {
  days: 0, streak: 0, last: "", reads: 0, shares: 0, goldEgg: null,
  totals: { isak: 40, sprout: 40, legend: 20 },
  items: [
    { id: "i-wave", no: 1, kind: "isak", img: "wave", name: "굿모닝", line: "아침마다 먼저 인사하는 출근 요정." },
    { id: "i-run", no: 2, kind: "isak", img: "run", name: "러너 이삭이", line: "새 소식이 뜨면 제일 먼저 달려가요." },
    { id: "s-1", no: 1, kind: "sprout", img: "sprout", name: "새싹이", line: "이삭이를 따라다니는 아기 새싹. 오늘도 쑥쑥 자라는 중." },
    { id: "i-sleepy", no: 3, kind: "isak", img: "sleepy", name: "월요병", line: "월요일 아침엔 기사도 눈에 잘 안 들어와요." },
    { id: "i-rake", no: 4, kind: "isak", img: "rake", name: "밭가는 이삭이", line: "오늘도 기사 밭을 부지런히 갈아요." },
    { id: "s-2", no: 2, kind: "sprout", img: "s_pot", name: "화분", line: "화분 속 포근한 흙이 제일 좋아요. 물만 주면 쑥쑥!" },
    { id: "i-think", no: 5, kind: "isak", img: "think", name: "고민 중", line: "어떤 기사부터 읽을지 고민하는 중." },
    { id: "i-crossed", no: 6, kind: "isak", img: "crossed", name: "점심 고민", line: "오늘 점심은 뭐 먹지… 팔짱 끼고 고민 중." },
    { id: "i-skate", no: 7, kind: "isak", img: "skate", name: "퇴근길" },
    { id: "i-mag", no: 8, kind: "isak", img: "magnifier", name: "오탈자 검사" },
    { id: "i-mega", no: 9, kind: "isak", img: "megaphone", name: "공지 좀 읽어라" },
    { id: "i-basket", no: 10, kind: "isak", img: "basket", name: "풍년" },
    { id: "i-center", no: 11, kind: "isak", img: "center", name: "센터", line: "선글라스 끼고 무대 한가운데, 오늘의 주인공." },
    { id: "i-kkeok", no: 12, kind: "isak", img: "kkeok", name: "꺾기 장인", line: "반짝이 정장에 마이크 하나면 어디든 무대." },
    { id: "i-band", no: 13, kind: "isak", img: "band", name: "밴드부", line: "점심시간엔 베이스 둥둥, 오늘도 합주 중." },
    { id: "i-drib", no: 14, kind: "isak", img: "drib", name: "드리블러", line: "기사 사이를 요리조리, 공은 절대 안 뺏겨요." },
    { id: "i-bat", no: 15, kind: "isak", img: "bat", name: "4번 타자", line: "오늘의 헤드라인은 내가 친다, 한 방 있는 이삭이." },
    { id: "i-kick", no: 16, kind: "isak", img: "kick", name: "킥플립", line: "보드 위에서도 균형 잡고, 뉴스도 놓치지 않아요." },
    { id: "i-hike", no: 17, kind: "isak", img: "hike", name: "정상 등반", line: "주말엔 산으로! 정상에서 읽는 브리핑이 제일 맛있어요." },
    { id: "i-lab", no: 18, kind: "isak", img: "lab", name: "관찰 일지", line: "플라스크 속 변화를 하나도 놓치지 않고 기록해요." },
    { id: "i-ai", no: 19, kind: "isak", img: "ai", name: "딥러닝", line: "방석 깔고 앉아 AI랑 같이 농업의 미래를 공부해요." },
    { id: "i-drone", no: 20, kind: "isak", img: "drone", name: "드론 파일럿", line: "논밭 위를 한 바퀴, 하늘에서 보는 농사 소식." },
    { id: "i-paper", no: 21, kind: "isak", img: "paper", name: "논문 마감", line: "마감 전날 밤, 커피 한 잔과 서류 더미 사이에서." },
    { id: "i-cow", no: 22, kind: "isak", img: "cow", name: "얼룩이", line: "젖소 옷 입고 음메~ 축산 소식은 내가 먼저." },
    { id: "i-hanwoo", no: 23, kind: "isak", img: "hanwoo", name: "투뿔", line: "등급은 최상, 자신감도 최상인 한우 이삭이." },
    { id: "i-apple", no: 24, kind: "isak", img: "apple", name: "사과", line: "사과 모자 쓰고 바구니 가득, 오늘 수확도 풍성해요." },
    { id: "i-pear", no: 25, kind: "isak", img: "pear", name: "배", line: "달고 시원한 배 모자, 나주 배밭에서 막 왔어요." },
    { id: "i-tangerine", no: 26, kind: "isak", img: "tangerine", name: "귤", line: "장바구니 한가득 새콤달콤, 겨울엔 역시 귤이죠." },
    { id: "i-scarecrow", no: 27, kind: "isak", img: "scarecrow", name: "허수아비", line: "밀짚모자 쓰고 허수아비 친구 옆에서, 오늘도 논 지킴이." },
    { id: "i-weekend", no: 28, kind: "isak", img: "weekend", name: "주말 모드", line: "수건 터번에 버블티 한 잔, 오늘은 알림도 쉬어요." },
    { id: "i-book", no: 29, kind: "isak", img: "book", name: "책벌레", line: "동그란 안경 너머로 한 장 한 장, 오늘의 기사도 정독 중." },
    { id: "i-vacation", no: 30, kind: "isak", img: "vacation", name: "연락금지", line: "휴가 중엔 쉿! 캐리어 끌고 떠나는 중이에요." },
    { id: "i-walk", no: 31, kind: "isak", img: "walk", name: "산책 메이트", line: "강아지 친구랑 아침 산책, 오늘 소식은 걸으면서 들어요." },
    { id: "i-iced", no: 32, kind: "isak", img: "iced", name: "아아 수혈", line: "출근길 아이스 아메리카노 한 잔, 이제 하루 시작이에요." },
    { id: "i-night", no: 33, kind: "isak", img: "night", name: "야근 모드", line: "달 뜬 사무실, 모니터 불빛 아래 오늘도 마지막 퇴근." },
    { id: "i-report", no: 34, kind: "isak", img: "report", name: "보고 준비", line: "보고자료 꼭 끌어안고 결재 차례 기다리는 중… 떨려요." },
    { id: "i-tractor", no: 35, kind: "isak", img: "tractor", name: "트랙터 드라이버", line: "부릉부릉 출동! 오늘도 논두렁을 신나게 달려요." },
    { id: "i-weather", no: 36, kind: "isak", img: "weather", name: "오늘의 날씨", line: "우산 챙길까 말까? 날씨부터 알려 드릴게요." },
    { id: "i-kimchi", no: 37, kind: "isak", img: "kimchi", name: "김장 담당", line: "고무장갑 끼고 양념 쓱쓱, 올해 김장도 내가 책임져요." },
    { id: "i-pilot", no: 38, kind: "isak", img: "pilot", name: "기장님", line: "안전벨트 매세요, 오늘의 브리핑 곧 이륙합니다." },
    { id: "s-3", no: 3, kind: "sprout", img: "s_tea", name: "찻잔 반신욕", line: "따끈한 차에 퐁당, 오늘 하루 피로가 싹 풀려요." },
    { id: "s-4", no: 4, kind: "sprout", img: "s_box", name: "택배 상자", line: "짜잔! 오늘의 택배는 바로 나예요." },
    { id: "s-5", no: 5, kind: "sprout", img: "s_rice", name: "밥공기", line: "갓 지은 쌀밥 위가 제일 따뜻해요. 밥심으로 오늘도 힘내요!" },
    { id: "s-6", no: 6, kind: "sprout", img: "s_sock", name: "크리스마스 양말", line: "반짝반짝 전구 감고 양말 속에 쏙, 올해 선물은 나예요!" },
    { id: "s-7", no: 7, kind: "sprout", img: "s_rainbow", name: "무지개", line: "비 그친 뒤 무지개 아래, 오늘은 좋은 일만 생길 거예요." },
    { id: "s-8", no: 8, kind: "sprout", img: "s_songpyeon", name: "송편", line: "추석엔 송편 빚기! 양손에 하나씩, 제일 예쁜 건 내 거예요." },
    { id: "s-9", no: 9, kind: "sprout", img: "s_maple", name: "단풍", line: "가을이 오면 내 잎도 빨갛게 물들어요. 단풍 구경 같이 가요!" },
    { id: "s-10", no: 10, kind: "sprout", img: "s_angry", name: "화났어", line: "흥! 오늘 기사 안 읽으면 진짜 삐질 거예요." },
    { id: "s-11", no: 11, kind: "sprout", img: "s_heart", name: "하트", line: "오늘도 읽어 줘서 고마워요. 잎사귀까지 하트가 됐어요!" },
    { id: "s-12", no: 12, kind: "sprout", img: "s_sleepy", name: "꾸벅꾸벅", line: "점심 먹고 나면 눈꺼풀이 스르르… 5분만 잘게요." },
    { id: "s-13", no: 13, kind: "sprout", img: "s_balloon", name: "풍선 둥실", line: "풍선 세 개면 하늘까지 둥실! 기분도 같이 날아올라요." },
    { id: "s-14", no: 14, kind: "sprout", img: "s_headphone", name: "헤드폰", line: "좋아하는 노래 틀고 둠칫둠칫, 출근길이 신나요." },
    { id: "s-15", no: 15, kind: "sprout", name: "새싹이" },
    { id: "s-16", no: 16, kind: "sprout", name: "새싹이" },
    { id: "s-17", no: 17, kind: "sprout", name: "새싹이" },
    { id: "l-cheer", no: 1, kind: "legend", img: "cheer", name: "응원단장", cond: "연속 출석 30일", now: 0, goal: 30 },
    { id: "l-king", no: 2, kind: "legend", img: "king", name: "전하", cond: "출석 365일", now: 0, goal: 365 },
    { id: "l-kya", no: 3, kind: "legend", img: "kya", name: "캬~", cond: "금요일 저녁 출석 10번", now: 0, goal: 10 },
    { id: "l-newyear", no: 4, kind: "legend", img: "newyear", name: "새해 복", cond: "설 연휴에 가끔 나타나요 · 랜덤" },
    { id: "l-sprout", no: 5, kind: "legend", img: "gsprout", name: "황금 새싹", cond: "새싹이 40종 모두 모으기", now: 0, goal: 40 },
    { id: "l-dolsoe", no: 7, kind: "legend", img: "dolsoe", name: "돌쇠", cond: "기사 1,000개 읽기", now: 0, goal: 1000 },
    { id: "l-seonbi", no: 8, kind: "legend", img: "seonbi", name: "선비 이삭", cond: "스크랩 100개 모으기", now: 0, goal: 100 },
    { id: "l-doryeong", no: 9, kind: "legend", img: "doryeong", name: "도령", cond: "7일 연속 아침 8시 전에 출석", now: 0, goal: 7 },
    { id: "l-assi", no: 10, kind: "legend", img: "assi", name: "아씨", cond: "팀원과 기사 50번 공유하기", now: 0, goal: 50 },
    { id: "l-liberty", no: 11, kind: "legend", img: "liberty", name: "자유의 이삭", cond: "하루에 모든 분야 기사 읽기", now: 0, goal: 8 },
    { id: "l-army", no: 12, kind: "legend", img: "army", name: "충성!", cond: "출석 100일 (100일 휴가)", now: 0, goal: 100 },
    { id: "l-watermelon", no: 13, kind: "legend", img: "watermelon", name: "수박 한 통", cond: "여름(7~8월)에 가끔 나타나요 · 랜덤" },
    { id: "l-halloween", no: 14, kind: "legend", img: "halloween", name: "잭오랜턴", cond: "할로윈 주간에 가끔 나타나요 · 랜덤" },
    { id: "l-dracula", no: 15, kind: "legend", img: "dracula", name: "드라큘라", cond: "할로윈 주간에 가끔 나타나요 · 랜덤" },
    { id: "l-xmas", no: 16, kind: "legend", img: "xmas", name: "트리 장식", cond: "12월에 가끔 나타나요 · 랜덤" },
    { id: "l-golden", no: 17, kind: "legend", img: "golden", name: "황금 이삭", cond: "일반 이삭이 40종 모두 모으기", now: 0, goal: 40 },
    { id: "l-hidden", no: 6, kind: "legend", img: "bubble", name: "비눗방울", cond: "아주 가끔 나타나요 · 가장 희귀한 랜덤", hidden: true },
  ],
};
let dexTab = "all";
/* 도감 진행: 이 브라우저에 저장 (3단계에서 Supabase로) */
const DEX_KEY = "daily-briefing-dex";
const LEGEND_NOW = {
  "l-cheer": () => DEX.streak, "l-king": () => DEX.days, "l-army": () => DEX.days, "l-dolsoe": () => DEX.reads,
  "l-seonbi": () => S.scrap.size, "l-assi": () => DEX.shares,
  "l-sprout": () => DEX.items.filter((x) => x.kind === "sprout" && x.got).length, "l-golden": () => DEX.items.filter((x) => x.kind === "isak" && x.got).length,
};
function dexProgress() { DEX.items.forEach((x) => { if (x.goal && LEGEND_NOW[x.id]) x.now = Math.min(x.goal, LEGEND_NOW[x.id]()); }); }
function loadDex() {
  try {
    const d = JSON.parse(localStorage.getItem(DEX_KEY) || "{}");
    ["days", "streak", "last", "reads", "shares", "goldEgg"].forEach((k) => { if (d[k] != null) DEX[k] = d[k]; });
    Object.entries(d.got || {}).forEach(([id, when]) => { const x = DEX.items.find((i) => i.id === id); if (x) x.got = when; });
  } catch (e) {}
  dexProgress();
}
function saveDex() {
  dexProgress();
  try { localStorage.setItem(DEX_KEY, JSON.stringify({ days: DEX.days, streak: DEX.streak, last: DEX.last, reads: DEX.reads, shares: DEX.shares, goldEgg: DEX.goldEgg,
    got: Object.fromEntries(DEX.items.filter((x) => x.got).map((x) => [x.id, x.got])) })); } catch (e) {}
  syncSoon();
}
const owned = (x) => !!x.got;
function dexCount(kind) { return DEX.items.filter((x) => x.kind === kind && owned(x)).length; }
const KIND = { isak: "이삭이", sprout: "새싹이", legend: "전설" };
const dexNo = (x) => `${KIND[x.kind]} No.${String(x.no).padStart(3, "0")}`;
function dexArt(x, big) {
  if (!owned(x)) return `<span class="q">?</span>`;
  if (x.img) return `<img src="${IMG[x.img]}" alt="${esc(x.name)}" class="${owned(x) ? "" : "sil"}">`;
  if (x.hidden) return `<span class="q">?</span>`;
  return `<span class="sp-ph${owned(x) ? " on" : ""}" aria-hidden="true"><svg viewBox="0 0 48 48" width="${big ? 72 : 40}" height="${big ? 72 : 40}"><path d="M24 42V24" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M24 28c-9 0-14-5-14-13 8 0 14 4 14 13z" fill="currentColor"/><path d="M24 23c8 0 13-5 13-12-7 0-13 4-13 12z" fill="currentColor" opacity=".7"/></svg></span>`;
}
function dexNextHTML() {
  const left = 5 - (DEX.days % 5);
  return `<section class="dx-next"><div class="dx-egg" aria-hidden="true"><img src="${IMG.egg}" alt=""></div>
    <div class="dx-nt"><b>다음 친구까지 출석 ${left}일</b><small>출석 5일마다 이삭이나 새싹이 중 하나가 와요</small>
    <div class="dx-bar">${[0, 1, 2, 3, 4].map((i) => `<i class="${i < DEX.days % 5 ? "on" : ""}"></i>`).join("")}</div></div></section>${dexGoldHTML()}`;
}
function dexGoldHTML() {
  const g = DEX.goldEgg; if (!g) return "";
  return `<section class="dx-next gold"><div class="dx-egg" aria-hidden="true"><img src="${IMG.gEgg}" alt=""></div>
    <div class="dx-nt"><b>황금알 부화까지 출석 ${g.need - g.done}일</b><small>전설 조건을 채워 받은 알이에요. 출석 ${g.need}일을 채우면 깨어나요</small>
    <div class="dx-bar">${Array.from({ length: g.need }, (_, i) => `<i class="${i < g.done ? "on" : ""}"></i>`).join("")}</div></div></section>`;
}
function dexGridHTML() {
  const list = DEX.items.filter((x) => dexTab === "all" || x.kind === dexTab);
  return `<div class="dx-grid">${list.map((x) => {
    const lg = x.kind === "legend", o = owned(x);
    const sub = o ? (x.kind === "sprout" && !x.img ? "그림 준비 중" : dexNo(x)) : lg ? (x.goal ? `${x.cond} · ${x.now}/${x.goal}` : x.hidden ? "조건 비공개" : x.cond) : dexNo(x);
    return `<button type="button" class="dx-t${o ? " own" : ""}${lg ? " lg" : ""}${x.kind === "sprout" ? " spr" : ""}" data-dex="${x.id}">
      <span class="dx-a">${dexArt(x)}</span><span class="dx-n">${o ? esc(x.name) : "???"}</span><span class="dx-s">${esc(sub)}</span>
      ${lg && x.goal ? `<span class="dx-p"><i style="width:${Math.round(x.now / x.goal * 100)}%"></i></span>` : ""}</button>`;
  }).join("")}</div>`;
}
function dexTabsHTML() {
  const t = [["all", "전체", DEX.items.filter(owned).length, 100], ["isak", "이삭이", dexCount("isak"), DEX.totals.isak], ["sprout", "새싹이", dexCount("sprout"), DEX.totals.sprout], ["legend", "전설", dexCount("legend"), DEX.totals.legend]];
  return `<div class="dx-tabs" role="tablist">${t.map(([k, nm, n, tot]) => `<button type="button" role="tab" data-dextab="${k}" aria-selected="${dexTab === k}">${nm} <span>${n}/${tot}</span></button>`).join("")}</div>`;
}
function dexSheet(id) {
  const x = DEX.items.find((y) => y.id === id), o = owned(x), lg = x.kind === "legend";
  return `<div class="grab"></div><div class="sh-head"><h2>${o ? esc(x.name) : lg ? "아직 못 만난 전설" : "아직 못 만난 친구"}</h2><button type="button" class="x" data-close>닫기</button></div>
    <div class="dx-big${x.kind === "sprout" ? " spr" : ""}${lg ? " lg" : ""}">${dexArt(x, true)}</div>
    ${o ? `<p class="dx-line">${esc(x.line)}</p><div class="dx-meta">${dexNo(x)} · ${x.got}에 만났어요</div>`
      : lg ? `<p class="dx-line">${x.hidden ? "어떻게 얻는지는 비밀이에요. 꾸준히 읽다 보면 만날 수 있어요." : `조건: ${esc(x.cond)}. 채우면 누구인지 공개돼요.`}</p>${x.goal ? `<div class="dx-p big"><i style="width:${Math.round(x.now / x.goal * 100)}%"></i></div><div class="dx-meta">지금 ${x.now} / ${x.goal}</div>` : ""}`
      : `<p class="dx-line">출석 5일마다 랜덤으로 와요. 다음 친구까지 출석 ${5 - (DEX.days % 5)}일 남았어요.</p>`}`;
}

/* ── 팀 스크랩함: 만들기 · 초대 · 참여 ── */
S.teams = [];
const CODE_CH = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const rnd4 = () => Array.from({ length: 4 }, () => CODE_CH[Math.floor(Math.random() * CODE_CH.length)]).join("");
const teamOf = (id) => S.teams.find((t) => t.id === id);
function inviteText(t) { return `[DAILY BRIEFING] '${t.name}' 팀 스크랩함에 초대해요\n아래 링크를 누르면 바로 들어와요.\n링크: daily-briefing.vercel.app/#join=${t.code}\n코드: ${t.code}`; }
function teamSheet(kind, arg) {
  const head = (h, x = "닫기") => `<div class="grab"></div><div class="sh-head"><h2>${h}</h2><button type="button" class="x" data-close>${x}</button></div>`;
  if (kind === "teamStart") return head("팀 스크랩함") + `<p class="tm-p">팀원끼리 기사를 함께 모으는 공간이에요. 로그인 없이 초대 코드로 들어와요.</p>
    <button type="button" class="tm-opt" data-teamnew><b>새 팀 만들기</b><span>팀 이름만 정하면 초대 코드가 바로 생겨요</span></button>
    <button type="button" class="tm-opt" data-teamjoin><b>초대 코드로 참여</b><span>받은 코드(TEAM-로 시작)를 넣어요</span></button>`;
  if (kind === "teamNew") return head("새 팀 만들기", "취소") + `<label class="lbl" for="f-team">팀 이름</label>
    <input class="fld" id="f-team" placeholder="예: 연구제도팀, 스마트팜 스터디" autocomplete="off" value="${esc(S.draftTeam || "")}">
    <p class="tm-p">팀 이름은 나중에 바꿀 수 있어요.</p>
    <button type="button" class="cta" data-teamcreate ${(S.draftTeam || "").trim() ? "" : "disabled"}>팀 만들기</button>`;
  if (kind === "teamJoin") return head("초대 코드로 참여", "취소") + `<label class="lbl" for="f-code">초대 코드</label>
    <input class="fld" id="f-code" placeholder="TEAM-XXXX-XXXX" autocomplete="off" style="text-transform:uppercase;letter-spacing:.04em" value="${esc(S.draftCode || "")}">
    <p class="tm-p">초대 링크를 눌러 들어오면 이 칸은 자동으로 채워져요.</p>
    <button type="button" class="cta" data-dojoin ${/^TEAM-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test((S.draftCode || "").trim()) ? "" : "disabled"}>참여하기</button>`;
  if (kind === "invite") {
    const t = teamOf(arg);
    return head(arg === S.justMade ? "팀을 만들었어요" : "팀원 초대") + `<div class="tm-code"><small>${esc(t.name)} 초대 코드</small><b>${t.code}</b><span>팀원 ${t.members.length}명</span></div>
      <div class="share-g" style="grid-template-columns:repeat(3,minmax(0,1fr))">
        <button type="button" data-inv="kakao"><span class="ic" style="background:#FEE500">${ICON.talk}</span>카카오톡</button>
        <button type="button" data-inv="msg"><span class="ic" style="background:#E6F7EE;color:#11804A">${ICON.copy}</span>초대 문구 복사</button>
        <button type="button" data-inv="link"><span class="ic" style="background:#F1F3F7;color:#46546B">${ICON.link}</span>링크 복사</button></div>
      <div class="copybox"><b>네이버웍스 등 메신저에 붙여넣기</b><pre id="invtext">${esc(inviteText(t))}</pre></div>
      <p class="tm-p" style="font-size:12px">코드를 아는 사람은 누구나 들어올 수 있어요. 팀원에게만 보내 주세요.</p>`;
  }
  return "";
}
function bindTeams(app, rerender, onTeam) {
  app.addEventListener("click", (e) => {
    const t = e.target.closest("button"); if (!t || !app.contains(t)) return;
    if (t.dataset.teamstart !== undefined) { toast(app, "팀 스크랩함은 곧 열려요 · 서버 연결 뒤 바로 쓸 수 있어요"); return; }
    if (t.dataset.teamnew !== undefined) { S.draftTeam = ""; S.sheet = { kind: "teamNew" }; renderSheet(app); $("#f-team", app).focus(); return; }
    if (t.dataset.teamjoin !== undefined) { S.draftCode = ""; S.sheet = { kind: "teamJoin" }; renderSheet(app); $("#f-code", app).focus(); return; }
    if (t.dataset.invite) { S.justMade = null; S.sheet = { kind: "invite", arg: t.dataset.invite }; renderSheet(app); return; }
    if (t.dataset.teamcreate !== undefined) {
      const id = "t" + Date.now(); S.teams.push({ id, name: S.draftTeam.trim(), code: `TEAM-${rnd4()}-${rnd4()}`, members: ["경석"], items: [] });
      S.justMade = id; S.sheet = { kind: "invite", arg: id }; renderSheet(app); onTeam(id); rerender(); return;
    }
    if (t.dataset.dojoin !== undefined) {
      const id = "t" + Date.now(); S.teams.push({ id, name: "스마트팜 스터디", code: S.draftCode.trim().toUpperCase(), members: ["다은", "현우", "경석"], items: [{ who: "다은", title: "스마트팜 청년 창업 지원 확대", cat: "agri", note: "다음 모임 때 이야기해요" }] });
      closeSheet(app); onTeam(id); rerender(); toast(app, "'스마트팜 스터디'에 들어왔어요 (예시)"); return;
    }
    if (t.dataset.inv) {
      const tx = $("#invtext", app).textContent, code = tx.match(/코드: (\S+)/)[1];
      if (t.dataset.inv !== "kakao") { try { navigator.clipboard.writeText(t.dataset.inv === "link" ? `daily-briefing.vercel.app/#join=${code}` : tx).catch(() => {}); } catch (err) {} }
      toast(app, { kakao: "카카오톡 공유 창이 열려요 (실제 앱)", msg: "초대 문구를 복사했어요", link: "초대 링크를 복사했어요" }[t.dataset.inv]); return;
    }
  });
  app.addEventListener("input", (e) => {
    if (e.target.id === "f-kw" && S.draft) { const b = $("[data-addcat]", app); if (b) b.disabled = !(S.draft.name.trim() && (S.draft.words.length || e.target.value.trim())); }
    if (e.target.id === "f-team") { S.draftTeam = e.target.value; $("[data-teamcreate]", app).disabled = !S.draftTeam.trim(); }
    if (e.target.id === "f-code") { S.draftCode = e.target.value; $("[data-dojoin]", app).disabled = !/^TEAM-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(S.draftCode.trim()); }
  });
}
function teamBodyHTML(t, wideCls = "wide") {
  return `<div class="team-hero"><b>${esc(t.name)} · 팀원 ${t.members.length}명</b><span>${t.items.length ? `이번 주 모은 기사 ${t.items.length}건 · 한 번에 묶어 단체방에 붙여넣을 수 있어요` : "아직 담은 기사가 없어요. 기사 공유 › 팀에 담기로 모아요."}</span>
    <div class="tm-acts"><button type="button" data-invite="${t.id}">${ICON.team}팀원 초대</button>${t.items.length ? `<button type="button" data-weekly>${ICON.copy}주간 모음 복사</button>` : ""}</div></div>
    ${t.items.map((x) => { const c = cat(x.cat) || S.cats[0]; return `<article class="tcard"><div class="who"><span class="chip" style="background:#FFF4D6;color:#7A5A06">${esc(x.who)} 님이 담음</span>${chipCat(c)}</div><div class="tt">${esc(x.title)}</div>${x.note ? `<div class="note">${esc(x.note)}</div>` : ""}</article>`; }).join("")}`;
}

/* ── PC·휴대폰 동기화 (/api/sync → Supabase) ──
   - 로그인 대신 동기화 코드(DB-XXXX-XXXX-XXXX). 같은 코드를 넣은 기기는 같은 기록(분야·스크랩·출석·도감)을 씀
   - 바뀌면 2초 뒤 서버에 저장, 앱을 다시 볼 때마다 서버 기록을 받아 합침 */
const SYNC_KEY = "daily-briefing-sync";
S.sync = { code: "", at: "", dirty: false, dev: "", devices: {}, off: false, busy: false, last: 0 };
let syncTimer = null, syncRerender = () => {};
function saveSync() { try { const { code, at, dirty, dev, devices, last } = S.sync; localStorage.setItem(SYNC_KEY, JSON.stringify({ code, at, dirty, dev, devices, last })); } catch (e) {} }
function loadSync() {
  try { Object.assign(S.sync, JSON.parse(localStorage.getItem(SYNC_KEY) || "{}")); } catch (e) {}
  if (!S.sync.dev) { S.sync.dev = "d" + Math.random().toString(36).slice(2, 10); saveSync(); }
}
function devName() {
  const u = navigator.userAgent;
  if (/iPhone/.test(u)) return "아이폰"; if (/iPad/.test(u) || (/Macintosh/.test(u) && navigator.maxTouchPoints > 1)) return "아이패드";
  if (/Android/.test(u)) return /Mobile/.test(u) ? "안드로이드 휴대폰" : "안드로이드 태블릿";
  if (/Windows/.test(u)) return "PC (Windows)"; if (/Macintosh/.test(u)) return "Mac"; return "PC";
}
const readLS = (k) => { try { return JSON.parse(localStorage.getItem(k) || "{}"); } catch (e) { return {}; } };
function snapshot() { return { v: 1, prefs: readLS(STORE_KEY), dex: readLS(DEX_KEY), devices: { ...S.sync.devices, [S.sync.dev]: { name: devName(), at: Date.now() } } }; }
const dayNum = (k) => { const [y, m, d] = String(k || "0-0-0").split("-").map(Number); return (y || 0) * 10000 + (m || 0) * 100 + (d || 0); };
const uniq = (...xs) => [...new Set(xs.flat().filter(Boolean))];
// 서버 기록(r)과 이 기기 기록(l)을 합침. 이 기기에서 바꾼 게 없으면 서버 쪽을 따르고, 있으면 스크랩 등은 합치고 설정은 이 기기 것을 씀
function mergeData(r, l, dirty) {
  const rp = r.prefs || {}, lp = l.prefs || {};
  let p;
  if (!dirty) p = { ...lp, ...rp };
  else {
    p = { ...rp, ...lp, scrap: uniq(rp.scrap || [], lp.scrap || []), saved: { ...(rp.saved || {}), ...(lp.saved || {}) } };
    if (rp.readDay === lp.readDay) p.read = uniq(rp.read || [], lp.read || []);
  }
  const rd = r.dex || {}, ld = l.dex || {};
  const rFirst = (rd.days || 0) > (ld.days || 0) || ((rd.days || 0) === (ld.days || 0) && dayNum(rd.last) >= dayNum(ld.last));
  const base = rFirst ? rd : ld, other = rFirst ? ld : rd;
  const dex = { ...other, ...base, reads: Math.max(rd.reads || 0, ld.reads || 0), shares: Math.max(rd.shares || 0, ld.shares || 0),
    got: { ...(other.got || {}), ...(base.got || {}) }, goldEgg: base.goldEgg != null ? base.goldEgg : other.goldEgg ?? null };
  return { v: 1, prefs: p, dex, devices: { ...(r.devices || {}), ...(l.devices || {}) } };
}
function applyData(d) {
  const before = JSON.stringify(S.cats.map((c) => [c.id, c.words, c.ex]));
  try { localStorage.setItem(STORE_KEY, JSON.stringify(d.prefs || {})); localStorage.setItem(DEX_KEY, JSON.stringify(d.dex || {})); } catch (e) {}
  S.sync.devices = d.devices || {};
  loadPrefs(); loadDex();
  if (JSON.stringify(S.cats.map((c) => [c.id, c.words, c.ex])) !== before) fetchNews().then((n) => { applyNews(n); syncRerender(); }).catch(() => {});
}
async function syncApi(method, body, code) {
  const r = await fetch("/api/sync" + (code ? `?code=${encodeURIComponent(code)}` : ""), { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (r.status === 503) { S.sync.off = true; throw Object.assign(new Error("off"), { off: true }); }
  if (!r.ok) throw Object.assign(new Error(j.error || r.status), { status: r.status });
  S.sync.off = false; return j;
}
/* 바뀐 게 있으면 2초 뒤 저장 (savePrefs·saveDex에서 부름) */
function syncSoon() {
  if (S.sync.applying) return;
  S.sync.dirty = true; saveSync();
  if (!S.sync.code) return;
  clearTimeout(syncTimer); syncTimer = setTimeout(syncPush, 2000);
}
async function syncPush() {
  if (!S.sync.code) return;
  try {
    const data = snapshot(); const j = await syncApi("PUT", { code: S.sync.code, data });
    S.sync.at = j.updated_at; S.sync.dirty = false; S.sync.devices = data.devices; S.sync.last = Date.now(); saveSync();
  } catch (e) { if (e.status === 404) { S.sync.lost = true; saveSync(); } }
}
/* 서버 기록 받아서 합치기 (앱 열 때, 다시 볼 때) */
async function syncPull() {
  if (!S.sync.code || S.sync.busy) return;
  S.sync.busy = true;
  try {
    const j = await syncApi("GET", null, S.sync.code);
    if (j.updated_at !== S.sync.at) {
      S.sync.applying = true; applyData(mergeData(j.data || {}, snapshot(), S.sync.dirty)); S.sync.applying = false;
      S.sync.at = j.updated_at; saveSync(); syncRerender();
    }
    S.sync.last = Date.now(); saveSync();
    if (S.sync.dirty || !(S.sync.devices || {})[S.sync.dev]) await syncPush();
  } catch (e) { S.sync.applying = false; if (e.status === 404) { S.sync.lost = true; } }
  finally { S.sync.busy = false; }
}
function syncLine() {
  if (S.sync.code) return `연결됨 · ${S.sync.code}`;
  return "코드 하나로 PC와 휴대폰 기록을 맞춰요";
}
function agoT(t) { if (!t) return "아직 안 맞춤"; const m = Math.round((Date.now() - t) / 60000); return m < 1 ? "방금 맞춤" : m < 60 ? `${m}분 전 맞춤` : `${Math.floor(m / 60)}시간 전 맞춤`; }
function syncSheet(kind) {
  const head = (h) => `<div class="grab"></div><div class="sh-head"><h2>${h}</h2><button type="button" class="x" data-close>닫기</button></div>`;
  const joinBox = (label) => `<div style="display:flex;flex-direction:column;gap:8px"><label class="lbl" for="f-sync">${label} <small>· 다른 기기에서 받은 코드가 있으면</small></label>
      <div style="display:flex;gap:8px"><input class="fld" id="f-sync" placeholder="DB-XXXX-XXXX-XXXX" autocomplete="off" autocapitalize="characters" style="text-transform:uppercase;flex:1;min-width:0"><button type="button" class="cta" style="height:46px;padding:0 18px;flex:none" data-syncjoin>연결</button></div></div>`;
  if (kind === "syncHelp") return head("동기화는 이렇게 해요") + `<p class="tm-p">로그인 대신 <b>동기화 코드</b> 하나로 PC와 휴대폰을 묶어요. 내 분야, 스크랩함, 출석·도감이 같아져요.</p>
    <ol class="sy-steps">
      <li><b>한 기기에서 코드 만들기</b><span>설정 › PC·휴대폰 동기화에서 '새 코드 만들기'를 눌러요. DB-로 시작하는 코드가 생겨요.</span></li>
      <li><b>코드를 다른 기기로 옮기기</b><span>'나에게 보내기'로 카카오톡 '나와의 채팅'에 보내거나, '코드 복사' 후 메모에 붙여넣어요.</span></li>
      <li><b>다른 기기에서 코드 넣기</b><span>그 기기의 같은 화면에서 '다른 기기 코드로 연결'에 붙여넣고 연결을 눌러요. 두 기기 기록이 합쳐져요.</span></li>
      <li><b>끝</b><span>이제 한쪽에서 스크랩하거나 분야를 바꾸면, 다른 기기에서 앱을 다시 열 때 똑같이 보여요.</span></li>
    </ol>
    <div class="copybox"><b>꼭 알아 두세요</b><pre>· 코드가 열쇠예요. 남에게 알려 주지 마세요.
· 코드를 잃어버리면 되찾을 수 없어요. 카톡 '나와의 채팅'에 보내 두면 편해요.
· 팀 초대 코드와는 달라요.</pre></div>
    <button type="button" class="cta" data-sync>${S.sync.code ? "내 코드 보기" : "동기화 시작하기"}</button>`;
  if (S.sync.off) return head("PC·휴대폰 동기화") + `<div class="st-warn">동기화 서버를 준비하고 있어요. 조금 뒤에 다시 열어 주세요. 지금은 이 기기에만 저장돼요.<br><small>(서버에 SUPABASE_URL · SUPABASE_SECRET_KEY 설정이 아직 안 보여요)</small></div>`;
  const errBox = S.sync.err ? `<div class="st-warn" style="word-break:break-all">오류: ${esc(S.sync.err)}</div>` : "";
  if (!S.sync.code) return head("PC·휴대폰 동기화") + `<p class="tm-p">지금은 기록이 <b>이 기기에만</b> 저장돼요. 코드를 만들면 다른 기기에서도 같은 분야·스크랩·출석·도감을 볼 수 있어요.</p>
    ${errBox}<button type="button" class="cta" data-syncnew ${S.sync.busy ? "disabled" : ""}>이 기기에서 새 코드 만들기</button>
    ${joinBox("다른 기기 코드로 연결")}
    <button type="button" class="lnk" style="align-self:center" data-synchelp>사용 방법 보기</button>`;
  const devs = Object.entries(S.sync.devices || {}).sort((a, b) => b[1].at - a[1].at);
  return head("PC·휴대폰 동기화") + `<div class="tm-code"><small>내 동기화 코드</small><b>${esc(S.sync.code)}</b><span>${S.sync.lost ? "서버에서 이 코드를 찾지 못했어요. 연결을 끊고 다시 만들어 주세요." : `이 코드를 넣은 기기는 모두 같은 기록을 써요 · ${agoT(S.sync.last)}`}</span></div>
    <div class="share-g" style="grid-template-columns:repeat(3,minmax(0,1fr))">
      <button type="button" data-synccopy="code"><span class="ic" style="background:#E6F7EE;color:#11804A">${ICON.copy}</span>코드 복사</button>
      <button type="button" data-synccopy="kakao"><span class="ic" style="background:#FEE500">${ICON.talk}</span>나에게 보내기</button>
      <button type="button" data-syncnow><span class="ic" style="background:#E8EFFF;color:#1D4ED8">${ICON.refresh}</span>지금 맞추기</button></div>
    <div style="display:flex;flex-direction:column;gap:2px"><span class="lbl">이 코드를 쓰는 기기 ${devs.length || 1}대</span>
      ${(devs.length ? devs : [[S.sync.dev, { name: devName(), at: Date.now() }]]).map(([id, d]) => `<div class="sy-dev"><b>${esc(d.name)}${id === S.sync.dev ? " (이 기기)" : ""}</b><span>${id === S.sync.dev ? "지금 사용 중" : `마지막 사용 ${md(new Date(d.at))}`}</span></div>`).join("")}</div>
    ${joinBox("다른 코드로 바꾸기")}
    <div style="display:flex;justify-content:space-between"><button type="button" class="lnk" data-synchelp>사용 방법</button><button type="button" class="lnk" style="color:#B42828" data-syncoff>이 기기 연결 끊기</button></div>`;
}
function bindSync(app, rerender) {
  if (rerender) syncRerender = rerender;
  loadSync();
  const redraw = () => { if (S.sheet && S.sheet.kind.startsWith("sync")) renderSheet(app); syncRerender(); };
  // 앱을 다시 볼 때마다 서버 기록 받아오기
  syncPull().then(redraw);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") syncPull().then(redraw); else if (S.sync.dirty) syncPush(); });
  app.addEventListener("click", async (e) => {
    const t = e.target.closest("button"); if (!t || !app.contains(t)) return;
    if (t.dataset.synchelp !== undefined) { S.sheet = { kind: "syncHelp" }; renderSheet(app); return; }
    if (t.dataset.sync !== undefined) { S.sheet = { kind: "sync" }; renderSheet(app); if (S.sync.code) syncPull().then(redraw); return; }
    if (t.dataset.synccopy === "code") { try { navigator.clipboard.writeText(S.sync.code).then(() => toast(app, "코드를 복사했어요"), () => toast(app, "복사하지 못했어요 · 코드를 길게 눌러 복사해 주세요")); } catch (err) {} return; }
    if (t.dataset.synccopy === "kakao") {
      const text = `DAILY BRIEFING 동기화 코드: ${S.sync.code}\n다른 기기의 설정 › PC·휴대폰 동기화에서 '다른 기기 코드로 연결'에 넣어 주세요.`;
      if (navigator.share) navigator.share({ title: "DAILY BRIEFING 동기화 코드", text }).catch(() => {});
      else { try { navigator.clipboard.writeText(text).then(() => toast(app, "복사했어요 · 카카오톡 '나와의 채팅'에 붙여넣으세요")); } catch (err) {} }
      return;
    }
    if (t.dataset.syncnow !== undefined) { await syncPull(); if (S.sync.dirty) await syncPush(); redraw(); toast(app, S.sync.off ? "동기화 서버 준비 중이에요" : "다른 기기와 맞췄어요"); return; }
    if (t.dataset.syncoff !== undefined) {
      if (!t.dataset.ask) { t.dataset.ask = "1"; t.textContent = "한 번 더 누르면 끊겨요 (기록은 이 기기에 남아요)"; return; }
      Object.assign(S.sync, { code: "", at: "", lost: false, devices: {} }); saveSync(); renderSheet(app); toast(app, "이 기기 연결을 끊었어요"); return;
    }
    if (t.dataset.syncnew !== undefined) {
      S.sync.busy = true; renderSheet(app);
      try { const data = snapshot(); const j = await syncApi("POST", { data }); Object.assign(S.sync, { code: j.code, at: j.updated_at, dirty: false, devices: data.devices, last: Date.now(), lost: false }); saveSync(); toast(app, "코드를 만들었어요 · 다른 기기에 넣어 주세요"); }
      catch (err) { S.sync.err = err.off ? "" : String(err.message || err); toast(app, err.off ? "동기화 서버 준비 중이에요" : "코드를 만들지 못했어요 · 아래 오류 내용을 알려 주세요"); }
      S.sync.busy = false; renderSheet(app); return;
    }
    if (t.dataset.syncjoin !== undefined) {
      const v = ($("#f-sync", app).value || "").trim().toUpperCase().replace(/\s/g, "");
      if (!/^DB-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/.test(v)) { toast(app, "DB-XXXX-XXXX-XXXX 모양의 코드를 넣어 주세요"); return; }
      if (v === S.sync.code) { toast(app, "이미 이 코드로 연결돼 있어요"); return; }
      try {
        const j = await syncApi("GET", null, v);
        S.sync.applying = true; applyData(mergeData(j.data || {}, snapshot(), true)); S.sync.applying = false; // 두 기기 기록을 합침
        Object.assign(S.sync, { code: v, at: j.updated_at, dirty: true, lost: false }); saveSync();
        await syncPush(); renderSheet(app); syncRerender(); toast(app, "연결했어요 · 두 기기의 기록을 합쳤어요");
      } catch (err) { S.sync.applying = false; toast(app, err.off ? "동기화 서버 준비 중이에요" : err.status === 404 ? "없는 코드예요 · 다시 확인해 주세요" : "연결하지 못했어요 · 잠시 뒤 다시 해 주세요"); }
      return;
    }
  });
}
const CREDIT = `<div class="credit">연구정책국 연구정책과<span>Kyeong-seok Kwon</span></div>`;

/* ── 통계: '농촌진흥청'이 들어간 기사만 센다 (/api/stats) ──
   - 내 분야 검색어와 상관없이 모두 같은 기준
   - 네이버에서 거슬러 받을 수 있는 날(최대 1,000건)은 바로 채우고, 그 전 기간은 매일 기록이 쌓이면서 채워짐(5단계) */
const STAT_WORD = "농촌진흥청", STATS_KEY = "daily-briefing-stats";
S.statPeriod = 7; S.rda = null;
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const md = (d) => `${d.getMonth() + 1}월 ${d.getDate()}일`;
const mdS = (d) => `${d.getMonth() + 1}.${d.getDate()}`;
const dKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromKey = (k) => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
async function fetchStats() {
  try { const c = JSON.parse(localStorage.getItem(STATS_KEY) || "null"); if (c && c.today === dKey(new Date()) && Date.now() - c.at < 30 * 60000) { S.rda = c; return; } } catch (e) {}
  try {
    const r = await fetch("/api/stats"); if (!r.ok) throw new Error(r.status);
    S.rda = await r.json();
    try { localStorage.setItem(STATS_KEY, JSON.stringify(S.rda)); } catch (e) {}
  } catch (e) { S.rda = S.rda || { error: true }; }
}
function statsData() {
  const P = S.statPeriod, weekly = P === 90, R = S.rda && S.rda.days ? S.rda : null;
  const days = [];
  for (let i = P - 1; i >= 0; i--) { const date = addDays(TODAY, -i), k = dKey(date), v = R && R.days[k]; days.push({ i, date, ok: !!v, today: i === 0, n: v ? v.n : 0, m: v ? v.m : {} }); }
  let slots = days;
  if (weekly) { slots = []; for (let w = 0; w < 13; w++) { const part = days.slice(w * 7, w * 7 + 7), ok = part.filter((x) => x.ok); slots.push({ date: part[0].date, ok: ok.length > 0, partial: ok.length > 0 && ok.length < part.length, n: ok.reduce((s, x) => s + x.n, 0) }); } }
  const okDays = days.filter((x) => x.ok), have = okDays.length;
  const total = okDays.reduce((s, x) => s + x.n, 0);
  const done = okDays.filter((x) => !x.today); // 하루 평균은 다 끝난 날만
  const mc = {}; okDays.forEach((x) => Object.entries(x.m).forEach(([k, n]) => { mc[k] = (mc[k] || 0) + n; }));
  let prev = null;
  if (R) { const pd = []; for (let i = P; i < P * 2; i++) pd.push(R.days[dKey(addDays(TODAY, -i))]); if (pd.every(Boolean)) prev = pd.reduce((s, v) => s + v.n, 0); }
  const best = done.slice().sort((a, b) => b.n - a.n)[0];
  return { P, have, weekly, slots, total, avg: done.length ? done.reduce((s, x) => s + x.n, 0) / done.length : 0, prev, media: Object.entries(mc).sort((a, b) => b[1] - a[1]).slice(0, 5), best };
}
function chartSVG(D, W) {
  const H = 170, L = 34, R = 6, T = 10, B = 24, cw = W - L - R, ch = H - T - B, n = D.slots.length;
  const max = Math.max(10, ...D.slots.map((s) => s.n)), step = Math.ceil(max / 3 / 5) * 5, top = step * 3;
  const bw = cw / n, gap = Math.min(4, bw * 0.25);
  let g = "";
  for (let t = 0; t <= 3; t++) { const y = T + ch - (t * step / top) * ch; g += `<line x1="${L}" x2="${W - R}" y1="${y}" y2="${y}" stroke="var(--line)" stroke-width="1"/><text x="${L - 6}" y="${y + 4}" text-anchor="end" font-size="10" fill="var(--faint)">${t * step}</text>`; }
  let firstMissing = -1, lastMissing = -1;
  D.slots.forEach((s, i) => {
    const x = L + i * bw + gap / 2, w = bw - gap;
    if (!s.ok) { if (firstMissing < 0) firstMissing = i; lastMissing = i; g += `<rect x="${x}" y="${T + ch - 18}" width="${w}" height="18" rx="2" fill="url(#hatch)"/>`; return; }
    const h = s.n / top * ch, y = T + ch - h;
    g += `<rect class="bar" style="animation-delay:${i * (D.weekly ? 50 : n > 7 ? 18 : 60)}ms" x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#1E8A4C"${s.today ? ' fill-opacity=".55"' : ""}><title>${md(s.date)} ${s.n}건${s.today ? " (오늘, 집계 중)" : ""}</title></rect>`;
    if (n <= 7) g += `<text x="${x + w / 2}" y="${y - 4}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--sub)">${s.n}</text>`;
    if (s.partial) g += `<text x="${x + w / 2}" y="${y - 4}" text-anchor="middle" font-size="9" fill="var(--faint)">일부</text>`;
  });
  if (firstMissing >= 0) { const mx = L + ((firstMissing + lastMissing + 1) / 2) * bw; g += `<text x="${mx}" y="${T + ch - 26}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--faint)">수집 전 · 데이터 없음</text>`; }
  const labIdx = n <= 7 ? D.slots.map((_, i) => i) : [0, Math.floor(n / 2), n - 1];
  labIdx.forEach((i) => { const s = D.slots[i]; g += `<text x="${L + i * bw + bw / 2}" y="${H - 6}" text-anchor="middle" font-size="10" fill="var(--faint)">${D.weekly ? mdS(s.date) + "주" : n <= 7 ? ["일", "월", "화", "수", "목", "금", "토"][s.date.getDay()] + " " + s.date.getDate() : mdS(s.date)}</text>`; });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${D.weekly ? "주별" : "일별"} '${STAT_WORD}' 기사 수"><defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="var(--line2)"/><line x1="0" y1="0" x2="0" y2="6" stroke="var(--line)" stroke-width="3"/></pattern></defs>${g}</svg>`;
}
function statsHTML(wide) {
  const per = [[7, "최근 1주"], [30, "최근 1개월"], [90, "최근 3개월"]];
  const tabs = `<div class="st-per" role="tablist">${per.map(([p, nm]) => `<button type="button" role="tab" data-period="${p}" aria-selected="${S.statPeriod === p}">${nm}</button>`).join("")}</div>`;
  const head = `<section class="st-info"><b>'${STAT_WORD}'이 들어간 기사 통계</b><p>내 분야 검색어와 상관없이, 기사 제목이나 내용에 '${STAT_WORD}'이 들어간 기사만 세요. 모든 사람이 같은 숫자를 봐요.</p></section>`;
  if (!S.rda) return `<div class="st${wide ? " st-wide" : ""}">${tabs}${head}<div class="st-note">통계를 불러오는 중이에요…</div></div>`;
  if (S.rda.error) return `<div class="st${wide ? " st-wide" : ""}">${tabs}${head}<div class="st-warn">통계를 불러오지 못했어요. 잠시 뒤 새로고침해 주세요.</div></div>`;
  const D = statsData(), from = fromKey(S.rda.from);
  const chg = D.prev ? Math.round((D.total - D.prev) / D.prev * 100) : null;
  const partialNote = D.have < D.P ? `<div class="st-warn">${md(from)}부터 기사 수가 모여 있어요 (${D.P}일 중 ${D.have}일). 빗금 칸은 아직 모이지 않은 날이고, 앞으로 매일 채워져요.</div>` : "";
  const issues = S.rda.issues || [];
  return `<div class="st${wide ? " st-wide" : ""}">
    ${tabs}${head}${partialNote}
    <div class="st-tiles">
      <div><small>기사 수</small><b>${D.total.toLocaleString()}<span>건</span></b></div>
      <div><small>하루 평균</small><b>${D.avg.toFixed(1)}<span>건</span></b>${D.best ? `<em>가장 많은 날 ${md(D.best.date)} ${D.best.n}건</em>` : ""}</div>
      <div><small>이전 기간 대비</small>${chg === null ? `<b class="na">비교 전</b><em>이전 ${D.P}일 데이터가 아직 없어요</em>` : `<b class="${chg >= 0 ? "up" : "down"}">${chg >= 0 ? "+" : ""}${chg}<span>%</span></b>`}</div>
    </div>
    <section class="st-card"><h3>${D.weekly ? "주별" : "일별"} 기사 수 <small>오늘은 집계 중이라 연하게 표시</small></h3>${chartSVG(D, wide ? 1120 : 340)}</section>
    <div class="st-cols">
    <section class="st-card"><h3>많이 다룬 매체 <small>이 기간 상위 5</small></h3>${D.media.length ? D.media.map(([m, n], i) => `<div class="st-bar"><span>${i + 1}. ${esc(m)}</span><i><em style="width:${n / D.media[0][1] * 100}%;background:#1E8A4C"></em></i><b>${n}</b></div>`).join("") : `<div class="st-note small">아직 기사가 없어요</div>`}</section>
    <section class="st-card"><h3>오늘 많이 보도된 소식 <small>여러 매체가 함께 다룬 기사</small></h3>${issues.length ? issues.map(([t, n, link], i) => `<a class="st-rank" href="${esc(link)}" target="_blank" rel="noopener"><em>${i + 1}</em><span>${esc(t)}</span><b>${n}개 매체</b></a>`).join("") : `<div class="st-note small">여러 매체가 함께 다룬 소식이 아직 없어요</div>`}</section>
    </div>
    <div class="st-note small">네이버 뉴스 검색 기준 · 30분마다 갱신 · 같은 소식을 여러 매체가 쓰면 각각 셉니다.</div>
  </div>`;
}
function bindStats(app, rerender) {
  app.addEventListener("click", (e) => { const t = e.target.closest("button"); if (!t || !app.contains(t)) return; if (t.dataset.period) { S.statPeriod = +t.dataset.period; rerender(); } });
}

S.cats.forEach((c) => { c.count = artsOf(c.id).length; });

/* ── 분야 전체 보기: 그 분야 오늘 기사 전체 ── */
S.catView = { id: null, sort: "new", unread: false };
function catDetailHTML(id, wide) {
  const c = cat(id); if (!c) return "";
  let list = artsOf(id).slice();
  const unreadN = list.filter((a) => !S.read.has(a.id)).length;
  if (S.catView.unread) list = list.filter((a) => !S.read.has(a.id));
  list.sort(S.catView.sort === "new" ? (a, b) => mins(a.time) - mins(b.time) : (a, b) => (b.media || 1) - (a.media || 1) || mins(a.time) - mins(b.time));
  const issue = S.catView.unread ? null : artsOf(id).filter((a) => (a.media || 0) >= 3).sort((a, b) => b.media - a.media)[0];
  if (issue) list = list.filter((a) => a.id !== issue.id);
  return `<div class="cd" style="${cvars(c)}">
    <div class="cd-h"><div><span class="cd-nm">${esc(c.name)}</span><small>오늘 ${c.count}건 · 검색어 ${(c.words || []).map(esc).join(", ")}</small></div><button type="button" class="cd-edit" data-edit="${c.id}">수정</button></div>
    <div class="cd-bar">
      <div class="cd-seg"><button type="button" data-cdsort="new" aria-pressed="${S.catView.sort === "new"}">최신순</button><button type="button" data-cdsort="media" aria-pressed="${S.catView.sort === "media"}">많이 보도된 순</button></div>
      <button type="button" class="cd-unread" data-cdunread aria-pressed="${S.catView.unread}">안 읽은 것만 ${unreadN}</button></div>
    ${issue ? `<div class="cd-issue"><span class="chip issue">이 분야 오늘의 이슈 · ${issue.media}개 매체</span><button type="button" class="t" data-open="${issue.id}">${esc(issue.title)}</button></div>` : ""}
    ${list.length ? `<div class="list">${list.map((a) => itemHTML(a, { chip: false })).join("")}</div>` : `<div class="none">안 읽은 기사가 없어요. 오늘 이 분야는 다 읽었어요!</div>`}
    <div class="st-note small" style="text-align:center">어제 기사는 다음 날 아침까지 이곳에 남아 있어요.</div></div>`;
}
function bindCat(app, rerender) {
  app.addEventListener("click", (e) => {
    const t = e.target.closest("button"); if (!t || !app.contains(t)) return;
    if (t.dataset.cdsort) { S.catView.sort = t.dataset.cdsort; rerender(); }
    if (t.dataset.cdunread !== undefined) { S.catView.unread = !S.catView.unread; rerender(); }
  });
}


/* ── 실제 화면 모션: 렌더 직후 이번 동작에 맞는 효과만 붙인다 ── */
const FX = {};
let freshLeft = true;
function applyFX(app) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (FX.read) { const el = app.querySelector(`.it[data-aid="${FX.read}"]`); if (el) el.classList.add("justread"); }
  if (FX.att) { const d = app.querySelectorAll(".att .dots i")[FX.att - 1]; if (d) d.classList.add("fill"); if (FX.attDone) { const a = app.querySelector(".att"); if (a) setTimeout(() => a.classList.add("done"), 380); } }
  if (FX.star) { app.querySelectorAll(`[data-scrap="${FX.star}"]`).forEach((b) => b.classList.add("pop")); const nb = app.querySelector('.nav [data-tab="scrap"], .pnav [data-tab="scrap"]'); if (nb) nb.classList.add("bump"); }
  if (!FX.seenToday) {
    const mix = app.querySelector(".mix"); const num = app.querySelector(".top .num");
    if (mix || num) { FX.seenToday = true; if (mix) mix.classList.add("play");
      if (num && !reduce) { const end = +num.textContent, t0 = performance.now(); const step = (t) => { const p = Math.min(1, (t - t0) / 700); num.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }; num.textContent = "0"; requestAnimationFrame(step); } }
  }
  if (FX.relAnim) { const rb = app.querySelector(".relbox"); if (rb) requestAnimationFrame(() => requestAnimationFrame(() => rb.classList.add("open"))); }
  if (FX.enter) { const sc = app.querySelector(FX.enter); if (sc) sc.classList.add("enter"); }
  const hatch = FX.hatch;
  ["read", "att", "attDone", "star", "relAnim", "enter", "hatch"].forEach((k) => delete FX[k]);
  if (hatch) setTimeout(() => showHatch(app, hatch), 900);
}
function showHatch(app, id) {
  const x = DEX.items.find((y) => y.id === id);
  $$(".hx", app).forEach((n) => n.remove());
  const gold = x.kind === "legend";
  const el = document.createElement("div"); el.className = "hx" + (gold ? " gold" : ""); el.setAttribute("role", "dialog"); el.setAttribute("aria-label", "새 친구를 만났어요");
  el.innerHTML = `<div class="hx-card"><div class="hx-top">${gold ? `전설 · ${esc(x.cond)} 달성!` : `출석 ${DEX.days}일 달성!`}</div>
    <div class="hx-stage"><div class="hx-egg"><img class="w" src="${gold ? IMG.gEgg : IMG.egg}" alt=""><img class="b" src="${gold ? IMG.gEggBot : IMG.eggBot}" alt=""><img class="a" src="${gold ? IMG.gEggTop : IMG.eggTop}" alt=""></div>${x.img ? `<img src="${IMG[x.img]}" alt="${esc(x.name)}">` : `<span class="hx-sp">${dexArt(x, true)}</span>`}</div>
    <div class="hx-txt"><small>${dexNo(x)}</small><b>${esc(x.kind === "sprout" ? "새싹이" : x.name)}</b><span>${gold ? "전설 친구를 만났어요" : "새 친구를 만났어요"}</span></div>
    <div class="hx-btns"><button type="button" class="cta" data-hxgo>도감에서 보기</button><button type="button" class="hx-x" data-hxclose>닫기</button></div></div>`;
  app.append(el);
  setTimeout(() => el.classList.add("shake"), 250);
  setTimeout(() => el.classList.add("open"), 1500);
}

/* ── 빈 분야 칸: 분야를 더 넣을 수 있다는 걸 보여 줌 ── */
function addSlotHTML() {
  return `<button type="button" class="addslot" data-addopen><span class="as-plus" aria-hidden="true">+</span><b>분야 추가</b>
    <span class="as-t">관심 있는 주제를 검색어로 모아 볼 수 있어요</span><span class="as-ex" aria-hidden="true"><i>스마트팜</i><i>탄소중립</i><i>R&amp;D 예산</i></span></button>`;
}

/* ── 처음 접속 안내: 화면마다 한 번씩 보여 주고, 마지막에 분야별 검색어를 정함 ── */
const TOUR_KEY = "daily-briefing-tour";
const TOUR = [
  { tab: "today", img: "wave", t: "반가워요! DAILY BRIEFING이에요", d: "매일 내 분야 뉴스를 한곳에 모아 보여 드려요.<br>화면마다 무엇을 하는지 짧게 알려 드릴게요." },
  { tab: "today", img: "megaphone", t: "오늘", d: "여러 매체가 함께 다룬 소식을 먼저 골라 <b>오늘 꼭 볼 기사 5개</b>로 보여 줘요. 오른쪽 위 새로고침으로 최신 기사를 다시 불러와요." },
  { tab: "topics", img: "magnifier", t: "분야별", d: "분야마다 <b>검색어</b>로 기사를 모아요. 검색어가 하나라도 들어간 기사가 모이고, <b>빼는 말</b>이 들어간 기사는 빠져요. 분야별 통계도 여기서 볼 수 있어요." },
  { tab: "scrap", img: "basket", t: "스크랩함", d: "기사 옆 <b>별표</b>를 누르면 여기에 모여요. 다음 날에도 그대로 남아 있어요." },
  { tab: "dex", img: "sprout", t: "도감", d: "하루에 기사 <b>3개</b>를 읽으면 출석이에요. 출석 5일마다 이삭이나 새싹이 친구가 찾아오고, 특별한 기록을 세우면 황금 알이 나와요." },
  { tab: "topics", img: "think", t: "내 분야 검색어 정하기", setup: true, d: "검색어를 지우거나 더해 보세요. 나중에 분야별 화면의 <b>수정</b>이나 설정에서 언제든 바꿀 수 있어요." },
];
function tourSeen() { try { return !!localStorage.getItem(TOUR_KEY); } catch (e) { return true; } }
function startTour(app, goTab, rerender) {
  let i = 0;
  const draft = S.cats.map((c) => ({ id: c.id, words: (c.words || []).slice() }));
  const el = document.createElement("div"); el.className = "tour";
  $$(".tour", app).forEach((n) => n.remove());
  app.append(el);
  const draw = (focusId) => {
    const st = TOUR[i];
    goTab(st.tab);
    const setup = st.setup ? `<div class="tr-cats">${S.cats.map((c) => { const d = draft.find((x) => x.id === c.id); return `<div class="tr-cat" style="${cvars(c)}"><div class="tr-nm"><i></i>${esc(c.name)}</div>
        <div class="kws">${d.words.map((w, k) => `<button type="button" class="kw" data-twdel="${c.id}:${k}" aria-label="${esc(w)} 지우기">${esc(w)} <span style="opacity:.6">×</span></button>`).join("")}<form class="kwf" data-twf><input class="kw-in" data-twin="${c.id}" id="tw-${c.id}" placeholder="+ 검색어" enterkeyhint="done" autocomplete="off"><button type="submit" class="kw-add">추가</button></form></div></div>`; }).join("")}
        <button type="button" class="tr-add" data-tadd>+ 새 분야 만들기</button></div>` : "";
    el.innerHTML = `<div class="tr-dim"></div><section class="tr-card${focusId ? " still" : ""}" role="dialog" aria-modal="true" aria-label="사용 안내 ${i + 1} / ${TOUR.length}">
      <div class="tr-top">${IMG[st.img] ? `<img src="${IMG[st.img]}" alt="">` : ""}<div class="tr-dots" aria-hidden="true">${TOUR.map((_, k) => `<i${k === i ? ' class="on"' : ""}></i>`).join("")}</div>${st.setup ? "" : `<button type="button" class="tr-skip" data-tskip>건너뛰기</button>`}</div>
      <h2>${st.t}</h2><p>${st.d}</p>${setup}
      <div class="tr-btns">${i ? `<button type="button" class="tr-prev" data-tprev>이전</button>` : ""}<button type="button" class="tr-next" data-tnext>${st.setup ? "이대로 시작하기" : i === TOUR.length - 2 ? "검색어 정하기" : "다음"}</button></div></section>`;
    if (focusId) { const f = $("#" + focusId, el); if (f) f.focus(); }
  };
  const finish = (openAdd) => {
    try { localStorage.setItem(TOUR_KEY, todayKey()); } catch (e) {}
    let changed = false;
    draft.forEach((d) => { const c = cat(d.id); if (c && c.words.join() !== d.words.join()) { c.words = d.words; changed = true; } });
    el.remove(); savePrefs(); goTab("today");
    if (changed) { rerender(); fetchNews().then((n) => { applyNews(n); rerender(); }).catch(() => {}); }
    if (openAdd) openSheet(app, "add"); else if (S.afterTour) setTimeout(S.afterTour, 600);
  };
  const addWord = (inp) => { const d = draft.find((x) => x.id === inp.dataset.twin); if (pushWord(d.words, inp.value, app)) draw(inp.id); };
  el.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.tnext !== undefined) {
      if (TOUR[i].setup) { const pend = $$(".kw-in", el).filter((x) => x.value.trim()); pend.forEach((x) => pushWord(draft.find((y) => y.id === x.dataset.twin).words, x.value, app)); finish(false); }
      else { i++; draw(); }
      return;
    }
    if (b.dataset.tprev !== undefined) { i = Math.max(0, i - 1); draw(); return; }
    if (b.dataset.tskip !== undefined) { i = TOUR.length - 1; draw(); return; }
    if (b.dataset.tadd !== undefined) { finish(true); return; }
    if (b.dataset.twdel) { const [id, k] = b.dataset.twdel.split(":"); draft.find((x) => x.id === id).words.splice(+k, 1); draw("tw-" + id); return; }
  });
  el.addEventListener("submit", (e) => { const f = e.target.closest("[data-twf]"); if (!f) return; e.preventDefault(); e.stopPropagation(); addWord($("input", f)); });
  draw();
}

/* ── 홈 화면에 추가 안내 (모바일) ──
   - 안드로이드: 브라우저가 허락하면 바로 설치 창을 띄움, 안 되면 메뉴 위치를 안내
   - 아이폰: 웹에서 직접 추가할 수 없어서 Safari 공유 버튼 순서를 그림으로 안내 */
const A2HS_KEY = "daily-briefing-a2hs";
let installEvt = null;
window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); installEvt = e; });
window.addEventListener("appinstalled", () => { try { localStorage.setItem(A2HS_KEY, "done"); } catch (e) {} });
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("/sw.js").catch(() => {});
const isStandalone = () => window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const UA = navigator.userAgent;
const guessOS = () => (/iPhone|iPad|iPod/.test(UA) || (/Macintosh/.test(UA) && navigator.maxTouchPoints > 1) ? "ios" : /Android/.test(UA) ? "android" : "");
const inApp = () => /KAKAOTALK|NAVER\(inapp|Instagram|FBAN|FBAV|Line\//i.test(UA);
function a2hsDue() {
  if (isStandalone()) return false;
  try { const v = localStorage.getItem(A2HS_KEY); if (v === "done") return false; if (v && Date.now() - +v < 7 * 864e5) return false; } catch (e) { return false; }
  return true;
}
const SHARE_IC = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>`;
function showA2HS(app) {
  let os = guessOS();
  const el = document.createElement("div"); el.className = "tour a2hs";
  $$(".a2hs", app).forEach((n) => n.remove());
  app.append(el);
  const close = (later) => { try { localStorage.setItem(A2HS_KEY, later ? String(Date.now()) : "done"); } catch (e) {} el.remove(); };
  const steps = () => {
    if (os === "ios") return `${inApp() ? `<div class="a2-warn">지금은 앱 안 브라우저예요. 오른쪽 아래(또는 위) <b>⋯</b> 메뉴에서 <b>Safari로 열기</b>를 먼저 눌러 주세요.</div>` : ""}
      <ol class="a2-steps"><li>화면 아래(아이패드는 위)의 <b class="a2-ic">${SHARE_IC} 공유</b> 버튼을 눌러요</li><li>목록을 올려 <b>홈 화면에 추가</b>를 눌러요</li><li>오른쪽 위 <b>추가</b>를 누르면 끝!</li></ol>`;
    if (installEvt) return `<p class="a2-p">아래 버튼을 누르고 <b>설치</b>(또는 추가)를 고르면 홈 화면에 아이콘이 생겨요.</p><button type="button" class="tr-next a2-go" data-a2install>홈 화면에 추가하기</button>`;
    return `${inApp() ? `<div class="a2-warn">지금은 앱 안 브라우저예요. 메뉴 <b>⋮</b>에서 <b>다른 브라우저로 열기</b>(Chrome)를 먼저 눌러 주세요.</div>` : ""}
      <ol class="a2-steps"><li><b>Chrome</b>: 오른쪽 위 <b>⋮</b> 메뉴 → <b>홈 화면에 추가</b> → <b>설치</b>(또는 추가)</li><li><b>삼성 인터넷</b>: 아래 <b>≡</b> 메뉴 → <b>현재 페이지 추가</b> → <b>홈 화면</b></li></ol>`;
  };
  const draw = () => {
    el.innerHTML = `<div class="tr-dim" data-a2later></div><section class="tr-card" role="dialog" aria-modal="true" aria-label="홈 화면에 추가">
      <div class="tr-top"><img src="/icon-192.png" alt="" style="width:56px;height:56px;border-radius:14px"><div><h2 style="font-size:18px">홈 화면에 추가할까요?</h2><p style="font-size:13.5px">앱처럼 아이콘을 눌러 바로 열 수 있어요.</p></div></div>
      <div class="pills a2-os" role="tablist"><button type="button" role="tab" data-a2os="ios" aria-pressed="${os === "ios"}">아이폰 (애플)</button><button type="button" role="tab" data-a2os="android" aria-pressed="${os === "android"}">안드로이드</button></div>
      ${os ? steps() : `<p class="a2-p">쓰고 계신 휴대폰을 골라 주세요.</p>`}
      <div class="tr-btns"><button type="button" class="tr-prev" style="flex:1" data-a2later>다음에 할게요</button>${os && !(os === "android" && installEvt) ? `<button type="button" class="tr-next" data-a2done>추가했어요</button>` : ""}</div></section>`;
  };
  el.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-a2os],[data-a2install],[data-a2later],[data-a2done]"); if (!b) return;
    if (b.dataset.a2os) { os = b.dataset.a2os; draw(); return; }
    if (b.dataset.a2later !== undefined) { close(true); return; }
    if (b.dataset.a2done !== undefined) { close(false); toast(app, "홈 화면 아이콘으로 열어 보세요"); return; }
    if (b.dataset.a2install !== undefined && installEvt) {
      installEvt.prompt(); const { outcome } = await installEvt.userChoice; installEvt = null;
      if (outcome === "accepted") { close(false); toast(app, "홈 화면에 추가했어요"); } else draw();
    }
  });
  draw();
}
