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
const artsOf = (id) => S.arts.filter((a) => (a.cats ? a.cats.includes(id) : a.cat === id));
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
// 밤새 켜 둔 화면은 날이 바뀐 뒤 다시 볼 때 새로 열어서 오늘 기사·출석·통계로 바꿈
const BOOT_DAY = todayKey();
const dayCheck = () => { if (document.visibilityState === "visible" && todayKey() !== BOOT_DAY) location.reload(); };
document.addEventListener("visibilitychange", dayCheck); setInterval(dayCheck, 10 * 60000);
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
    S.readDay = todayKey();
    // 예전 기본 분야(정책·제도 포함 4개)를 손대지 않고 쓰던 경우엔 새 기본 분야로 바꿈
    const oldDefault = !p.catsVer && Array.isArray(p.cats) && p.cats.map((c) => c.id).join() === "agri,sci,it,pol" && !p.cats.some((c) => c.user);
    if (Array.isArray(p.myTeams)) S.myTeams = p.myTeams.filter((t) => t && t.code && t.token);
    if (typeof p.nick === "string") S.nick = p.nick;
    if (!oldDefault && Array.isArray(p.cats) && (p.cats.length || p.catsVer)) S.cats = p.cats.map((c) => ({ ...c, count: artsOf(c.id).length }));
  } catch (e) {}
}
function savePrefs() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ mode: S.mode, size: S.size, scrap: [...S.scrap], saved: Object.fromEntries([...S.scrap].filter((id) => S.saved[id]).map((id) => [id, S.saved[id]])), read: [...S.read], readDay: S.readDay || todayKey(), catsVer: 2, myTeams: S.myTeams, nick: S.nick,
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
  if (m < 1) return "방금"; if (m < 60) return `${m}분 전`; const h = Math.floor(m / 60); if (h < 24) return `${h}시간 전`; const d = Math.floor(h / 24); return d < 2 ? "어제" : `${d}일 전`;
}
function applyNews(byCat) {
  // 같은 기사가 여러 분야 검색어에 걸리면 그 분야들 모두에 보여 줌 (cats), 대표 분야(cat)는 첫 번째
  const arts = [];
  S.cats.forEach((c) => (byCat[c.id] || []).forEach((g) => {
    const had = arts.find((a) => a.id === g.id);
    if (had) { if (!had.cats.includes(c.id)) had.cats.push(c.id); return; }
    arts.push({ ...g, cat: c.id, cats: [c.id], time: ago(g.t), relCount: g.media > 1 ? g.media - 1 : (g.rel || []).length });
  }));
  S.arts = arts; rankArts();
  S.live = true;
}
// 오늘 꼭 볼 기사: 여러 매체가 다룬 소식 순, 같으면 주요 언론사 기사 먼저, 그다음 최신 순. 1위는 크게(요약·관련 기사), 2~5위는 번호 목록
function rankArts() {
  S.arts.forEach((a) => { delete a.top; delete a.pick; });
  const ranked = S.arts.filter((a) => !a.t || Date.now() - a.t < 36 * 3600e3).sort((a, b) => (b.media - a.media) || ((a.tier || 3) - (b.tier || 3)) || (b.t - a.t));
  ranked.slice(0, 5).forEach((a, i) => { if (i === 0) a.top = true; else a.pick = i + 1; });
  S.cats.forEach((c) => { c.count = artsOf(c.id).length; });
}
// 분야를 지우면 그 분야로만 모인 기사는 바로 빼고 순위를 다시 매김
function pruneArts() {
  if (!S.live) return;
  S.arts.forEach((a) => { a.cats = (a.cats || [a.cat]).filter((id) => cat(id)); a.cat = a.cats[0]; });
  S.arts = S.arts.filter((a) => a.cats.length); rankArts();
}
let newsSeq = 0, lastByCat = {};
// 분야마다 따로 불러옴. 한 분야가 실패하거나 늦어도 나머지는 보여 주고, 실패한 분야는 직전 기사를 유지
// 더 나중에 시작한 불러오기가 있으면 이번 결과는 버림 (오래된 결과가 새 결과를 덮지 않게)
async function fetchNews() {
  const my = ++newsSeq, out = {};
  const rs = await Promise.allSettled(S.cats.map(async (c) => {
    const q = (c.words || []).join(","); if (!q) { out[c.id] = []; return; }
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 12000);
    try {
      const r = await fetch(`/api/news?q=${encodeURIComponent(q)}&ex=${encodeURIComponent((c.ex || []).join(","))}`, { signal: ctl.signal });
      if (!r.ok) throw new Error(r.status);
      out[c.id] = (await r.json()).items || [];
    } catch (e) { if (lastByCat[c.id]) out[c.id] = lastByCat[c.id]; throw e; } finally { clearTimeout(tm); }
  }));
  if (my !== newsSeq) throw Object.assign(new Error("stale"), { stale: true });
  if (rs.every((r) => r.status === "rejected")) throw new Error("all failed");
  lastByCat = { ...lastByCat, ...out };
  try { localStorage.setItem(NEWS_KEY, JSON.stringify({ day: todayKey(), at: Date.now(), byCat: out })); } catch (e) {}
  return out;
}
function loadCachedNews() {
  try { const c = JSON.parse(localStorage.getItem(NEWS_KEY) || "null"); if (c && c.day === todayKey()) { lastByCat = c.byCat || {}; applyNews(c.byCat); return true; } } catch (e) {}
  return false;
}
/* 스크랩한 기사는 다음 날에도 보이게 따로 보관 */
function rememberScrap(id) { const a = S.arts.find((x) => x.id === id); if (a) S.saved[id] = { id: a.id, cat: a.cat, title: a.title, src: a.src, link: a.link, t: a.t, time: a.time }; }
function scrapList() { return [...S.scrap].reverse().map((id) => S.arts.find((a) => a.id === id) || S.saved[id]).filter(Boolean).map((a) => ({ ...a, time: a.t ? ago(a.t) : a.time })); }
/* 새로고침: 다시 불러와서 새로 생긴 기사 수를 알려 줌 */
let NEWS_AT = 0; // 마지막으로 서버에서 기사를 받은 시각
function newPill(app, n) {
  $$(".newpill", app).forEach((x) => x.remove());
  const p = document.createElement("button"); p.type = "button"; p.className = "newpill"; p.dataset.gonew = ""; p.textContent = `새 기사 ${n}건 · 분야별에서 보기`; app.append(p);
  setTimeout(() => p.remove(), 5000); setTimeout(() => S.arts.forEach((a) => delete a.fresh), 2500);
}
async function refreshNews(app, btn, rerender, onNew) {
  btn.classList.remove("spin"); void btn.offsetWidth; btn.classList.add("spin");
  const before = new Set(S.arts.map((a) => a.id));
  fetchStats(true).then(rerender);
  try {
    applyNews(await fetchNews()); NEWS_AT = Date.now();
    const fresh = S.arts.filter((a) => !before.has(a.id));
    fresh.forEach((a) => { a.fresh = true; });
    rerender();
    if (!fresh.length) { toast(app, "새 기사가 없어요 · 방금 확인했어요"); return; }
    newPill(app, fresh.length);
  } catch (e) { if (!e.stale) toast(app, "기사를 불러오지 못했어요 · 잠시 뒤 다시 눌러 주세요"); }
}
/* 다른 앱을 쓰다 돌아왔을 때: 마지막으로 불러온 지 10분이 지났으면 조용히 새로고침
   (새 기사가 있을 때만 '새 기사 N건' 알림, 없으면 아무 표시 없음) */
const AUTO_REFRESH_MS = 10 * 60000;
let autoBusy = false;
async function autoRefresh(rerender) {
  if (document.visibilityState !== "visible" || autoBusy || !NEWS_AT || Date.now() - NEWS_AT < AUTO_REFRESH_MS) return;
  autoBusy = true;
  const app = document.getElementById("app"), before = new Set(S.arts.map((a) => a.id));
  try {
    fetchStats(true).then(rerender);
    applyNews(await fetchNews()); NEWS_AT = Date.now();
    const fresh = S.arts.filter((a) => !before.has(a.id));
    fresh.forEach((a) => { a.fresh = true; });
    rerender();
    if (fresh.length && app) newPill(app, fresh.length);
  } catch (e) { /* 조용히 넘어감: 다음에 돌아올 때 다시 시도 */ }
  autoBusy = false;
}
/* 처음 열 때: 보관된 오늘 기사 → 바로 표시, 그 뒤 서버에서 최신으로 */
async function bootNews(rerender) {
  loadCachedNews(); rerender();
  fetchStats().then(rerender);
  try { applyNews(await fetchNews()); NEWS_AT = Date.now(); rerender(); } catch (e) { /* 서버 준비 전에는 예시 기사 유지 */ }
  document.addEventListener("visibilitychange", () => autoRefresh(rerender));
  window.addEventListener("pageshow", (e) => { if (e.persisted) autoRefresh(rerender); }); // 뒤로가기 캐시에서 돌아온 경우
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
  return `<article class="it${r ? " read" : ""}${a.fresh ? " fresh" : ""}" data-aid="${a.id}" data-card style="${cvars(c)}">${opts.n ? `<div class="n">${opts.n}</div>` : ""}
    <div class="b"><button type="button" class="t" data-open="${a.id}">${esc(a.title)}</button><div class="m">${meta}</div></div>
    <div class="ibs"><button type="button" class="ib" data-scrap="${a.id}" aria-pressed="${S.scrap.has(a.id)}" aria-label="스크랩">${ICON.star}</button><button type="button" class="ib" data-share="${a.id}" aria-label="공유">${ICON.share}</button></div></article>`;
}
// 링크는 http(s)만 (javascript: 같은 주소가 섞여 들어와도 열리지 않게)
const safeUrl = (u) => { try { const x = new URL(String(u || "")); return /^https?:$/.test(x.protocol) ? x.href : ""; } catch (e) { return ""; } };
const relCount = (a) => a.relCount != null ? a.relCount : (a.rel || []).length;
function topHTML(withRel = true) {
  const a = S.arts.find((x) => x.top); if (!a) return `<div class="none">오늘 기사를 불러오는 중이에요</div>`;
  const c = cat(a.cat), rels = a.rel || [], n = relCount(a), more = n - rels.length;
  const rel = withRel && rels.length ? `<div class="relbox${S.relOpen && !FX.relAnim ? " open" : ""}"><div class="relin">${rels.map(([m, t]) => `<div><span>${esc(m)}</span>${esc(t)}</div>`).join("")}${more > 0 ? `<div style="color:var(--faint)">외 ${more}건</div>` : ""}</div></div>` : "";
  const info = `${esc(a.src)} · ${a.time}${n ? ` · 관련 ${n}건` : ""}`;
  return `<article class="top" data-card><div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center">${a.media ? `<span class="chip issue">이슈 · <b class="num">${a.media}</b>개 매체</span>` : ""}${chipCat(c)}</div>
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
      <button type="button" data-copy="kakao" data-sid="${a.id}"><span class="ic" style="background:#FEE500">${ICON.talk}</span>${kakaoOn() || !canShare ? "카카오톡" : "카카오톡·앱으로"}</button>
      <button type="button" data-copy="msg" data-sid="${a.id}"><span class="ic" style="background:#E6F7EE;color:#11804A">${ICON.copy}</span>메신저용 복사</button>
      <button type="button" data-copy="link" data-sid="${a.id}"><span class="ic" style="background:#F1F3F7;color:#46546B">${ICON.link}</span>링크 복사</button>
      <button type="button" data-copy="team" data-sid="${a.id}"><span class="ic" style="background:#E8EFFF;color:#1D4ED8">${ICON.team}</span>팀에 담기</button>
    </div>
    <div class="copybox"><b>메신저용 복사 — 네이버웍스 등 어디든 붙여넣기</b><pre id="copytext">${esc(shareText(a))}</pre></div>
    ${canShare || kakaoOn() ? "" : `<div class="st-note small" style="text-align:center">PC에서는 '메신저용 복사' 후 카카오톡 PC에 붙여넣어 주세요.</div>`}`;
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
  dexCardStop(); // 움직이는 도감 카드 정리
  const old = $(".sheet", app); if (old && S.sheet) S.sheet.scroll = old.scrollTop;
  $$(".dim, .sheet", app).forEach((n) => n.remove());
  if (!S.sheet) return;
  const dim = document.createElement("div"); dim.className = "dim"; dim.dataset.close = "";
  const sh = document.createElement("section"); sh.className = "sheet"; sh.setAttribute("role", "dialog"); sh.setAttribute("aria-modal", "true");
  const k = S.sheet.kind;
  sh.innerHTML = k === "share" ? shareSheet(S.sheet.arg) : k === "dex" ? dexSheet(S.sheet.arg) : k.startsWith("team") || k === "invite" ? teamSheet(k, S.sheet.arg) : k.startsWith("sync") ? syncSheet(k) : k === "statDay" ? statDaySheet(S.sheet.arg) : addSheet();
  const keep = S.sheet.scroll || 0; requestAnimationFrame(() => { sh.scrollTop = keep; });
  app.append(dim, sh);
  if (k === "dex" && sh.querySelector(".dxc")) { sh.classList.add("dxc-sheet"); dim.classList.add("dxc-dim"); sh.setAttribute("aria-label", "도감 카드"); dexCardMount(sh); }
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
/* 연속 출석: 마지막 출석일과 오늘 사이에 빠진 평일이 없으면 이어짐 (주말·공휴일은 빼고 셈) */
const HOLIDAYS = new Set(["2026-12-25", "2027-1-1", "2027-2-8", "2027-2-9", "2027-3-1", "2027-3-3", "2027-5-5", "2027-5-13", "2027-6-3", "2027-8-16", "2027-9-14", "2027-9-15", "2027-9-16", "2027-10-4", "2027-10-11", "2027-12-27"]);
const restDay = (d) => d.getDay() === 0 || d.getDay() === 6 || HOLIDAYS.has(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
function gapOk(lastKey) {
  if (!lastKey) return false;
  const [y, m, dd] = lastKey.split("-").map(Number), d = new Date(y, m - 1, dd), t = new Date(); t.setHours(0, 0, 0, 0);
  for (d.setDate(d.getDate() + 1); d < t; d.setDate(d.getDate() + 1)) if (!restDay(d)) return false;
  return true;
}
/* 기사 하나 읽음 → 하루 3개면 출석. 오늘·분야별·스크랩·팀 스크랩함·통계 어디서 열어도 똑같이 셈 */
function markRead(app, id) {
  if (S.readDay !== todayKey()) { S.read = new Set(); S.readDay = todayKey(); } // 밤새 켜 둔 화면: 날이 바뀌면 오늘 읽음을 새로 셈
  const was = S.read.has(id), before = S.read.size; S.read.add(id); savePrefs(); if (!was) { DEX.reads += 1; saveDex(); }
  if (!was) { FX.read = id; if (before < 3) FX.att = S.read.size; }
  if (!was && before < 3 && S.read.size >= 3 && DEX.last !== todayKey()) { // 출석은 하루 한 번 (다른 기기에서 이미 했으면 넘어감)
    FX.attDone = true;
    const now = new Date(), hatches = [];
    DEX.streak = gapOk(DEX.last) ? DEX.streak + 1 : 1; DEX.days += 1; DEX.last = todayKey();
    if (now.getDay() === 5 && now.getHours() >= 17) DEX.fri += 1; // 금요일 저녁 출석
    if (now.getHours() < 8) { DEX.early = gapOk(DEX.earlyLast) ? DEX.early + 1 : 1; DEX.earlyLast = todayKey(); } else if (!restDay(now)) DEX.early = 0; // 아침 8시 전 연속 출석 (주말·공휴일에 늦게 와도 끊기지 않음)
    goldTick(hatches);
    const pool = DEX.items.filter((x) => !owned(x) && x.kind !== "legend" && x.img);
    let msg = "";
    if (DEX.days === 1) { const w = DEX.items.find((x) => x.id === "i-wave"); if (w && !owned(w)) { w.got = md(new Date()); hatches.unshift(w.id); } }
    else if (DEX.days % 5 === 0) {
      const rl = Math.random() < GOLD_RAND ? randLegend(now) : null;
      if (rl && giveGold(rl.id, true)) hatches.push("!found");
      else { const nx = pool[Math.floor(Math.random() * pool.length)]; if (nx) { nx.got = md(new Date()); nx.line = nx.line || "오늘 출석으로 만난 새 친구예요."; hatches.unshift(nx.id); } else msg = "오늘 출석 완료! 이삭이가 새 친구를 준비하고 있어요 · 조금만 기다려 주세요"; }
    } else msg = friendsLeft() ? `오늘 출석 완료! 다음 친구까지 출석 ${5 - (DEX.days % 5)}일` : "오늘 출석 완료! 이삭이가 새 친구를 준비하고 있어요";
    saveDex();
    if (hatches.length) FX.hatch = hatches; else if (msg) toast(app, msg);
  }
  return was;
}
function bindCommon(app, rerender) {
  /* 링크로 바로 여는 기사(통계·팀 스크랩함): 링크는 그대로 열고 읽음만 셈 */
  app.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-rd]"); if (!a || !app.contains(a)) return;
    markRead(app, a.dataset.rd); setTimeout(rerender, 0);
  });
  /* 기사 카드: 제목뿐 아니라 요약·빈 곳을 눌러도 기사 열기 (별·공유·관련 기사 버튼은 제외, 글자 드래그 중이면 무시) */
  app.addEventListener("click", (e) => {
    const card = e.target.closest("[data-card]"); if (!card || !app.contains(card)) return;
    if (e.target.closest("button, a, input, textarea, .relbox") || String(window.getSelection && window.getSelection()).trim()) return;
    const b = card.querySelector("[data-open]"); if (b) b.click();
  });
  app.addEventListener("click", (e) => {
    const t = e.target.closest("button, [data-close]"); if (!t || !app.contains(t)) return;
    if (t.dataset.open) {
      const id = t.dataset.open; markRead(app, id);
      const art = S.arts.find((a) => a.id === id); if (art && safeUrl(art.link)) window.open(safeUrl(art.link), "_blank", "noopener");
      else toast(app, "예시 기사예요 · 기사 연결 후 원문이 열려요");
      rerender(); return;
    }
    if (t.dataset.rel !== undefined) { S.relOpen = !S.relOpen; FX.relAnim = S.relOpen; rerender(); return; }
    if (t.dataset.scrap) { const id = t.dataset.scrap; if (S.scrap.has(id)) S.scrap.delete(id); else { S.scrap.add(id); rememberScrap(id); } savePrefs(); saveDex(); if (S.scrap.has(id)) FX.star = id; toast(app, S.scrap.has(id) ? "스크랩함에 담았어요" : "스크랩을 뺐어요"); rerender(); return; }
    if (t.dataset.share) { kakaoInit(); openSheet(app, "share", t.dataset.share); return; }
    if (t.dataset.close !== undefined) { closeSheet(app); return; }
    if (t.dataset.copy) {
      const a = findArt(t.dataset.sid), kind = t.dataset.copy; if (!a) return;
      if (kind === "team") { if (!S.teams.length) { S.sheet = { kind: "teamStart" }; renderSheet(app); toast(app, "먼저 팀을 만들거나 참여해 주세요"); return; } S.draftNote = ""; S.teamPick = S.teamPick && teamOf(S.teamPick) ? S.teamPick : S.teams[0].id; S.sheet = { kind: "teamAdd", arg: a.id }; renderSheet(app); return; }
      const copy = (txt, msg) => { const ok = () => toast(app, msg); try { navigator.clipboard.writeText(txt).then(ok, () => toast(app, "복사하지 못했어요 · 글을 길게 눌러 복사해 주세요")); } catch (err) { toast(app, "복사하지 못했어요 · 글을 길게 눌러 복사해 주세요"); return; } };
      DEX.shares += 1; saveDex();
      // 카카오톡: 휴대폰 공유 창(카카오톡·문자·밴드 등)을 띄움. 공유 창이 없는 PC에서는 복사로 대신
      if (kind === "kakao") {
        if (kakaoShareArticle(a)) { closeSheet(app); return; }
        if (navigator.share) { navigator.share({ title: a.title, text: shareText(a).replace(/\n - https?:\S+$/, ""), url: a.link || location.origin }).then(() => closeSheet(app)).catch(() => {}); return; }
        copy(shareText(a), "복사했어요 · 카카오톡에 붙여넣으세요"); closeSheet(app);
        return;
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
      const nm = cat(d.id).name; S.cats = S.cats.filter((c) => c.id !== d.id); pruneArts(); savePrefs(); toast(app, `'${nm}' 분야를 삭제했어요`); closeSheet(app); rerender(); return;
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
const IMG = {"basket": "assets/img/basket.webp", "crossed": "assets/img/crossed.webp", "magnifier": "assets/img/magnifier.webp", "megaphone": "assets/img/megaphone.webp", "rake": "assets/img/rake.webp", "run": "assets/img/run.webp", "skate": "assets/img/skate.webp", "sleepy": "assets/img/sleepy.webp", "think": "assets/img/think.webp", "wave": "assets/img/wave.webp", "egg": "assets/img/egg.webp", "eggTop": "assets/img/eggTop.webp", "eggBot": "assets/img/eggBot.webp", "gEgg": "assets/img/gEgg.webp", "gEggTop": "assets/img/gEggTop.webp", "gEggBot": "assets/img/gEggBot.webp", "center": "assets/img/center.webp", "kkeok": "assets/img/kkeok.webp", "band": "assets/img/band.webp", "drib": "assets/img/drib.webp", "bat": "assets/img/bat.webp", "kick": "assets/img/kick.webp", "hike": "assets/img/hike.webp", "lab": "assets/img/lab.webp", "ai": "assets/img/ai.webp", "drone": "assets/img/drone.webp", "paper": "assets/img/paper.webp", "cow": "assets/img/cow.webp", "hanwoo": "assets/img/hanwoo.webp", "apple": "assets/img/apple.webp", "pear": "assets/img/pear.webp", "tangerine": "assets/img/tangerine.webp", "scarecrow": "assets/img/scarecrow.webp", "weekend": "assets/img/weekend.webp", "book": "assets/img/book.webp", "vacation": "assets/img/vacation.webp", "walk": "assets/img/walk.webp", "iced": "assets/img/iced.webp", "night": "assets/img/night.webp", "report": "assets/img/report.webp", "tractor": "assets/img/tractor.webp", "weather": "assets/img/weather.webp", "kimchi": "assets/img/kimchi.webp", "king": "assets/img/king.webp", "dolsoe": "assets/img/dolsoe.webp", "seonbi": "assets/img/seonbi.webp", "doryeong": "assets/img/doryeong.webp", "assi": "assets/img/assi.webp", "liberty": "assets/img/liberty.webp", "army": "assets/img/army.webp", "pilot": "assets/img/pilot.webp", "kya": "assets/img/kya.webp", "newyear": "assets/img/newyear.webp", "watermelon": "assets/img/watermelon.webp", "halloween": "assets/img/halloween.webp", "dracula": "assets/img/dracula.webp", "xmas": "assets/img/xmas.webp", "golden": "assets/img/golden.webp", "sprout": "assets/img/sprout.webp", "s_pot": "assets/img/s_pot.webp", "s_tea": "assets/img/s_tea.webp", "s_box": "assets/img/s_box.webp", "s_rice": "assets/img/s_rice.webp", "s_sock": "assets/img/s_sock.webp", "s_rainbow": "assets/img/s_rainbow.webp", "s_songpyeon": "assets/img/s_songpyeon.webp", "s_maple": "assets/img/s_maple.webp", "s_angry": "assets/img/s_angry.webp", "s_heart": "assets/img/s_heart.webp", "s_sleepy": "assets/img/s_sleepy.webp", "s_balloon": "assets/img/s_balloon.webp", "bubble": "assets/img/bubble.webp", "s_headphone": "assets/img/s_headphone.webp", "gsprout": "assets/img/gsprout.webp", "cheer": "assets/img/cheer.webp", "s_mandu": "assets/img/s_mandu.webp", "s_trampoline": "assets/img/s_trampoline.webp", "s_hiphop": "assets/img/s_hiphop.webp", "s_onsen": "assets/img/s_onsen.webp", "s_scared": "assets/img/s_scared.webp", "s_mummy": "assets/img/s_mummy.webp", "s_movie": "assets/img/s_movie.webp", "s_briefing": "assets/img/s_briefing.webp", "s_overtime": "assets/img/s_overtime.webp", "s_lab": "assets/img/s_lab.webp", "s_drone": "assets/img/s_drone.webp", "s_space": "assets/img/s_space.webp", "s_bungeo": "assets/img/s_bungeo.webp", "s_kimbap": "assets/img/s_kimbap.webp", "s_chef": "assets/img/s_chef.webp", "s_camping": "assets/img/s_camping.webp", "s_monday": "assets/img/s_monday.webp", "s_rain": "assets/img/s_rain.webp", "s_magic": "assets/img/s_magic.webp", "s_pirate": "assets/img/s_pirate.webp", "s_detective": "assets/img/s_detective.webp", "s_ninja": "assets/img/s_ninja.webp", "s_summit": "assets/img/s_summit.webp", "hipster": "assets/img/hipster.webp", "premier": "assets/img/premier.webp", "hero": "assets/img/hero.webp", "buster": "assets/img/buster.webp", "i_space": "assets/img/i_space.webp", "s_sebae": "assets/img/s_sebae.webp", "s_santa": "assets/img/s_santa.webp", "s_snowman": "assets/img/s_snowman.webp", "campfire": "assets/img/campfire.webp", "chef": "assets/img/chef.webp", "s_strawberry": "assets/img/s_strawberry.webp", "s_iced": "assets/img/s_iced.webp", "s_keeper": "assets/img/s_keeper.webp", "fx_s31_p0": "assets/img/fx_s31_p0.webp", "fx_i20_base": "assets/img/fx_i20_base.webp", "fx_s10_p0": "assets/img/fx_s10_p0.webp", "fx_s31_base": "assets/img/fx_s31_base.webp", "fx_i20_p0": "assets/img/fx_i20_p0.webp", "fx_s16_base": "assets/img/fx_s16_base.webp", "fx_s11_p0": "assets/img/fx_s11_p0.webp", "fx_s16_p0": "assets/img/fx_s16_p0.webp", "fx_s36_base": "assets/img/fx_s36_base.webp", "fx_s11_base": "assets/img/fx_s11_base.webp", "fx_s19_base": "assets/img/fx_s19_base.webp", "fx_s19_p0": "assets/img/fx_s19_p0.webp", "fx_s10_base": "assets/img/fx_s10_base.webp", "fx_s36_p0": "assets/img/fx_s36_p0.webp", "fx_s11_p1": "assets/img/fx_s11_p1.webp"};
const DEX = {
  days: 0, streak: 0, last: "", reads: 0, shares: 0, goldEgg: null, goldQ: [], earned: [], fri: 0, early: 0, earlyLast: "",
  totals: { isak: 40, sprout: 40, legend: 25 },
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
    { id: "i-center", no: 11, kind: "isak", img: "center", name: "칼군무", line: "선글라스 끼고 무대 한가운데, 오늘의 주인공." },
    { id: "i-kkeok", no: 12, kind: "isak", img: "kkeok", name: "행사장인", line: "반짝이 정장에 마이크 하나면 어디든 무대." },
    { id: "i-band", no: 13, kind: "isak", img: "band", name: "락앤롤", line: "점심시간엔 베이스 둥둥, 오늘도 합주 중." },
    { id: "i-drib", no: 14, kind: "isak", img: "drib", name: "내가 메날두야말", line: "기사 사이를 요리조리, 공은 절대 안 뺏겨요." },
    { id: "i-bat", no: 15, kind: "isak", img: "bat", name: "4번 타자", line: "오늘의 헤드라인은 내가 친다, 한 방 있는 이삭이." },
    { id: "i-kick", no: 16, kind: "isak", img: "kick", name: "킥플립", line: "보드 위에서도 균형 잡고, 뉴스도 놓치지 않아요." },
    { id: "i-hike", no: 17, kind: "isak", img: "hike", name: "정상 등반", line: "주말엔 산으로! 정상에서 읽는 브리핑이 제일 맛있어요." },
    { id: "i-lab", no: 18, kind: "isak", img: "lab", name: "관찰 일지", line: "플라스크 속 변화를 하나도 놓치지 않고 기록해요." },
    { id: "i-ai", no: 19, kind: "isak", img: "ai", name: "AI", line: "방석 깔고 앉아 AI랑 같이 농업의 미래를 공부해요." },
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
    { id: "i-campfire", no: 39, kind: "isak", img: "campfire", name: "불멍", line: "모닥불 앞 담요 한 장, 핫초코 한 모금이면 뉴스도 잠시 쉬어요." },
    { id: "i-chef", no: 40, kind: "isak", img: "chef", name: "오늘의 셰프", line: "우리 쌀로 볶음밥 불쇼! 오늘 점심은 내가 책임질게요." },
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
    { id: "s-15", no: 15, kind: "sprout", img: "s_mandu", name: "만두새싹", line: "찜기 속이 제일 따끈해요. 만두인 척 숨어 있는 중!" },
    { id: "s-16", no: 16, kind: "sprout", img: "s_trampoline", name: "방방새싹", line: "방방 뛰다 보면 하늘까지 닿을 것 같아요." },
    { id: "s-17", no: 17, kind: "sprout", img: "s_hiphop", name: "힙찔이 새싹", line: "선글라스에 금목걸이, 오늘 브리핑은 내가 플로우 탄다." },
    { id: "s-18", no: 18, kind: "sprout", img: "s_onsen", name: "온천새싹", line: "머리에 수건 하나 얹고 뜨끈하게, 피로가 싹 녹아요." },
    { id: "s-19", no: 19, kind: "sprout", img: "s_scared", name: "쫄보새싹", line: "강아지가 반갑다는데… 그래도 무서워요." },
    { id: "s-20", no: 20, kind: "sprout", img: "s_mummy", name: "미라새싹", line: "붕대 칭칭, 그래도 기사는 한쪽 눈으로 꼭 읽어요." },
    { id: "s-21", no: 21, kind: "sprout", img: "s_movie", name: "집콕새싹", line: "팝콘 한 통이랑 노트북만 있으면 주말 끝." },
    { id: "s-22", no: 22, kind: "sprout", img: "s_briefing", name: "브리핑새싹", line: "동그란 안경 쓰고 신문 정독, 오늘 소식은 내가 제일 먼저." },
    { id: "s-23", no: 23, kind: "sprout", img: "s_overtime", name: "야근새싹", line: "커피 한 잔 더… 스탠드 불은 오늘도 늦게 꺼져요." },
    { id: "s-24", no: 24, kind: "sprout", img: "s_lab", name: "연구새싹", line: "가운 입고 보안경 쓰고, 초록 용액에서 새 품종이 나올지도!" },
    { id: "s-25", no: 25, kind: "sprout", img: "s_drone", name: "드론드라이버", line: "밭 위로 드론 한 바퀴, 스마트하게 농사짓는 중." },
    { id: "s-26", no: 26, kind: "sprout", img: "s_space", name: "우주새싹", line: "우주에서도 쑥쑥! 무중력 재배 실험 중이에요." },
    { id: "s-27", no: 27, kind: "sprout", img: "s_bungeo", name: "붕어빵새싹", line: "팥 사이에 쏙, 겨울 간식 속에 숨은 새싹." },
    { id: "s-28", no: 28, kind: "sprout", img: "s_kimbap", name: "김밥새싹", line: "단면 한가운데 자리 잡았어요. 소풍 날엔 내가 주인공." },
    { id: "s-29", no: 29, kind: "sprout", img: "s_chef", name: "셰프새싹", line: "돌솥에 쓱싹쓱싹, 우리 농산물로 만든 비빔밥이에요." },
    { id: "s-30", no: 30, kind: "sprout", img: "s_camping", name: "캠핑새싹", line: "모닥불 앞 마시멜로 굽기, 불멍할 땐 뉴스도 쉬어요." },
    { id: "s-31", no: 31, kind: "sprout", img: "s_monday", name: "월요일새싹", line: "알람이 울려도 이불 밖은 위험해요." },
    { id: "s-32", no: 32, kind: "sprout", img: "s_rain", name: "장화새싹", line: "비 오는 날엔 장화 신고 첨벙첨벙!" },
    { id: "s-33", no: 33, kind: "sprout", img: "s_magic", name: "마법새싹", line: "별 지팡이 한 번이면 씨앗이 반짝, 풍년이 와라!" },
    { id: "s-34", no: 34, kind: "sprout", img: "s_pirate", name: "해적새싹", line: "보물지도 따라 출발! 오늘의 보물 기사는 어디에?" },
    { id: "s-35", no: 35, kind: "sprout", img: "s_detective", name: "탐정새싹", line: "돋보기로 꼼꼼히, 가짜 뉴스는 내가 잡아요." },
    { id: "s-36", no: 36, kind: "sprout", img: "s_ninja", name: "닌자새싹", line: "나뭇잎 표창 슉! 기사만 쏙쏙 읽고 조용히 사라져요." },
    { id: "s-37", no: 37, kind: "sprout", img: "s_summit", name: "정상새싹", line: "드디어 정상! 깃발 꽂고 오늘도 한 걸음 더." },
    { id: "s-38", no: 38, kind: "sprout", img: "s_strawberry", name: "딸기새싹", line: "딸기 모자 쓰고 한 바구니 수확, 오늘은 달콤한 소식만!" },
    { id: "s-39", no: 39, kind: "sprout", img: "s_iced", name: "아아새싹", line: "나보다 큰 아아 한 잔 들고 출근… 아직 눈이 안 떠져요." },
    { id: "s-40", no: 40, kind: "sprout", img: "s_keeper", name: "골키퍼새싹", line: "몸 날려 슈퍼 세이브! 가짜 뉴스는 골문 앞에서 막아요." },
    { id: "l-cheer", no: 1, kind: "legend", img: "cheer", name: "응원단장", cond: "연속 출석 30일 (주말·공휴일 빼고)", now: 0, goal: 30 },
    { id: "l-king", no: 2, kind: "legend", img: "king", name: "전하", cond: "출석 365일", now: 0, goal: 365 },
    { id: "l-kya", no: 3, kind: "legend", img: "kya", name: "캬~", cond: "금요일 저녁 출석 10번", now: 0, goal: 10 },
    { id: "l-newyear", no: 4, kind: "legend", img: "newyear", name: "새해 복", cond: "설 연휴에 가끔 나타나요 · 랜덤" },
    { id: "l-sprout", no: 5, kind: "legend", img: "gsprout", name: "황금 새싹", cond: "새싹이 40종 모두 모으기", now: 0, goal: 40 },
    { id: "l-dolsoe", no: 7, kind: "legend", img: "dolsoe", name: "돌쇠", cond: "기사 1,000개 읽기", now: 0, goal: 1000 },
    { id: "l-seonbi", no: 8, kind: "legend", img: "seonbi", name: "선비 이삭", cond: "스크랩 100개 모으기", now: 0, goal: 100 },
    { id: "l-doryeong", no: 9, kind: "legend", img: "doryeong", name: "도령", cond: "7일 연속 아침 8시 전에 출석", now: 0, goal: 7 },
    { id: "l-assi", no: 10, kind: "legend", img: "assi", name: "아씨", cond: "팀원과 기사 50번 공유하기", now: 0, goal: 50 },
    { id: "l-liberty", no: 11, kind: "legend", img: "liberty", name: "자유의 이삭", cond: "하루에 내 모든 분야에서 기사 2개씩 읽기", now: 0, goal: 3 },
    { id: "l-army", no: 12, kind: "legend", img: "army", name: "충성!", cond: "출석 100일 (100일 휴가)", now: 0, goal: 100 },
    { id: "l-watermelon", no: 13, kind: "legend", img: "watermelon", name: "수박 한 통", cond: "여름(7~8월)에 가끔 나타나요 · 랜덤" },
    { id: "l-halloween", no: 14, kind: "legend", img: "halloween", name: "잭오랜턴", cond: "할로윈 주간에 가끔 나타나요 · 랜덤" },
    { id: "l-dracula", no: 15, kind: "legend", img: "dracula", name: "드라큘라", cond: "할로윈 주간에 가끔 나타나요 · 랜덤" },
    { id: "l-xmas", no: 16, kind: "legend", img: "xmas", name: "트리 장식", cond: "12월에 가끔 나타나요 · 랜덤" },
    { id: "l-golden", no: 17, kind: "legend", img: "golden", name: "황금 이삭", cond: "일반 이삭이 40종 모두 모으기", now: 0, goal: 40 },
    { id: "l-hipster", no: 18, kind: "legend", img: "hipster", name: "힙스터", cond: "팀원과 기사 20번 공유하기", now: 0, goal: 20, line: "붐박스 켜고 마이크 잡았다, 오늘의 헤드라인은 랩으로." },
    { id: "l-premier", no: 19, kind: "legend", img: "premier", name: "영의정이삭", cond: "출석 200일", now: 0, goal: 200, line: "부채 한 번 촤악, 청 살림을 두루 살피는 영의정 납시오." },
    { id: "l-hero", no: 20, kind: "legend", img: "hero", name: "히어로", cond: "연속 출석 60일 (주말·공휴일 빼고)", now: 0, goal: 60, line: "초록 망토 휘날리며 출동! 농업 현장의 해결사." },
    { id: "l-buster", no: 21, kind: "legend", img: "buster", name: "이삭버스터", cond: "기사 3,000개 읽기", now: 0, goal: 3000, line: "콤바인이 변신했다! 빨강·골드 로봇으로 수확 완료." },
    { id: "l-space", no: 22, kind: "legend", img: "i_space", name: "우주이삭", cond: "아주 가끔 나타나요 · 랜덤", line: "헬멧을 뚫고 나온 이삭, 우주에서도 풍년을 꿈꿔요." },
    { id: "l-sebae", no: 23, kind: "legend", img: "s_sebae", name: "세배새싹", cond: "설 연휴에 가끔 나타나요 · 랜덤", line: "새해 복 많이 받으세요! 색동 한복 입고 꾸벅." },
    { id: "l-santa", no: 24, kind: "legend", img: "s_santa", name: "산타새싹", cond: "12월에 가끔 나타나요 · 랜덤", line: "선물 자루 한가득, 올해 착한 직원들한테 배달 가요." },
    { id: "l-snowman", no: 25, kind: "legend", img: "s_snowman", name: "눈사람새싹", cond: "겨울(12~2월)에 가끔 나타나요 · 랜덤", line: "목도리 두르고 눈사람 변신, 겨울엔 내가 제일 귀여워요." },
    { id: "l-hidden", no: 6, kind: "legend", img: "bubble", name: "비눗방울", cond: "아주 가끔 나타나요 · 가장 희귀한 랜덤", hidden: true },
  ],
};
let dexTab = "all";
/* 도감 진행: 이 브라우저에 저장 (3단계에서 Supabase로) */
const DEX_KEY = "daily-briefing-dex";
const LEGEND_NOW = {
  "l-cheer": () => DEX.streak, "l-hero": () => DEX.streak, "l-premier": () => DEX.days, "l-buster": () => DEX.reads, "l-hipster": () => DEX.shares, "l-king": () => DEX.days, "l-army": () => DEX.days, "l-dolsoe": () => DEX.reads,
  "l-seonbi": () => S.scrap.size, "l-assi": () => DEX.shares, "l-kya": () => DEX.fri, "l-doryeong": () => DEX.early, "l-liberty": () => libertyNow(),
  "l-sprout": () => DEX.items.filter((x) => x.kind === "sprout" && x.got).length, "l-golden": () => DEX.items.filter((x) => x.kind === "isak" && x.got).length,
};
function dexProgress() {
  const lib = DEX.items.find((x) => x.id === "l-liberty"); if (lib) lib.goal = Math.max(2, (S.cats || []).length);
  DEX.items.forEach((x) => { if (x.goal && LEGEND_NOW[x.id]) x.now = Math.min(x.goal, LEGEND_NOW[x.id]()); });
}
const DEX_FIELDS = ["days", "streak", "last", "reads", "shares", "goldEgg", "goldQ", "earned", "fri", "early", "earlyLast"];
/* 자유의 이삭: 오늘 기사를 2개 이상 읽은 내 분야 수 (목표 = 내 분야 전부) */
function libertyNow() {
  if (S.readDay !== todayKey()) return 0;
  const mine = new Set((S.cats || []).map((c) => c.id)), n = {};
  (S.arts || []).forEach((a) => { if (S.read.has(a.id)) (a.cats || [a.cat]).forEach((c) => { if (mine.has(c)) n[c] = (n[c] || 0) + 1; }); });
  return Object.values(n).filter((v) => v >= 2).length;
}
/* ── 황금알 ──
   - 조건 전설: 조건을 채우는 순간 황금알을 받음 → 그 뒤 출석 5일이면 부화
   - 한 번에 하나만 품고, 그동안 받은 알은 차례로 대기 (goldQ)
   - 일반 알(출석 5일)은 따로 계속 참. 일반 알이 다 찼을 때 5% 확률로 랜덤 전설 황금알로 바뀜 → "반짝이는 알을 발견" 화면을 띄움 */
const GOLD_NEED = 5, GOLD_RAND = 0.05;
function giveGold(id, rand) {
  if (DEX.earned.includes(id)) return false;
  DEX.earned.push(id);
  if (!DEX.goldEgg) DEX.goldEgg = { id, need: GOLD_NEED, done: 0, from: todayKey(), rand: !!rand };
  else DEX.goldQ.push({ id, rand: !!rand });
  return true;
}
function checkLegends() {
  DEX.items.forEach((x) => {
    if (x.kind !== "legend" || !x.goal || owned(x) || DEX.earned.includes(x.id)) return;
    if (LEGEND_NOW[x.id] && LEGEND_NOW[x.id]() >= x.goal && giveGold(x.id)) (FX.goldNew = FX.goldNew || []).push(x.id);
  });
}
/* 랜덤 전설 후보: 지금 계절에 나오는 전설, 가끔 비눗방울(가장 희귀) */
const SEOLLAL = { 2027: [2, 7], 2028: [1, 27], 2029: [2, 13], 2030: [2, 3], 2031: [1, 23] }; // 설날(양력)
function randLegend(d = new Date()) {
  const m = d.getMonth() + 1, day = d.getDate(), sl = SEOLLAL[d.getFullYear()];
  const near = sl && Math.abs((new Date(d.getFullYear(), sl[0] - 1, sl[1]) - new Date(d.getFullYear(), m - 1, day)) / 864e5) <= 2;
  const on = { "l-newyear": near, "l-sebae": near, "l-watermelon": m === 7 || m === 8, "l-halloween": m === 10 && day >= 25, "l-dracula": m === 10 && day >= 25, "l-xmas": m === 12, "l-santa": m === 12, "l-snowman": m === 12 || m <= 2, "l-space": true };
  const ok = (x) => x && !owned(x) && !DEX.earned.includes(x.id);
  const season = DEX.items.filter((x) => on[x.id] && ok(x));
  const bubble = DEX.items.find((x) => x.id === "l-hidden");
  if (ok(bubble) && (!season.length || Math.random() < 0.2)) return bubble;
  return season[Math.floor(Math.random() * season.length)] || null;
}
/* 출석한 날 한 번: 황금알 한 칸, 다 차면 부화하고 대기 중인 다음 알을 품음 */
function goldTick(hatches) {
  const g = DEX.goldEgg; if (!g || g.from === todayKey()) return;
  g.done += 1;
  if (g.done >= g.need) {
    const x = DEX.items.find((y) => y.id === g.id);
    if (x && !owned(x)) { x.got = md(new Date()); hatches.push(x.id); }
    const nx = DEX.goldQ.shift();
    DEX.goldEgg = nx ? { id: nx.id, need: GOLD_NEED, done: 0, from: todayKey(), rand: nx.rand } : null;
  }
}
function loadDex() {
  try {
    const d = JSON.parse(localStorage.getItem(DEX_KEY) || "{}");
    DEX_FIELDS.forEach((k) => { if (d[k] != null) DEX[k] = d[k]; });
    Object.entries(d.got || {}).forEach(([id, when]) => { const x = DEX.items.find((i) => i.id === id); if (x) x.got = when; });
  } catch (e) {}
  Object.assign(DEX, mergeGold(DEX, {}, Object.fromEntries(DEX.items.filter(owned).map((x) => [x.id, 1])))); // 이미 만난 전설의 알이 남아 있으면 정리
  dexProgress(); checkLegends();
  if (dexDemo()) DEX.items.forEach((x) => { if (!x.got) x.got = "미리보기"; }); // 확인용 주소에서만 도감 전체 열기
}
function saveDex() {
  dexProgress(); checkLegends();
  try { localStorage.setItem(DEX_KEY, JSON.stringify({ ...Object.fromEntries(DEX_FIELDS.map((k) => [k, DEX[k]])),
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
const friendsLeft = () => DEX.items.some((x) => !owned(x) && x.kind !== "legend" && x.img);
function dexNextHTML() {
  const left = 5 - (DEX.days % 5);
  if (!friendsLeft()) return `<section class="dx-next"><div class="dx-egg" aria-hidden="true"><img src="${IMG.egg}" alt=""></div>
    <div class="dx-nt"><b>새 친구를 준비하고 있어요</b><small>지금 있는 친구를 모두 만났어요! 새 친구가 오면 출석 5일마다 다시 찾아와요</small></div></section>${dexGoldHTML()}`;
  return `<section class="dx-next"><div class="dx-egg" aria-hidden="true"><img src="${IMG.egg}" alt=""></div>
    <div class="dx-nt"><b>다음 친구까지 출석 ${left}일</b><small>출석 5일마다 이삭이나 새싹이 중 하나가 와요</small>
    <div class="dx-bar">${[0, 1, 2, 3, 4].map((i) => `<i class="${i < DEX.days % 5 ? "on" : ""}"></i>`).join("")}</div></div></section>${dexGoldHTML()}`;
}
function dexGoldHTML() {
  const g = DEX.goldEgg; if (!g) return "";
  const x = DEX.items.find((y) => y.id === g.id) || {}, left = g.need - g.done, q = DEX.goldQ.length;
  const who = g.rand ? "어떤 전설일지는 깨어나 봐야 알아요" : `‘${esc(x.cond || "")}’ 달성으로 받은 알이에요`;
  return `<section class="dx-next gold"><div class="dx-egg" aria-hidden="true"><img src="${IMG.gEgg}" alt=""></div>
    <div class="dx-nt"><b>황금알 부화까지 출석 ${left}일</b><small>${who}</small>
    <div class="dx-bar">${Array.from({ length: g.need }, (_, i) => `<i class="${i < g.done ? "on" : ""}"></i>`).join("")}</div>
    ${q ? `<span class="dx-q">다음 황금알 ${q}개 기다리는 중</span>` : ""}</div></section>`;
}
const goldState = (x) => (DEX.goldEgg && DEX.goldEgg.id === x.id ? "hatching" : DEX.earned.includes(x.id) && !owned(x) ? "waiting" : "");
function dexGridHTML() {
  const list = DEX.items.filter((x) => dexTab === "all" || x.kind === dexTab);
  return `<div class="dx-grid">${list.map((x) => {
    const lg = x.kind === "legend", o = owned(x);
    const gs = lg && goldState(x);
    const sub = o ? (!x.img ? "그림 준비 중" : dexNo(x)) : gs === "hatching" ? "황금알 품는 중" : gs === "waiting" ? "황금알 대기 중" : lg ? (x.goal ? `${x.cond} · ${x.now}/${x.goal}` : x.hidden ? "조건 비공개" : x.cond) : dexNo(x);
    return `<button type="button" class="dx-t${o ? " own" : ""}${lg ? " lg" : ""}${x.kind === "sprout" ? " spr" : ""}" data-dex="${x.id}">
      <span class="dx-a">${dexArt(x)}</span><span class="dx-n">${o ? esc(x.name) : "???"}</span><span class="dx-s">${esc(sub)}</span>
      ${gs ? `<span class="dx-gb" aria-hidden="true"><img src="${IMG.gEgg}" alt=""></span>` : ""}${lg && x.goal && !gs ? `<span class="dx-p"><i style="width:${Math.round(x.now / x.goal * 100)}%"></i></span>` : ""}</button>`;
  }).join("")}</div>`;
}
function dexTabsHTML() {
  const t = [["all", "전체", DEX.items.filter(owned).length, DEX.totals.isak + DEX.totals.sprout + DEX.totals.legend], ["isak", "이삭이", dexCount("isak"), DEX.totals.isak], ["sprout", "새싹이", dexCount("sprout"), DEX.totals.sprout], ["legend", "전설", dexCount("legend"), DEX.totals.legend]];
  return `<div class="dx-tabs" role="tablist">${t.map(([k, nm, n, tot]) => `<button type="button" role="tab" data-dextab="${k}" aria-selected="${dexTab === k}">${nm} <span>${n}/${tot}</span></button>`).join("")}</div>`;
}
function dexSheet(id) {
  const x = DEX.items.find((y) => y.id === id), o = owned(x), lg = x.kind === "legend";
  if (o && x.img) return dexCardHTML(x); // 만난 친구: 시트 없이 수집 카드만 띄움
  return `<div class="grab"></div><div class="sh-head"><h2>${o ? esc(x.name) : lg ? "아직 못 만난 전설" : "아직 못 만난 친구"}</h2><button type="button" class="x" data-close>닫기</button></div>
    ${o && x.img ? "" : `<div class="dx-big${x.kind === "sprout" ? " spr" : ""}${lg ? " lg" : ""}">${dexArt(x, true)}</div>`}
    ${o ? (x.img ? "" : `<p class="dx-line">${esc(x.line || (lg ? `‘${x.cond}’ 기록으로 깨어난 전설이에요.` : "출석으로 만난 친구예요."))}</p><div class="dx-meta">${dexNo(x)} · ${x.got}에 만났어요</div>`)
      : lg && goldState(x) ? `<p class="dx-line">${goldState(x) === "hatching" ? `황금알을 품고 있어요. 출석 ${DEX.goldEgg.need - DEX.goldEgg.done}일 뒤 깨어나요.` : "황금알을 받았어요. 지금 품는 알이 깨어나면 이어서 품어요."}</p>`
      : lg ? `<p class="dx-line">${x.hidden ? "어떻게 얻는지는 비밀이에요. 꾸준히 읽다 보면 만날 수 있어요." : `조건: ${esc(x.cond)}. 채우면 누구인지 공개돼요.`}</p>${x.goal ? `<div class="dx-p big"><i style="width:${Math.round(x.now / x.goal * 100)}%"></i></div><div class="dx-meta">지금 ${x.now} / ${x.goal}</div>` : ""}`
      : `<p class="dx-line">출석 5일마다 랜덤으로 와요. 다음 친구까지 출석 ${5 - (DEX.days % 5)}일 남았어요.</p>`}`;
}

/* ── 팀 스크랩함 (/api/team → Supabase) ──
   - 팀 초대 코드(TEAM-XXXX-XXXX)로 참여, 로그인 없음. 내가 들어간 팀 목록(S.myTeams)은 내 기록에 저장돼 동기화로 다른 기기에도 따라감
   - 기사 빼기: 담은 사람과 팀을 만든 사람만. 팀 삭제: 만든 사람만. 기사는 계속 보관 */
S.teams = []; S.myTeams = []; S.nick = "";
const TEAM_RE = /^TEAM-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/;
const teamOf = (id) => S.teams.find((t) => t.id === id);
const myTeam = (code) => S.myTeams.find((t) => t.code === code);
const appUrl = () => location.origin + "/";
function inviteText(t) { return `[DAILY BRIEFING] '${t.name}' 팀 스크랩함에 초대해요\n아래 링크를 누르면 바로 들어와요.\n${appUrl()}#join=${t.code}\n(초대 코드: ${t.code})`; }
async function teamApi(method, body, q) {
  const headers = body ? { "Content-Type": "application/json" } : {};
  if (q && q.token) { headers["X-Team-Token"] = q.token; q = { code: q.code }; } // 열쇠는 주소 대신 헤더로 (서버 기록에 남지 않게)
  const r = await fetch("/api/team" + (q ? "?" + new URLSearchParams(q) : ""), { method, headers, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(j.error || r.status), { status: r.status, code: j.error });
  return j;
}
const TEAM_ERR = { "not-configured": "팀 서버 준비 중이에요", "no-team": "없거나 삭제된 팀이에요", "bad-code": "TEAM-XXXX-XXXX 모양의 코드를 넣어 주세요", "need-name": "이름을 넣어 주세요", already: "이미 이 팀에 담긴 기사예요", "not-allowed": "담은 사람이나 팀을 만든 사람만 할 수 있어요", "not-member": "이 팀에서 나간 상태예요" };
const teamErr = (e) => TEAM_ERR[e.code] || "잠시 뒤 다시 해 주세요";
/* 내 팀들 최신 내용 받기 */
let teamSeq = 0;
async function loadTeams() {
  const my = ++teamSeq;
  const list = await Promise.all(S.myTeams.map(async (m) => {
    try { const j = await teamApi("GET", null, { code: m.code, token: m.token });
      m.name = j.team.name;
      return { id: m.code, code: m.code, name: j.team.name, owner: j.team.owner, me: j.me, isOwner: j.team.owner === j.me, members: j.members, items: j.items };
    } catch (e) {
      if (e.status === 404 || e.status === 403) return { gone: m.code };
      const old = teamOf(m.code); return old || { id: m.code, code: m.code, name: m.name, members: [], items: [], me: m.member, isOwner: m.owner, offline: true };
    }
  }));
  if (my !== teamSeq) return []; // 더 나중에 시작한 불러오기가 있으면 이번 결과는 버림
  const gone = list.filter((x) => x.gone).map((x) => x.gone);
  if (gone.length) { S.myTeams = S.myTeams.filter((m) => !gone.includes(m.code)); savePrefs(); }
  S.teams = list.filter((x) => !x.gone);
  return gone;
}
function weeklyText(t) {
  const wk = Date.now() - 7 * 864e5;
  const items = t.items.filter((x) => Date.parse(x.created_at) >= wk);
  return `[${t.name}] 이번 주 모은 기사 ${items.length}건\n` + items.map((x) => `□ ${x.title}${x.src ? ` (${x.src})` : ""}${x.note ? `\n - ${x.note}` : ""}${x.link ? `\n - ${x.link}` : ""}\n   ${x.who} 님`).join("\n");
}
const shortDate = (iso) => { const d = new Date(iso); return isNaN(d) ? "" : `${d.getMonth() + 1}.${d.getDate()}`; };
function teamSheet(kind, arg) {
  const head = (h, x = "닫기") => `<div class="grab"></div><div class="sh-head"><h2>${h}</h2><button type="button" class="x" data-close>${x}</button></div>`;
  const nickField = `<label class="lbl" for="f-nick">팀원에게 보일 내 이름</label><input class="fld" id="f-nick" placeholder="예: 권경석" maxlength="20" autocomplete="off" value="${esc(S.draftNick ?? S.nick)}">`;
  if (kind === "teamStart") return head("팀 스크랩함") + `<p class="tm-p">팀원끼리 기사를 함께 모으는 공간이에요. 로그인 없이 초대 코드로 들어와요.</p>
    <button type="button" class="tm-opt" data-teamnew><b>새 팀 만들기</b><span>팀 이름만 정하면 초대 코드가 바로 생겨요</span></button>
    <button type="button" class="tm-opt" data-teamjoin><b>초대 코드로 참여</b><span>받은 코드(TEAM-로 시작)를 넣어요</span></button>`;
  if (kind === "teamNew") return head("새 팀 만들기", "취소") + `<label class="lbl" for="f-team">팀 이름</label>
    <input class="fld" id="f-team" placeholder="예: 연구제도팀, 스마트팜 스터디" maxlength="30" autocomplete="off" value="${esc(S.draftTeam || "")}">
    ${nickField}
    <button type="button" class="cta" data-teamcreate>팀 만들기</button>`;
  if (kind === "teamJoin") return head("초대 코드로 참여", "취소") + `<label class="lbl" for="f-code">초대 코드</label>
    <input class="fld" id="f-code" placeholder="TEAM-XXXX-XXXX" autocomplete="off" autocapitalize="characters" style="text-transform:uppercase;letter-spacing:.04em" value="${esc(S.draftCode || "")}">
    ${nickField}
    <p class="tm-p">초대 링크를 눌러 들어오면 코드 칸은 자동으로 채워져요.</p>
    <button type="button" class="cta" data-dojoin>참여하기</button>`;
  if (kind === "invite") {
    const t = teamOf(arg); if (!t) return "";
    return head(arg === S.justMade ? "팀을 만들었어요" : "팀원 초대") + `<div class="tm-code"><small>${esc(t.name)} 초대 코드</small><b>${t.code}</b><span>팀원 ${t.members.length}명</span></div>
      <div class="share-g" style="grid-template-columns:repeat(3,minmax(0,1fr))">
        <button type="button" data-inv="kakao" data-tid="${t.id}"><span class="ic" style="background:#FEE500">${ICON.talk}</span>${kakaoOn() || !navigator.share ? "카카오톡" : "카카오톡·앱으로"}</button>
        <button type="button" data-inv="msg" data-tid="${t.id}"><span class="ic" style="background:#E6F7EE;color:#11804A">${ICON.copy}</span>초대 문구 복사</button>
        <button type="button" data-inv="link" data-tid="${t.id}"><span class="ic" style="background:#F1F3F7;color:#46546B">${ICON.link}</span>링크 복사</button></div>
      <div class="copybox"><b>네이버웍스 등 메신저에 붙여넣기</b><pre>${esc(inviteText(t))}</pre></div>
      <p class="tm-p" style="font-size:12px">코드를 아는 사람은 누구나 들어올 수 있어요. 팀원에게만 보내 주세요.</p>`;
  }
  if (kind === "teamAdd") {
    const a = findArt(arg); if (!a) return "";
    const pick = S.teamPick || (S.teams[0] && S.teams[0].id);
    return head("팀에 담기", "취소") + `<div class="tcard" style="padding:12px 14px"><div class="tt">${esc(a.title)}</div><small style="color:var(--faint)">${esc(a.src)}</small></div>
      ${S.teams.length > 1 ? `<div style="display:flex;flex-direction:column;gap:8px"><span class="lbl">어느 팀에 담을까요?</span><div class="pills" style="flex-wrap:wrap;padding:0">${S.teams.map((t) => `<button type="button" data-tpick="${t.id}" aria-pressed="${pick === t.id}">${esc(t.name)}</button>`).join("")}</div></div>` : `<p class="tm-p"><b>${esc(S.teams[0].name)}</b> 팀 스크랩함에 담아요.</p>`}
      <label class="lbl" for="f-note">한 줄 메모 <small>· 없어도 돼요</small></label>
      <input class="fld" id="f-note" placeholder="예: 다음 회의 때 공유" maxlength="200" autocomplete="off" value="${esc(S.draftNote || "")}">
      <button type="button" class="cta" data-tadd="${esc(arg)}">담기</button>`;
  }
  if (kind === "teamSet") {
    const t = teamOf(arg); if (!t) return "";
    return head(esc(t.name)) + `<div style="display:flex;flex-direction:column;gap:2px"><span class="lbl">팀원 ${t.members.length}명</span>
      ${t.members.map((m) => `<div class="sy-dev"><b>${esc(m.name)}${m.id === t.me ? " (나)" : ""}</b><span>${m.id === t.owner ? "만든 사람" : "팀원"}</span></div>`).join("")}</div>
      <button type="button" class="cta" data-invite="${t.id}">팀원 초대</button>
      ${t.isOwner
        ? `<button type="button" class="delcat${S.askTeamDel ? " ask" : ""}" data-tdel="${t.id}">${S.askTeamDel ? "한 번 더 누르면 팀과 담긴 기사가 모두 지워져요" : "팀 삭제"}</button><p class="tm-p" style="font-size:12px;text-align:center">만든 사람은 나가기 대신 팀을 삭제할 수 있어요.</p>`
        : `<button type="button" class="delcat${S.askTeamDel ? " ask" : ""}" data-tleave="${t.id}">${S.askTeamDel ? "한 번 더 누르면 팀에서 나가요 (내가 담은 기사는 남아요)" : "팀 나가기"}</button>`}`;
  }
  return "";
}
function teamBodyHTML(t) {
  const wk = Date.now() - 7 * 864e5, n7 = t.items.filter((x) => Date.parse(x.created_at) >= wk).length;
  return `<div class="team-hero"><b>${esc(t.name)} · 팀원 ${t.members.length}명</b><span>${t.items.length ? `모두 ${t.items.length}건 · 이번 주 ${n7}건` : "아직 담은 기사가 없어요. 기사 공유 › 팀에 담기로 모아요."}${t.offline ? " · 연결이 안 돼서 마지막 내용을 보여 줘요" : ""}</span>
    <div class="tm-acts"><button type="button" data-invite="${t.id}">${ICON.team}팀원 초대</button>${n7 ? `<button type="button" data-weekly="${t.id}">${ICON.copy}이번 주 모음 복사</button>` : ""}<button type="button" data-tset="${t.id}">${ICON.gear}팀 관리</button></div></div>
    ${t.items.map((x) => { const c = S.cats.find((k) => k.name === x.cat); const can = x.member === t.me || t.isOwner;
      return `<article class="tcard"><div class="who"><span class="chip" style="background:#FFF4D6;color:#7A5A06">${esc(x.who)} 님이 담음</span>${x.cat ? (c ? chipCat(c) : `<span class="chip">${esc(x.cat)}</span>`) : ""}<span class="tdate">${shortDate(x.created_at)}</span>${can ? `<button type="button" class="tdel" data-tremove="${t.id}:${x.id}" aria-label="빼기">빼기</button>` : ""}</div>
        ${safeUrl(x.link) ? `<a class="tt" data-rd="${esc(rdId(x.link))}" href="${esc(safeUrl(x.link))}" target="_blank" rel="noopener">${esc(x.title)}</a>` : `<div class="tt">${esc(x.title)}</div>`}${x.src ? `<small class="tsrc">${esc(x.src)}</small>` : ""}${x.note ? `<div class="note">${esc(x.note)}</div>` : ""}</article>`; }).join("")}`;
}
function bindTeams(app, rerender, onTeam) {
  const refresh = () => loadTeams().then((gone) => { rerender(); if (gone.length) toast(app, "삭제됐거나 나간 팀을 목록에서 뺐어요"); }).catch(() => {});
  if (S.myTeams.length) refresh();
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && S.myTeams.length) refresh(); });
  // 초대 링크(#join=TEAM-…)로 들어오면 참여 창 열기
  const fromLink = () => {
    const m = location.hash.match(/join=(TEAM-[A-Z0-9-]+)/i); if (!m) return;
    history.replaceState(null, "", location.pathname + location.search); const code = m[1].toUpperCase();
    if (myTeam(code)) { onTeam(code); rerender(); } else setTimeout(() => { S.draftCode = code; S.draftNick = S.nick; S.sheet = { kind: "teamJoin" }; renderSheet(app); }, 400);
  };
  fromLink(); window.addEventListener("hashchange", fromLink);
  const nickOk = () => { const v = (($("#f-nick", app) || {}).value || "").trim(); if (!v) { toast(app, "팀원에게 보일 이름을 넣어 주세요"); return ""; } return v; };
  app.addEventListener("click", async (e) => {
    const t = e.target.closest("button"); if (!t || !app.contains(t)) return;
    if (t.dataset.teamstart !== undefined) { S.sheet = { kind: "teamStart" }; renderSheet(app); return; }
    if (t.dataset.teamnew !== undefined) { S.draftTeam = ""; S.draftNick = S.nick; S.sheet = { kind: "teamNew" }; renderSheet(app); $("#f-team", app).focus(); return; }
    if (t.dataset.teamjoin !== undefined) { S.draftCode = ""; S.draftNick = S.nick; S.sheet = { kind: "teamJoin" }; renderSheet(app); $("#f-code", app).focus(); return; }
    if (t.dataset.invite) { S.justMade = null; S.sheet = { kind: "invite", arg: t.dataset.invite }; renderSheet(app); return; }
    if (t.dataset.tset) { S.askTeamDel = false; S.sheet = { kind: "teamSet", arg: t.dataset.tset }; renderSheet(app); return; }
    if (t.dataset.tpick) { S.teamPick = t.dataset.tpick; S.draftNote = ($("#f-note", app) || {}).value || ""; renderSheet(app); return; }
    if (t.dataset.weekly) { const tm = teamOf(t.dataset.weekly); try { navigator.clipboard.writeText(weeklyText(tm)).then(() => toast(app, "이번 주 모음을 복사했어요 · 단체방에 붙여넣으세요")); } catch (err) {} return; }
    if (t.dataset.teamcreate !== undefined) {
      const name = (($("#f-team", app) || {}).value || "").trim(); if (!name) { toast(app, "팀 이름을 넣어 주세요"); return; }
      const nick = nickOk(); if (!nick) return;
      t.disabled = true;
      try { const j = await teamApi("POST", { action: "create", name, nick });
        S.nick = nick; S.myTeams.push({ code: j.code, name: j.name, member: j.member, token: j.token, owner: true }); savePrefs();
        await loadTeams(); if (!teamOf(j.code)) await loadTeams(); S.justMade = j.code; S.sheet = { kind: "invite", arg: j.code }; renderSheet(app); onTeam(j.code); rerender();
      } catch (err) { t.disabled = false; toast(app, teamErr(err)); }
      return;
    }
    if (t.dataset.dojoin !== undefined) {
      const code = (($("#f-code", app) || {}).value || "").trim().toUpperCase().replace(/\s/g, "");
      if (!TEAM_RE.test(code)) { toast(app, TEAM_ERR["bad-code"]); return; }
      if (myTeam(code)) { closeSheet(app); onTeam(code); rerender(); toast(app, "이미 들어가 있는 팀이에요"); return; }
      const nick = nickOk(); if (!nick) return;
      t.disabled = true;
      try { const j = await teamApi("POST", { action: "join", code, nick });
        S.nick = nick; S.myTeams.push({ code: j.code, name: j.name, member: j.member, token: j.token, owner: false }); savePrefs();
        await loadTeams(); closeSheet(app); onTeam(j.code); rerender(); toast(app, `'${j.name}' 팀에 들어왔어요`);
      } catch (err) { t.disabled = false; toast(app, teamErr(err)); }
      return;
    }
    if (t.dataset.inv) {
      const tm = teamOf(t.dataset.tid), text = inviteText(tm), link = `${appUrl()}#join=${tm.code}`;
      const copy = (v, msg) => { try { navigator.clipboard.writeText(v).then(() => toast(app, msg), () => toast(app, "복사하지 못했어요 · 글을 길게 눌러 복사해 주세요")); } catch (err) {} };
      if (t.dataset.inv === "kakao") { if (kakaoShareInvite(tm)) return; if (navigator.share) navigator.share({ title: `'${tm.name}' 팀 스크랩함 초대`, text: text.replace(/\n\S+#join=\S+/, ""), url: link }).catch(() => {}); else copy(text, "복사했어요 · 카카오톡에 붙여넣으세요"); return; }
      copy(t.dataset.inv === "link" ? link : text, t.dataset.inv === "link" ? "초대 링크를 복사했어요" : "초대 문구를 복사했어요"); return;
    }
    if (t.dataset.tadd) {
      const a = findArt(t.dataset.tadd), tm = teamOf(S.teamPick) || S.teams[0], mt = tm && myTeam(tm.code);
      if (!a || !tm || !mt) { closeSheet(app); toast(app, "다시 한 번 시도해 주세요"); return; }
      const c = cat(a.cat);
      t.disabled = true;
      try { await teamApi("POST", { action: "add", code: tm.code, token: mt.token, item: { art: a.id, title: a.title, link: a.link || "", src: a.src || "", cat: c ? c.name : "", note: (($("#f-note", app) || {}).value || "").trim() } });
        DEX.shares += 1; saveDex(); closeSheet(app); await loadTeams(); rerender(); toast(app, `'${tm.name}'에 담았어요`);
      } catch (err) { t.disabled = false; toast(app, teamErr(err)); if (err.status === 403 || err.status === 404) { closeSheet(app); refresh(); } }
      return;
    }
    if (t.dataset.tremove) {
      const [tid, id] = t.dataset.tremove.split(":"), tm = teamOf(tid), mt = myTeam(tid);
      if (!t.dataset.ask) { t.dataset.ask = "1"; t.textContent = "한 번 더"; t.classList.add("ask"); setTimeout(() => { if (t.isConnected) { delete t.dataset.ask; t.textContent = "빼기"; t.classList.remove("ask"); } }, 3000); return; }
      try { await teamApi("POST", { action: "remove", code: tm.code, token: mt.token, id: Number(id) }); tm.items = tm.items.filter((x) => String(x.id) !== id); rerender(); toast(app, "팀 스크랩함에서 뺐어요"); }
      catch (err) {
        if (err.code === "no-item") { tm.items = tm.items.filter((x) => String(x.id) !== id); rerender(); toast(app, "이미 빠진 기사예요"); }
        else { toast(app, teamErr(err)); if (err.status === 403 || err.status === 404) refresh(); }
      }
      return;
    }
    if (t.dataset.tleave || t.dataset.tdel) {
      const code = t.dataset.tleave || t.dataset.tdel, mt = myTeam(code);
      if (!S.askTeamDel) { S.askTeamDel = true; renderSheet(app); return; }
      try { await teamApi("POST", { action: t.dataset.tdel ? "delete" : "leave", code, token: mt.token });
        S.myTeams = S.myTeams.filter((x) => x.code !== code); S.teams = S.teams.filter((x) => x.id !== code); savePrefs();
        S.askTeamDel = false; closeSheet(app); onTeam("mine"); rerender(); toast(app, t.dataset.tdel ? "팀을 삭제했어요" : "팀에서 나왔어요");
      } catch (err) { toast(app, teamErr(err)); }
      return;
    }
  });
  app.addEventListener("input", (e) => {
    if (e.target.id === "f-kw" && S.draft) { const b = $("[data-addcat]", app); if (b) b.disabled = !(S.draft.name.trim() && (S.draft.words.length || e.target.value.trim())); }
    if (e.target.id === "f-team") S.draftTeam = e.target.value;
    if (e.target.id === "f-code") S.draftCode = e.target.value;
    if (e.target.id === "f-nick") S.draftNick = e.target.value;
    if (e.target.id === "f-note") S.draftNote = e.target.value;
  });
}

/* ── PC·휴대폰 동기화 (/api/sync → Supabase) ──
   - 로그인 대신 동기화 코드(DB-XXXX-XXXX-XXXX). 같은 코드를 넣은 기기는 같은 기록(분야·스크랩·출석·도감)을 씀
   - 바뀌면 2초 뒤 서버에 저장, 앱을 다시 볼 때마다 서버 기록을 받아 합침 */
const SYNC_KEY = "daily-briefing-sync", SYNC_BASE_KEY = "daily-briefing-sync-base";
S.sync = { code: "", at: "", dev: "", devices: {}, off: false, busy: false, last: 0, gen: 0, pending: false };
let syncTimer = null, syncRerender = () => {}, syncChain = Promise.resolve();
function saveSync() { try { const { code, at, dev, devices, last, pending } = S.sync; localStorage.setItem(SYNC_KEY, JSON.stringify({ code, at, dev, devices, last, pending })); } catch (e) {} }
function loadSync() {
  try { Object.assign(S.sync, JSON.parse(localStorage.getItem(SYNC_KEY) || "{}")); } catch (e) {}
  if (!S.sync.dev) { S.sync.dev = "d" + Math.random().toString(36).slice(2, 10); saveSync(); }
}
// 마지막으로 서버와 맞춘 기록 (3-way 합치기의 기준점)
function loadBase() { try { return JSON.parse(localStorage.getItem(SYNC_BASE_KEY) || "null"); } catch (e) { return null; } }
function saveBase(d) { try { if (d) localStorage.setItem(SYNC_BASE_KEY, JSON.stringify(d)); else localStorage.removeItem(SYNC_BASE_KEY); } catch (e) {} }
function devName() {
  const u = navigator.userAgent;
  if (/iPhone/.test(u)) return "아이폰"; if (/iPad/.test(u) || (/Macintosh/.test(u) && navigator.maxTouchPoints > 1)) return "아이패드";
  if (/Android/.test(u)) return /Mobile/.test(u) ? "안드로이드 휴대폰" : "안드로이드 태블릿";
  if (/Windows/.test(u)) return "PC (Windows)"; if (/Macintosh/.test(u)) return "Mac"; return "PC";
}
const readLS = (k) => { try { return JSON.parse(localStorage.getItem(k) || "{}"); } catch (e) { return {}; } };
function snapshot() {
  const mine = (S.sync.devices || {})[S.sync.dev];
  const at = mine && Date.now() - mine.at < 3600e3 ? mine.at : Date.now(); // 마지막 사용 시각은 1시간 단위로만 갱신 (매번 저장할 거리가 생기지 않게)
  return { v: 2, prefs: readLS(STORE_KEY), dex: readLS(DEX_KEY), devices: { ...S.sync.devices, [S.sync.dev]: { name: devName(), at } } };
}
const dayNum = (k) => { const [y, m, d] = String(k || "0-0-0").split("-").map(Number); return (y || 0) * 10000 + (m || 0) * 100 + (d || 0); };
const uniq = (...xs) => [...new Set(xs.flat().filter((x) => x != null && x !== ""))];
// 순서와 상관없이 내용이 같은지 (키 순서가 달라도 같은 것으로 봄)
const stable = (v) => Array.isArray(v) ? `[${v.map(stable).join(",")}]` : v && typeof v === "object" ? `{${Object.keys(v).sort().map((k) => JSON.stringify(k) + ":" + stable(v[k])).join(",")}}` : JSON.stringify(v ?? null);
const same = (a, b) => stable(a) === stable(b);
// 목록 3-way: 서버 목록에 '이 기기에서 더한 것'은 더하고 '이 기기에서 뺀 것'은 뺌
function setMerge(b, l, s, key = (x) => x) {
  const K = (arr) => new Map((arr || []).map((x) => [key(x), x]));
  const bm = K(b), lm = K(l), out = K(s);
  bm.forEach((_, k) => { if (!lm.has(k)) out.delete(k); });
  lm.forEach((v, k) => { if (!bm.has(k)) out.set(k, v); });
  return [...out.values()];
}
// 분야 3-way: 이 기기에서 더하거나 고친 분야는 이 기기 것, 지운 분야는 지움, 나머지는 서버 것
function catMerge(b, l, s) {
  const bm = new Map((b || []).map((c) => [c.id, c])), lm = new Map((l || []).map((c) => [c.id, c]));
  let out = (s || []).filter((c) => !(bm.has(c.id) && !lm.has(c.id)));
  lm.forEach((c, id) => {
    const i = out.findIndex((x) => x.id === id);
    if (!bm.has(id) || !same(c, bm.get(id))) { if (i >= 0) out[i] = c; else out.push(c); }
  });
  return out;
}
function mergeDex(ld, sd) {
  const sFirst = (sd.days || 0) > (ld.days || 0) || ((sd.days || 0) === (ld.days || 0) && dayNum(sd.last) >= dayNum(ld.last));
  const hi = sFirst ? sd : ld, lo = sFirst ? ld : sd;
  return { ...lo, ...hi, reads: Math.max(sd.reads || 0, ld.reads || 0), shares: Math.max(sd.shares || 0, ld.shares || 0),
    got: { ...(lo.got || {}), ...(hi.got || {}) }, earned: uniq(lo.earned || [], hi.earned || []), ...mergeGold(hi, lo, { ...(lo.got || {}), ...(hi.got || {}) }) };
}
/* 황금알 합치기: 어느 기기에서든 이미 깨어난 전설의 알은 버리고, 같은 알이면 더 많이 찬 쪽을 씀
   (전에는 한 기기에서 부화해 알이 비면 다른 기기의 '부화 전' 알이 되살아났음) */
function mergeGold(hi, lo, got) {
  const live = (e) => e && e.id && !got[e.id];
  let cur = [hi.goldEgg, lo.goldEgg].filter(live).reduce((a, e) => (!a ? e : a.id === e.id && (e.done || 0) > (a.done || 0) ? e : a), null);
  const seen = new Set(cur ? [cur.id] : []), q = [];
  [...(hi.goldQ || []), ...(lo.goldQ || []), lo.goldEgg, hi.goldEgg].forEach((e) => { if (live(e) && !seen.has(e.id)) { seen.add(e.id); q.push({ id: e.id, rand: !!e.rand }); } });
  if (!cur && q.length) { const nx = q.shift(); cur = { id: nx.id, need: GOLD_NEED, done: 0, from: todayKey(), rand: nx.rand }; }
  return { goldEgg: cur ? { ...cur } : null, goldQ: q };
}
/* 합치기: base = 마지막으로 맞춘 기록, l = 이 기기, s = 서버
   - base가 없으면(처음 연결) 설정·분야는 서버 것, 스크랩·팀·출석은 합침
   - base가 있으면 이 기기에서 바뀐 것만 서버 기록 위에 얹음 (지운 것도 지운 대로) */
function merge3(base, l, s) {
  const bp = base && base.prefs, lp = l.prefs || {}, sp = s.prefs || {};
  const SPECIAL = ["scrap", "saved", "read", "readDay", "myTeams", "cats"];
  const p = {};
  const keys = uniq(Object.keys(lp), Object.keys(sp));
  keys.filter((k) => !SPECIAL.includes(k)).forEach((k) => { p[k] = !bp ? (k in sp ? sp[k] : lp[k]) : (same(lp[k], bp[k]) ? sp[k] : lp[k]); });
  if (!bp) {
    p.scrap = uniq(sp.scrap || [], lp.scrap || []);
    p.myTeams = setMerge([], lp.myTeams, sp.myTeams, (t) => t.code);
    p.cats = Array.isArray(sp.cats) && (sp.cats.length || sp.catsVer) ? sp.cats : lp.cats;
  } else {
    p.scrap = setMerge(bp.scrap, lp.scrap, sp.scrap);
    p.myTeams = setMerge(bp.myTeams, lp.myTeams, sp.myTeams, (t) => t.code);
    p.cats = catMerge(bp.cats, lp.cats, sp.cats);
  }
  const sv = { ...(sp.saved || {}), ...(lp.saved || {}) }; p.saved = Object.fromEntries(p.scrap.filter((id) => sv[id]).map((id) => [id, sv[id]]));
  if (lp.readDay === sp.readDay) { p.readDay = lp.readDay; p.read = uniq(sp.read || [], lp.read || []); }
  else { const later = dayNum(lp.readDay) >= dayNum(sp.readDay) ? lp : sp; p.readDay = later.readDay; p.read = later.read || []; }
  Object.keys(p).forEach((k) => p[k] === undefined && delete p[k]);
  return { v: 2, prefs: p, dex: mergeDex(l.dex || {}, s.dex || {}), devices: { ...(s.devices || {}), ...(l.devices || {}) } };
}
function applyData(d) {
  const before = JSON.stringify(S.cats.map((c) => [c.id, c.words, c.ex]));
  const teamsBefore = S.myTeams.map((t) => t.code).join();
  S.sync.applying = true;
  try { localStorage.setItem(STORE_KEY, JSON.stringify(d.prefs || {})); localStorage.setItem(DEX_KEY, JSON.stringify(d.dex || {})); } catch (e) {}
  loadPrefs(); loadDex();
  S.sync.applying = false;
  if (S.myTeams.map((t) => t.code).join() !== teamsBefore) loadTeams().then(() => syncRerender()).catch(() => {});
  if (JSON.stringify(S.cats.map((c) => [c.id, c.words, c.ex])) !== before) { pruneArts(); fetchNews().then((n) => { applyNews(n); syncRerender(); }).catch(() => {}); }
}
async function syncApi(method, body, code) {
  const r = await fetch("/api/sync" + (code ? `?code=${encodeURIComponent(code)}` : ""), { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (r.status === 503) { S.sync.off = true; throw Object.assign(new Error("off"), { off: true }); }
  if (!r.ok) throw Object.assign(new Error(j.error || r.status), { status: r.status });
  S.sync.off = false; return j;
}
/* 서버가 준비됐는지 다시 확인 (없는 코드로 물어봐서 404면 준비 완료) */
async function syncProbe() {
  try { await syncApi("GET", null, "DB-2222-2222-2222"); } catch (e) { if (e.status === 404) S.sync.off = false; }
  return !S.sync.off;
}
/* 바뀐 게 있으면 1.5초 뒤 맞추기 (savePrefs·saveDex에서 부름) */
function syncSoon() {
  if (S.sync.applying) return;
  S.sync.gen++; S.sync.pending = true; saveSync();
  if (!S.sync.code) return;
  clearTimeout(syncTimer); syncTimer = setTimeout(syncNow, 1500);
}
/* 맞추기는 한 번에 하나씩 차례로 (받기·합치기·올리기를 한 묶음으로) */
function syncNow() { const run = () => syncOnce().catch(() => {}); syncChain = syncChain.then(run, run); return syncChain; }
async function syncOnce() {
  const code = S.sync.code; if (!code) return;
  S.sync.busy = true;
  try {
    for (let i = 0; i < 4; i++) {
      const g = S.sync.gen;
      const srv = await syncApi("GET", null, code);
      if (S.sync.code !== code) return; // 그사이 연결을 끊었으면 버림
      const local = snapshot(), merged = merge3(loadBase(), local, srv.data || {});
      if (!same(merged.prefs, local.prefs) || !same(merged.dex, local.dex)) { applyData(merged); syncRerender(); }
      saveBase(srv.data || null); // 서버 내용을 받아 반영했으니 기준점은 서버 기록 (올리기가 실패해도 다음에 바르게 합쳐지게)
      let at = srv.updated_at;
      const sd = srv.data || {};
      if (!same(merged.prefs, sd.prefs) || !same(merged.dex, sd.dex) || !same(merged.devices, sd.devices)) {
        try { const j = await syncApi("PUT", { code, data: merged, base: srv.updated_at }); at = j.updated_at; }
        catch (e) { if (e.status === 409 && i < 3) continue; throw e; } // 그사이 다른 기기가 올렸으면 다시 받아서 합침
      }
      if (S.sync.code !== code) return;
      saveBase(merged); S.sync.at = at; S.sync.devices = merged.devices; S.sync.last = Date.now(); S.sync.lost = false; S.sync.err = "";
      if (S.sync.gen === g) S.sync.pending = false;
      saveSync(); return;
    }
  } catch (e) {
    if (e.status === 404) S.sync.lost = true;
    else if (e.status === 413) S.sync.err = "저장된 기록이 너무 커서 맞추지 못했어요";
    else if (e.status === 409) S.sync.err = "다른 기기와 동시에 저장하느라 잠시 못 맞췄어요 · 곧 다시 맞춰요";
    saveSync();
  } finally { S.sync.busy = false; }
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
  if (S.sync.off) return head("PC·휴대폰 동기화") + `<div class="st-warn">동기화 서버를 준비하고 있어요. 조금 뒤에 다시 열어 주세요. 지금은 이 기기에만 저장돼요.<br><small>(서버에 SUPABASE_URL · SUPABASE_SECRET_KEY 설정이 아직 안 보여요)</small></div><button type="button" class="cta" data-syncretry>다시 확인</button>`;
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
  syncNow().then(redraw);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" || S.sync.pending) syncNow().then(redraw); });
  setInterval(() => { if (document.visibilityState === "visible" && S.sync.code) syncNow().then(redraw); }, 60000); // 켜 둔 화면도 1분마다 맞춤
  app.addEventListener("click", async (e) => {
    const t = e.target.closest("button"); if (!t || !app.contains(t)) return;
    if (t.dataset.synchelp !== undefined) { S.sheet = { kind: "syncHelp" }; renderSheet(app); return; }
    if (t.dataset.sync !== undefined) { S.sheet = { kind: "sync" }; renderSheet(app); if (S.sync.code) syncNow().then(redraw); else syncProbe().then(redraw); return; }
    if (t.dataset.syncretry !== undefined) { t.disabled = true; t.textContent = "확인 중…"; const ok = await syncProbe(); redraw(); toast(app, ok ? "동기화 서버가 준비됐어요" : "아직 준비 중이에요"); return; }
    if (t.dataset.synccopy === "code") { try { navigator.clipboard.writeText(S.sync.code).then(() => toast(app, "코드를 복사했어요"), () => toast(app, "복사하지 못했어요 · 코드를 길게 눌러 복사해 주세요")); } catch (err) {} return; }
    if (t.dataset.synccopy === "kakao") {
      const text = `DAILY BRIEFING 동기화 코드: ${S.sync.code}\n다른 기기의 설정 › PC·휴대폰 동기화에서 '다른 기기 코드로 연결'에 넣어 주세요.`;
      if (kakaoShareText(text)) return;
      if (navigator.share) navigator.share({ title: "DAILY BRIEFING 동기화 코드", text }).catch(() => {});
      else { try { navigator.clipboard.writeText(text).then(() => toast(app, "복사했어요 · 카카오톡 '나와의 채팅'에 붙여넣으세요")); } catch (err) {} }
      return;
    }
    if (t.dataset.syncnow !== undefined) { t.disabled = true; await syncNow(); redraw(); toast(app, S.sync.off ? "동기화 서버 준비 중이에요" : S.sync.lost || S.sync.err ? "맞추지 못했어요" : "다른 기기와 맞췄어요"); return; }
    if (t.dataset.syncoff !== undefined) {
      if (!t.dataset.ask) { t.dataset.ask = "1"; t.textContent = "한 번 더 누르면 끊겨요 (기록은 이 기기에 남아요)"; return; }
      clearTimeout(syncTimer); Object.assign(S.sync, { code: "", at: "", lost: false, devices: {}, err: "" }); saveBase(null); saveSync(); renderSheet(app); toast(app, "이 기기 연결을 끊었어요"); return;
    }
    if (t.dataset.syncnew !== undefined) {
      S.sync.busy = true; renderSheet(app);
      try { const data = snapshot(); const j = await syncApi("POST", { data }); Object.assign(S.sync, { code: j.code, at: j.updated_at, pending: false, devices: data.devices, last: Date.now(), lost: false, err: "" }); saveBase(data); saveSync(); toast(app, "코드를 만들었어요 · 다른 기기에 넣어 주세요"); }
      catch (err) { S.sync.err = err.off ? "" : String(err.message || err); toast(app, err.off ? "동기화 서버 준비 중이에요" : "코드를 만들지 못했어요 · 아래 오류 내용을 알려 주세요"); }
      S.sync.busy = false; renderSheet(app); return;
    }
    if (t.dataset.syncjoin !== undefined) {
      const v = ($("#f-sync", app).value || "").trim().toUpperCase().replace(/\s/g, "");
      if (!/^DB-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/.test(v)) { toast(app, "DB-XXXX-XXXX-XXXX 모양의 코드를 넣어 주세요"); return; }
      if (v === S.sync.code) { toast(app, "이미 이 코드로 연결돼 있어요"); return; }
      try {
        await syncApi("GET", null, v); // 있는 코드인지 먼저 확인
        clearTimeout(syncTimer); Object.assign(S.sync, { code: v, at: "", lost: false, err: "" }); saveBase(null); saveSync(); // 기준점 없이 합치기: 설정·분야는 그 코드 것, 스크랩·팀·출석은 합침
        await syncNow(); renderSheet(app); syncRerender(); toast(app, S.sync.lost ? "연결하지 못했어요" : "연결했어요 · 두 기기의 기록을 합쳤어요");
      } catch (err) { toast(app, err.off ? "동기화 서버 준비 중이에요" : err.status === 404 ? "없는 코드예요 · 다시 확인해 주세요" : "연결하지 못했어요 · 잠시 뒤 다시 해 주세요"); }
      return;
    }
  });
}
const CREDIT = `<div class="credit">연구정책국 연구정책과<span>Kyeong-seok Kwon</span></div>`;

/* ── 통계: '농촌진흥청'이 들어간 기사만 센다 (/api/stats) ──
   - 내 분야 검색어와 상관없이 모두 같은 기준
   - 네이버에서 거슬러 받을 수 있는 날(최대 1,000건)은 바로 채우고, 그 전 기간은 매일 기록이 쌓이면서 채워짐(5단계) */
const STAT_WORD = "농촌진흥청", STATS_KEY = "daily-briefing-stats-v2";
S.statPeriod = 7; S.rda = null;
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const md = (d) => `${d.getMonth() + 1}월 ${d.getDate()}일`;
const mdS = (d) => `${d.getMonth() + 1}.${d.getDate()}`;
const dKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromKey = (k) => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
const rdId = (link) => S.arts.find((a) => a.link === link)?.id || "u:" + String(link).slice(0, 200);
async function fetchStats(force) {
  if (!force) try { const c = JSON.parse(localStorage.getItem(STATS_KEY) || "null"); if (c && c.today === dKey(new Date()) && Date.now() - c.at < 30 * 60000) { S.rda = c; return; } } catch (e) {}
  try {
    let r = await fetch("/api/stats").catch(() => null);
    if (!r || !r.ok) { await new Promise((ok) => setTimeout(ok, 2000)); r = await fetch("/api/stats"); } // 한 번 더 시도
    if (!r.ok) throw new Error(r.status);
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
    g += `<rect class="bar" style="animation-delay:${i * (D.weekly ? 50 : n > 7 ? 18 : 60)}ms" x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#34A98A"${s.today ? ' fill-opacity=".55"' : ""}><title>${md(s.date)} ${s.n}건${s.today ? " (오늘, 집계 중)" : ""}</title></rect>`;
    if (n <= 7) g += `<text x="${x + w / 2}" y="${y - 4}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--sub)">${s.n}</text>`;
    if (!D.weekly) g += `<rect class="hit" data-sday="${dKey(s.date)}" x="${L + i * bw}" y="${T}" width="${bw}" height="${ch}" fill="transparent" tabindex="0" role="button" aria-label="${md(s.date)} 기사 ${s.n}건 보기"><title>${md(s.date)} ${s.n}건 · 눌러서 기사 보기</title></rect>`;
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
    <section class="st-card"><h3>${D.weekly ? "주별" : "일별"} 기사 수 <small>${D.weekly ? "오늘은 집계 중이라 연하게 표시" : "막대를 누르면 그날 기사를 볼 수 있어요"}</small></h3>${chartSVG(D, wide ? 1120 : 340)}</section>
    <div class="st-cols">
    <section class="st-card"><h3>많이 다룬 매체 <small>이 기간 상위 5</small></h3>${D.media.length ? D.media.map(([m, n], i) => `<div class="st-bar"><span>${i + 1}. ${esc(m)}</span><i><em style="width:${n / D.media[0][1] * 100}%;background:#34A98A"></em></i><b>${n}</b></div>`).join("") : `<div class="st-note small">아직 기사가 없어요</div>`}</section>
    <section class="st-card"><h3>오늘 많이 보도된 소식 <small>여러 매체가 함께 다룬 기사</small></h3>${issues.length ? issues.map(([t, n, link], i) => `<a class="st-rank" data-rd="${esc(rdId(link))}" href="${esc(safeUrl(link))}" target="_blank" rel="noopener"><em>${i + 1}</em><span>${esc(t)}</span><b>${n}개 매체</b></a>`).join("") : `<div class="st-note small">여러 매체가 함께 다룬 소식이 아직 없어요</div>`}</section>
    </div>
    <div class="st-note small">네이버 뉴스 검색 기준 · 30분마다 갱신 · 같은 소식을 여러 매체가 쓰면 각각 셉니다.</div>
  </div>`;
}
function statDaySheet(k) {
  const v = S.rda && S.rda.days && S.rda.days[k]; const d = fromKey(k);
  const head = `<div class="grab"></div><div class="sh-head"><h2>${md(d)} '${STAT_WORD}' 기사</h2><button type="button" class="x" data-close>닫기</button></div>`;
  if (!v) return head + `<div class="st-note">이날 기사 목록이 없어요.</div>`;
  const list = v.list || [];
  return head + `<p class="tm-p">모두 <b>${v.n}건</b>${k === dKey(new Date()) ? " (오늘, 집계 중)" : ""} · 같은 소식은 묶어서 여러 매체가 다룬 순으로 보여 줘요${list.length >= 80 ? " (상위 80개 소식)" : ""}.</p>
    <div class="sd-list">${list.map(([t, src, link, media, at]) => `<a class="sd-it" data-rd="${esc(rdId(link))}" href="${esc(safeUrl(link))}" target="_blank" rel="noopener"><span class="sd-t">${esc(t)}</span><span class="sd-m">${esc(src)}${media > 1 ? ` · <b>${media}개 매체</b>` : ""} · ${new Date(at).getHours()}시</span></a>`).join("") || `<div class="st-note">목록을 불러오지 못했어요. 새로고침 후 다시 열어 주세요.</div>`}</div>`;
}
function bindStats(app, rerender) {
  const openDay = (el) => { S.sheet = { kind: "statDay", arg: el.dataset.sday }; renderSheet(app); };
  app.addEventListener("click", (e) => { const h = e.target.closest("[data-sday]"); if (h && app.contains(h)) openDay(h); });
  app.addEventListener("keydown", (e) => { const h = e.target.closest && e.target.closest("[data-sday]"); if (h && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openDay(h); } });
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
  const hatch = FX.hatch, goldNew = FX.goldNew;
  ["read", "att", "attDone", "star", "relAnim", "enter", "hatch", "goldNew"].forEach((k) => delete FX[k]);
  /* 새 친구·랜덤 전설·조건 전설 황금알을 모두 한 줄로 세워 차례로 한 장씩 보여 줌.
     이미 화면이 떠 있거나 대기 중이면 뒤에 붙이기만 함 (덮어쓰거나 토스트로 흘려보내지 않음) */
  const add = [...(hatch || []), ...(goldNew || []).map((id) => "!gold:" + id)];
  if (add.length) {
    const busy = HXQ.length || HXT || $$(".hx", app).length;
    HXQ.push(...add);
    if (!busy) HXT = setTimeout(() => { HXT = 0; hatchNext(app); }, 900);
  }
}
let HXQ = [], HXT = 0;
function hatchNext(app) { const id = HXQ.shift(); if (id) showHatch(app, id); }
function showHatch(app, id) {
  if (id === "!found") return showFound(app);
  if (id.startsWith("!gold:")) return showGoldGot(app, id.slice(6));
  const x = DEX.items.find((y) => y.id === id);
  $$(".hx", app).forEach((n) => n.remove());
  const gold = x.kind === "legend";
  const el = document.createElement("div"); el.className = "hx" + (gold ? " gold" : ""); el.setAttribute("role", "dialog"); el.setAttribute("aria-label", "새 친구를 만났어요");
  el.innerHTML = `<div class="hx-card"><div class="hx-top">${gold ? "황금알이 깨어났어요!" : `출석 ${DEX.days}일 달성!`}</div>
    <div class="hx-stage"><div class="hx-egg"><img class="w" src="${gold ? IMG.gEgg : IMG.egg}" alt=""><img class="b" src="${gold ? IMG.gEggBot : IMG.eggBot}" alt=""><img class="a" src="${gold ? IMG.gEggTop : IMG.eggTop}" alt=""></div>${x.img ? `<img src="${IMG[x.img]}" alt="${esc(x.name)}">` : `<span class="hx-sp">${dexArt(x, true)}</span>`}</div>
    <div class="hx-txt"><small>${dexNo(x)}</small><b>${esc(x.name)}</b><span>${gold ? "전설 친구를 만났어요" : "새 친구를 만났어요"}</span></div>
    <div class="hx-btns"><button type="button" class="cta" data-hxgo>도감에서 보기</button><button type="button" class="hx-x" data-hxclose>닫기</button></div></div>`;
  app.append(el);
  setTimeout(() => el.classList.add("shake"), 250);
  setTimeout(() => el.classList.add("open"), 1500);
}

/* 랜덤 전설: 일반 알이 흔들리다 황금알로 바뀌는 장면 */
function showFound(app) {
  $$(".hx", app).forEach((n) => n.remove());
  const el = document.createElement("div"); el.className = "hx gold found"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", "반짝이는 알을 발견했어요");
  el.innerHTML = `<div class="hx-card"><div class="hx-top">출석 ${DEX.days}일 달성!</div>
    <div class="hx-stage"><div class="hx-egg"><img class="w" src="${IMG.egg}" alt=""><img class="g" src="${IMG.gEgg}" alt=""><i class="sp s1">✦</i><i class="sp s2">✦</i><i class="sp s3">✦</i></div></div>
    <div class="hx-txt"><b>앗, 이 알… 뭔가 달라요!</b><span>반짝이는 알을 발견했어요<br>${DEX.goldQ.length ? "지금 품는 황금알이 깨어나면 이어서 품어요" : `출석 ${GOLD_NEED}일 동안 품으면 깨어나요`}</span></div>
    <div class="hx-btns"><button type="button" class="cta" data-hxgo>품기</button></div></div>`;
  app.append(el);
  setTimeout(() => el.classList.add("shake"), 250);
  setTimeout(() => el.classList.add("open"), 1500);
}

/* 조건 전설: 기록을 채워 황금알을 받은 장면 (출석 친구 화면과 따로 한 장) */
function showGoldGot(app, id) {
  const x = DEX.items.find((y) => y.id === id); if (!x) return hatchNext(app);
  $$(".hx", app).forEach((n) => n.remove());
  const now = DEX.goldEgg && DEX.goldEgg.id === id;
  const el = document.createElement("div"); el.className = "hx gold found"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", "황금알을 받았어요");
  el.innerHTML = `<div class="hx-card"><div class="hx-top">전설 조건 달성!</div>
    <div class="hx-stage"><div class="hx-egg"><img class="w" src="${IMG.egg}" alt=""><img class="g" src="${IMG.gEgg}" alt=""><i class="sp s1">✦</i><i class="sp s2">✦</i><i class="sp s3">✦</i></div></div>
    <div class="hx-txt"><b>황금알을 받았어요!</b><span>‘${esc(x.cond || "")}’ 달성<br>${now ? `출석 ${GOLD_NEED}일 동안 품으면 깨어나요` : "지금 품는 황금알이 깨어나면 이어서 품어요"}</span></div>
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
    if (b.dataset.twdel) { const [id, k] = b.dataset.twdel.split(":"), d = draft.find((x) => x.id === id); if (d.words.length <= 1) { toast(app, "검색어는 하나 이상 있어야 해요"); return; } d.words.splice(+k, 1); draw("tw-" + id); return; }
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

/* ── 카카오톡 공유 (카카오 JavaScript SDK) ──
   - 서버 환경변수 KAKAO_JS_KEY가 있으면 카카오톡으로 바로 공유(카드 모양 메시지), 없거나 실패하면 휴대폰 공유 창/복사로 대신
   - 메시지 링크는 등록한 우리 사이트 주소만 허용돼서 기사는 /api/go?u=… 를 거쳐 열림 */
const KAKAO_SDK = { src: "https://t1.kakaocdn.net/kakao_js_sdk/2.8.4/kakao.min.js", integrity: "sha384-BGX7Wb16GmRFagri4bLJV2DgipVZaU2AI812GZtHtHzzDQJnfHasDXN5houxv45w" };
let kakaoReady = null;
function kakaoInit() {
  if (kakaoReady) return kakaoReady;
  kakaoReady = (async () => {
    const cfg = await fetch("/api/config").then((r) => r.json()).catch(() => ({}));
    if (!cfg.kakao) return false;
    if (!window.Kakao) await new Promise((ok, no) => { const sc = document.createElement("script"); sc.src = KAKAO_SDK.src; sc.integrity = KAKAO_SDK.integrity; sc.crossOrigin = "anonymous"; sc.onload = ok; sc.onerror = no; document.head.append(sc); });
    if (!window.Kakao.isInitialized()) window.Kakao.init(cfg.kakao);
    return true;
  })().catch(() => false);
  return kakaoReady;
}
// 버튼을 누른 그 순간에 바로 열어야 PC 팝업이 막히지 않아서, 미리 준비해 두고 준비된 경우에만 카카오로 보냄
const kakaoOn = () => !!(window.Kakao && window.Kakao.isInitialized && window.Kakao.isInitialized());
if (typeof window !== "undefined") setTimeout(() => kakaoInit().then((ok) => { S.kakaoOK = ok; }), 1500);
const goUrl = (u) => `${location.origin}/api/go?u=${encodeURIComponent(u)}`;
// 기사 공유: 성공하면 true
function kakaoShareArticle(a) {
  if (!kakaoOn()) return false;
  const link = safeUrl(a.link) ? goUrl(safeUrl(a.link)) : location.origin + "/";
  const d = a.t ? new Date(a.t) : new Date();
  try {
    window.Kakao.Share.sendDefault({ objectType: "feed",
      content: { title: a.title, description: `${a.src || ""} · ${d.getMonth() + 1}.${d.getDate()}.${a.media > 1 ? ` · ${a.media}개 매체 보도` : ""}`, imageUrl: location.origin + "/icon-512.png", imageWidth: 512, imageHeight: 512, link: { mobileWebUrl: link, webUrl: link } },
      buttons: [{ title: "기사 보기", link: { mobileWebUrl: link, webUrl: link } }, { title: "DAILY BRIEFING", link: { mobileWebUrl: location.origin + "/", webUrl: location.origin + "/" } }] });
    return true;
  } catch (e) { return false; }
}
// 팀 초대 공유
function kakaoShareInvite(t) {
  if (!kakaoOn()) return false;
  const link = `${location.origin}/#join=${t.code}`;
  try {
    window.Kakao.Share.sendDefault({ objectType: "feed",
      content: { title: `'${t.name}' 팀 스크랩함 초대`, description: `DAILY BRIEFING에서 기사를 함께 모아요 · 초대 코드 ${t.code}`, imageUrl: location.origin + "/icon-512.png", imageWidth: 512, imageHeight: 512, link: { mobileWebUrl: link, webUrl: link } },
      buttons: [{ title: "팀에 참여하기", link: { mobileWebUrl: link, webUrl: link } }] });
    return true;
  } catch (e) { return false; }
}
// 동기화 코드 나에게 보내기
function kakaoShareText(text) {
  if (!kakaoOn()) return false;
  try { window.Kakao.Share.sendDefault({ objectType: "text", text, link: { mobileWebUrl: location.origin + "/", webUrl: location.origin + "/" }, buttonTitle: "DAILY BRIEFING 열기" }); return true; } catch (e) { return false; }
}

/* ═════ 움직이는 도감 (dexfx) ═════
   도감 카드를 누르면 뜨는 수집 카드 팝업과 카드별 움직이는 효과.
   - DexFx.mount(무대, 설정): 그림 위에 효과를 얹음. 좌표는 원본 그림 픽셀 기준
   - DEX_FX.NORMAL: 이삭이·새싹이 80장 효과 설정, DEX_FX.LEG: 전설 25장 효과 이름
   - build.py가 app.js 뒤에 이 파일을 붙여서 배포함 */
/* ===== DAILY BRIEFING 도감 움직이는 효과 (dexfx) =====
   DexFx.mount(stageEl, { img, w, h, fx, legend }) → { pause(), resume(), stop() }
   - 좌표는 모두 원본 PNG 픽셀 기준. 카드마다 위치 몇 개만 적으면 됨
   - legend:true 면 공통 반짝이가 붙음 */
const DexFx = (() => {
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = (a) => a[(Math.random() * a.length) | 0];
  const el = (cls, html) => { const e = document.createElement("div"); e.className = cls; if (html) e.innerHTML = html; return e; };

  const BAT = '<svg viewBox="0 0 100 50"><g class="w"><path d="M50 22 C40 6 22 2 4 12 C14 14 18 22 16 30 C24 24 32 26 36 34 C40 28 46 28 50 30 C54 28 60 28 64 34 C68 26 76 24 84 30 C82 22 86 14 96 12 C78 2 60 6 50 22Z" fill="#1a1226"/></g><ellipse cx="50" cy="26" rx="7" ry="9" fill="#1a1226"/><circle cx="47" cy="23" r="1.6" fill="#ffb347"/><circle cx="53" cy="23" r="1.6" fill="#ffb347"/></svg>';
  const MAGPIE = '<svg viewBox="0 0 120 60"><g class="w"><path d="M52 28 C44 10 30 4 14 8 C24 12 30 18 32 26 C38 24 46 26 52 30Z" fill="#1b1d2b"/><path d="M40 16 C34 12 26 10 20 10 C26 13 30 16 32 20Z" fill="#fff"/></g><path d="M30 34 C40 26 62 24 78 30 C84 32 90 30 96 26 L92 34 C86 38 78 40 70 40 C58 42 42 40 30 34Z" fill="#1b1d2b"/><path d="M48 36 C56 33 66 33 72 36 C66 39 56 39 48 36Z" fill="#fff"/><path d="M30 34 L4 30 L6 36 L28 38Z" fill="#23304a"/><circle cx="90" cy="28" r="1.4" fill="#fff"/><path d="M98 27 L104 28 L98 30Z" fill="#333"/></svg>';

  function mount(stage, cfg) {
    const W = cfg.w, H = cfg.h, timers = [];
    let running = true;
    stage.classList.add("fx-stage", "fxs-" + cfg.fx, "bg-" + (cfg.bg || cfg.fx));
    const art = el("fx-art"); const mover = el("fx-mover");
    art.style.aspectRatio = W + "/" + H;
    art.style.width = Math.min(88, (100 * W) / H * 0.95) + "%";
    // 그림을 무대 크기에 맞춤 (가로·세로 모두 넘치지 않게)
    const fit = () => { const sw = stage.clientWidth, sh = stage.clientHeight; if (!sw || !sh) return; const k = Math.min((sw * 0.88) / W, (sh * 0.86) / H); art.style.width = W * k + "px"; art.style.height = H * k + "px"; };
    if (window.ResizeObserver) { const ro = new ResizeObserver(fit); ro.observe(stage); timers.ro = ro; } else window.addEventListener("resize", fit);
    requestAnimationFrame(fit);
    const img = new Image(); img.className = "fx-img"; img.src = cfg.img; img.alt = cfg.alt || "";
    const sky = el("fx-l fx-sky"), back = el("fx-l fx-back"), front = el("fx-l fx-front"), top = el("fx-l fx-top");
    mover.append(back, img, front); art.append(mover); stage.append(sky, art, top);

    const pct = (x, y) => ({ left: (x / W) * 100 + "%", top: (y / H) * 100 + "%" });
    const put = (layer, e, x, y, w, h) => {
      Object.assign(e.style, pct(x, y));
      if (w != null) e.style.width = (w / W) * 100 + "%";
      if (h != null) e.style.height = (h / H) * 100 + "%"; else if (w != null) e.style.aspectRatio = "1";
      layer.appendChild(e); return e;
    };
    const spawn = (layer, e, ms) => { layer.appendChild(e); setTimeout(() => e.remove(), ms); };
    const every = (ms, fn) => timers.push(setInterval(() => { if (running && !document.hidden) fn(); }, ms));

    // 투명/불투명 지점 샘플 (반짝이를 캐릭터 둘레나 몸 위에 뿌릴 때 사용)
    let around = [], onBody = [];
    const ready = img.decode ? img.decode().catch(() => {}) : Promise.resolve();
    ready.then(() => {
      try {
        const c = document.createElement("canvas"); c.width = W; c.height = H;
        const g = c.getContext("2d"); g.drawImage(img, 0, 0, W, H);
        const d = g.getImageData(0, 0, W, H).data, A = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? 0 : d[(y * W + x) * 4 + 3]);
        for (let y = 2; y < H; y += 4) for (let x = 2; x < W; x += 4) {
          const a = A(x, y);
          if (a > 200 && A(x - 4, y) > 200 && A(x + 4, y) > 200 && A(x, y - 4) > 200 && A(x, y + 4) > 200) onBody.push([x, y]);
          else if (a < 10) { for (const [dx, dy] of [[12, 0], [-12, 0], [0, 12], [0, -12], [9, 9], [-9, -9], [9, -9], [-9, 9]]) if (A(x + dx, y + dy) > 200) { around.push([x, y]); break; } }
        }
      } catch (e) {}
    });
    const ctx = { W, H, stage, art, mover, img, sky, back, front, top, put, spawn, every, el, rnd, pick, cfg,
      body: () => (onBody.length ? pick(onBody) : [rnd(0.3, 0.7) * W, rnd(0.3, 0.7) * H]),
      edge: () => (around.length ? pick(around) : [rnd(0, 1) * W, rnd(0, 0.8) * H]) };

    if (cfg.legend) legendSparkle(ctx, cfg.sparkle || 420);
    (PRESETS[cfg.fx] || (() => {}))(ctx);

    return {
      pause() { running = false; stage.classList.add("fx-paused"); },
      resume() { running = true; stage.classList.remove("fx-paused"); },
      stop() { timers.forEach(clearInterval); if (timers.ro) timers.ro.disconnect(); stage.innerHTML = ""; },
    };
  }

  function legendSparkle(c, ms) {
    c.every(ms, () => { const [x, y] = c.edge(); const s = c.el("fx-p fx-spark"); const k = rnd(0.7, 1.5); s.style.width = s.style.height = 9 * k + "px"; Object.assign(s.style, { left: (x / c.W) * 100 + "%", top: (y / c.H) * 100 + "%" }); c.spawn(c.front, s, 1400); });
  }
  function twinkle(c, layer, x, y, size, delay, cls = "fx-star") { const s = c.put(layer, c.el("fx-c " + cls), x, y, size); s.style.animationDelay = delay + "s"; return s; }

  const PRESETS = {
    /* 응원단장: 내지른 주먹 주변 속도선 + 충격 링 + 몸 들썩 + 꽃가루 */
    cheer(c) {
      const F = [73, 40];
      [-160, -130, -100, -70, -40, -15, 170].forEach((a, i) => {
        const s = c.put(c.front, c.el("fx-speed"), F[0], F[1], 22, null); s.style.height = "3px"; s.style.aspectRatio = "";
        s.style.setProperty("--a", a + "deg"); s.style.setProperty("--d0", rnd(10, 16) + "px"); s.style.setProperty("--dl", (i % 3) * 0.03 + "s");
      });
      c.put(c.front, c.el("fx-c fx-burst"), F[0], F[1], 34);
      twinkle(c, c.front, F[0] - 6, F[1] - 14, 12, 0.1); twinkle(c, c.front, F[0] + 14, F[1] - 6, 9, 0.5);
      const cols = ["#ffe066", "#ff6b8a", "#6be0ff", "#ffffff", "#9cff7a"];
      c.every(160, () => { const p = c.el("fx-p fx-conf"); p.style.background = pick(cols); p.style.left = rnd(0, 100) + "%"; p.style.top = "-4%"; p.style.setProperty("--t", rnd(2.4, 3.6) + "s"); p.style.setProperty("--dx", rnd(-40, 40) + "px"); p.style.setProperty("--dy", rnd(320, 420) + "px"); c.spawn(c.sky, p, 3700); });
    },
    /* 전하: 얼굴 뒤로 천천히 도는 황금 후광 + 은은하게 떠오르는 금빛 */
    king(c) {
      c.put(c.back, c.el("fx-c fx-halo"), 92, 108, 230);
      c.put(c.back, c.el("fx-c fx-rays"), 92, 108, 300);
      c.put(c.back, c.el("fx-c fx-rays r2"), 92, 108, 300);
      c.every(260, () => { const m = c.el("fx-p fx-mote"); const s = rnd(2, 4.5); m.style.width = m.style.height = s + "px"; m.style.left = rnd(5, 95) + "%"; m.style.top = rnd(55, 100) + "%"; m.style.setProperty("--t", rnd(3, 4.5) + "s"); m.style.setProperty("--dx", rnd(-20, 20) + "px"); m.style.setProperty("--dy", rnd(-120, -70) + "px"); c.spawn(c.sky, m, 4600); });
    },
    /* 캬~: 잔이 살짝 들렸다 놓임 + 기포 + 거품 + 커졌다 작아지는 홍조 + "캬~!" */
    kya(c) {
      [[12, 14, 22], [78, 10, 30], [60, 30, 16], [88, 48, 20], [20, 46, 14], [45, 8, 12]].forEach((p, i) => { const b = c.el("fx-p fx-bokeh"); Object.assign(b.style, { left: p[0] + "%", top: p[1] + "%", width: p[2] + "%", aspectRatio: "1", animationDelay: i * 0.9 + "s" }); c.sky.appendChild(b); });
      // 잔 부분만 떼어서 따로 움직임: 원래 그림에선 잔 영역을 가리고, 같은 그림을 잔 영역만 잘라 위에 얹음
      const X = 46, Y1 = 118, Y2 = 206, x = (X / c.W) * 100, y1 = (Y1 / c.H) * 100, y2 = (Y2 / c.H) * 100;
      c.img.style.clipPath = `polygon(0 0,100% 0,100% 100%,0 100%,0 ${y2}%,${x}% ${y2}%,${x}% ${y1}%,0 ${y1}%)`;
      const mug = c.el("fx-mug"); const mi = new Image(); mi.src = c.img.src; mi.alt = "";
      mi.style.clipPath = `inset(${y1}% ${100 - x}% ${100 - y2}% 0)`; mug.appendChild(mi);
      mug.style.transformOrigin = `${x}% ${(166 / c.H) * 100}%`;
      c.mover.insertBefore(mug, c.front);
      const beer = c.put(mug, c.el("fx-beer"), 5, 146, 35, 52);
      c.every(140, () => { const b = c.el("fx-p fx-bub"); const s = rnd(1.5, 3.5); b.style.width = b.style.height = s + "px"; b.style.left = rnd(8, 90) + "%"; b.style.bottom = "2%"; const T = rnd(1.4, 2.4); b.style.setProperty("--t", T + "s"); b.style.setProperty("--dx", rnd(-3, 3) + "px"); b.style.setProperty("--h", beer.offsetHeight * 0.95 + "px"); c.spawn(beer, b, T * 1000 + 50); });
      c.every(420, () => { const f = c.el("fx-p fx-froth"); const s = rnd(2, 4); f.style.width = f.style.height = s + "px"; f.style.left = (rnd(8, 38) / c.W) * 100 + "%"; f.style.top = (130 / c.H) * 100 + "%"; f.style.setProperty("--dx", rnd(-8, 8) + "px"); c.spawn(mug, f, 950); });
      twinkle(c, mug, 36, 132, 12, 0.35, "fx-glint");
      [[65, 126], [130, 126]].forEach((p) => { const b = c.put(c.front, c.el("fx-c fx-blush"), p[0], p[1], 34, 24); });
      const t = c.el("fx-c fx-kya"); t.textContent = "캬~!"; t.style.left = "72%"; t.style.top = "16%"; c.stage.appendChild(t); t.style.zIndex = 6;
      twinkle(c, c.front, 150, 150, 13, 0.9, "fx-glint");
    },
    /* 새해 복: 떠오르는 해 + 날아가는 까치 + 꾸벅 인사 + 인사말 */
    newyear(c) {
      const sun = c.el("fx-sunrise"); sun.innerHTML = '<div class="fx-c fx-sunrays" style="left:50%;top:50%;width:260%;aspect-ratio:1"></div><div class="fx-sun" style="position:absolute;inset:0"></div>'; c.sky.appendChild(sun);
      const g = c.el("fx-greet"); g.textContent = "새해 복 많이 받으세요"; c.sky.appendChild(g);
      ["m1", "m2"].forEach((k) => c.top.appendChild(c.el("fx-magpie " + k, MAGPIE)));
    },
    /* 황금: 몸 위로 지나가는 빛줄기 + 옮겨 다니는 하이라이트 + 몸 위 반짝이 */
    gold(c) {
      c.put(c.back, c.el("fx-c fx-goldglow"), c.W / 2, c.H * 0.55, c.W * 1.3);
      const mask = `url("${c.img.src}")`;
      ["fx-sheen", "fx-hot"].forEach((k) => { const s = c.el(k); s.style.webkitMaskImage = mask; s.style.maskImage = mask; c.mover.insertBefore(s, c.front); });
      c.every(170, () => { const [x, y] = c.body(); const s = c.el("fx-p fx-spark"); const k = rnd(0.5, 1.2); s.style.width = s.style.height = 9 * k + "px"; Object.assign(s.style, { left: (x / c.W) * 100 + "%", top: (y / c.H) * 100 + "%" }); c.spawn(c.front, s, 1400); });
    },
    /* 비눗방울: 둥실 떠다님 + 말랑하게 흔들림 + 막 위로 흐르는 무지갯빛 + 뒤에서 올라오는 작은 방울 */
    bubble(c) {
      c.put(c.front, c.el("fx-c fx-film"), 119, 113, 216);
      c.every(700, () => { const b = c.el("fx-p fx-bgbub"); const s = rnd(10, 26); b.style.width = b.style.height = s + "px"; b.style.left = rnd(0, 95) + "%"; b.style.top = "100%"; b.style.setProperty("--t", rnd(5, 8) + "s"); b.style.setProperty("--dx", rnd(-30, 30) + "px"); b.style.setProperty("--dy", rnd(-420, -320) + "px"); c.spawn(c.sky, b, 8200); });
    },
    hipster(c) {
      c.sky.innerHTML = '<div class="fx-beam" style="left:4%"></div><div class="fx-beam r"></div>';
      [[30, 202], [70, 202]].forEach((p) => c.put(c.front, c.el("fx-c fx-ring"), p[0], p[1], 22));
      [[88, 127], [131, 127]].forEach((p, i) => { const l = c.put(c.front, c.el("fx-c fx-lens", "<i></i>"), p[0], p[1], 34, 22); if (i) l.firstChild.style.animationDelay = ".12s"; });
      [[101, 172, 0], [127, 179, 0.6], [113, 190, 1.2]].forEach((p) => twinkle(c, c.front, p[0], p[1], 11, p[2]));
      const notes = ["♪", "♫", "♬", "♩"], cols = ["#ffd56a", "#ff8fc8", "#7fe3ff", "#c6ff8a"]; let side = 0;
      c.every(380, () => { const sp = side++ % 2 ? 70 : 30; const n = c.el("fx-p fx-note"); n.textContent = pick(notes); n.style.color = pick(cols); n.style.fontSize = rnd(14, 22) + "px"; n.style.setProperty("--dx1", rnd(-10, 10) + "px"); n.style.setProperty("--dx2", rnd(-40, 25) + "px"); n.style.setProperty("--r", rnd(-25, 25) + "deg"); n.style.left = (sp / c.W) * 100 + rnd(-4, 4) + "%"; n.style.top = (190 / c.H) * 100 + "%"; c.spawn(c.front, n, 2300); });
    },
    halloween(c) {
      c.sky.innerHTML = '<div class="fx-moon"></div><div class="fx-skydots" style="position:absolute;inset:0"></div>';
      const dots = c.sky.lastChild; for (let i = 0; i < 14; i++) { const s = document.createElement("i"); s.style.left = rnd(2, 98) + "%"; s.style.top = rnd(2, 45) + "%"; s.style.animationDelay = rnd(0, 2.4) + "s"; dots.appendChild(s); }
      c.put(c.front, c.el("fx-c fx-glow soft"), 168, 192, 110);
      c.put(c.front, c.el("fx-c fx-glow"), 168, 194, 46);
      [[47, 206], [60, 206], [198, 201]].forEach((p) => { const g = c.put(c.front, c.el("fx-c fx-glow soft"), p[0], p[1], 34); g.style.animationDelay = rnd(0, 1.5) + "s"; });
      twinkle(c, c.front, 155, 32, 14, 0);
      ["b1", "b2"].forEach((k) => c.top.appendChild(c.el("fx-bat " + k, BAT)));
      c.top.insertAdjacentHTML("beforeend", '<div class="fx-fog"></div><div class="fx-fog f2"></div>');
      const cc = ["#ff7ac0", "#ffd34d", "#9f7bff", "#7fe0a0", "#ff9a3c"];
      c.every(320, () => { const p = c.el("fx-p fx-candy"); const s = rnd(3, 6); p.style.width = p.style.height = s + "px"; p.style.background = pick(cc); p.style.left = (rnd(160, 182) / c.W) * 100 + "%"; p.style.top = (168 / c.H) * 100 + "%"; p.style.setProperty("--dx", rnd(-18, 18) + "px"); c.spawn(c.front, p, 1900); });
    },
    /* 드라큘라: 붉은 달 + 공중에 둥 떠 있음 + 송곳니 반짝 + 박쥐 + 보랏빛 안개 */
    dracula(c) {
      c.sky.innerHTML = '<div class="fx-moon blood"></div><div class="fx-skydots" style="position:absolute;inset:0"></div>';
      const dots = c.sky.lastChild; for (let i = 0; i < 10; i++) { const s = document.createElement("i"); s.style.left = rnd(2, 70) + "%"; s.style.top = rnd(2, 40) + "%"; s.style.animationDelay = rnd(0, 2.4) + "s"; dots.appendChild(s); }
      c.art.insertAdjacentHTML("afterbegin", '<div class="fx-shadow"></div>');
      twinkle(c, c.front, 110, 131, 10, 0.4, "fx-fang");
      ["b1", "b2"].forEach((k) => c.top.appendChild(c.el("fx-bat " + k, BAT)));
      c.top.insertAdjacentHTML("beforeend", '<div class="fx-fog" style="--fog:rgba(190,110,200,.6)"></div><div class="fx-fog f2" style="--fog:rgba(170,90,180,.55)"></div>');
    },
  };
  /* ── 나머지 전설용 공통 도구 ── */
  const R = (v) => (Array.isArray(v) ? rnd(v[0], v[1]) : v);
  // emit: ms마다 파티클 하나. px:true면 x,y가 원본 그림 좌표, 아니면 레이어 %
  function emit(c, layer, ms, o) {
    c.every(ms, () => {
      const e = c.el("fx-p fx-mv " + o.cls);
      const s = R(o.size);
      if (o.text) { e.textContent = pick(o.text); e.style.fontSize = s + "px"; }
      else { e.style.width = s + "px"; e.style.height = (o.h != null ? R(o.h) : s) + "px"; }
      let x, y; if (o.pts) { const p = pick(o.pts); x = p[0] + R(o.jit || 0) * (Math.random() < 0.5 ? -1 : 1); y = p[1]; } else { x = R(o.x); y = R(o.y); }
      if (o.px || o.pts) { x = (x / c.W) * 100; y = (y / c.H) * 100; }
      e.style.left = x + "%"; e.style.top = y + "%";
      const T = R(o.t || 3);
      e.style.setProperty("--t", T + "s");
      e.style.setProperty("--dx", R(o.dx || 0) + "px"); e.style.setProperty("--dy", R(o.dy || 0) + "px");
      e.style.setProperty("--rot", R(o.rot || 0) + "deg");
      if (o.s0 != null) e.style.setProperty("--s0", o.s0); if (o.s1 != null) e.style.setProperty("--s1", o.s1);
      if (o.op != null) e.style.setProperty("--o", o.op); if (o.ease) e.style.setProperty("--ease", o.ease);
      if (o.pc) e.style.setProperty("--pc", pick(o.pc));
      if (o.z) e.style.zIndex = o.z;
      c.spawn(layer, e, T * 1000 + 120);
    });
  }
  function shout(c, text, x, y, o = {}) {
    const t = c.el("fx-shout"); t.textContent = text; t.style.left = x + "%"; t.style.top = y + "%";
    for (const k of ["c", "sh", "gl", "t", "dl"]) if (o[k]) t.style.setProperty("--" + k, o[k]);
    c.stage.appendChild(t);
  }
  const SNOW = (c, ms, big) => emit(c, c.top, ms, { cls: "sh-snow", size: big ? [3, 7] : [2, 5], x: [0, 100], y: -4, dx: [-30, 30], dy: [340, 440], t: [5, 8] });
  const BFLY = (c1, c2) => `<svg viewBox="0 0 40 40"><g class="wl"><path d="M20 20 C10 4 0 8 4 18 C6 24 14 24 20 20Z" fill="${c1}"/><path d="M20 20 C30 4 40 8 36 18 C34 24 26 24 20 20Z" fill="${c1}"/><path d="M20 21 C12 26 8 34 14 34 C18 34 20 28 20 21Z" fill="${c2}"/><path d="M20 21 C28 26 32 34 26 34 C22 34 20 28 20 21Z" fill="${c2}"/></g><rect x="19" y="14" width="2" height="14" rx="1" fill="#3b2a2a"/></svg>`;

  Object.assign(PRESETS, {
    /* 돌쇠: 지게 지고 영차영차 걸음 + 땀방울 + 발밑 흙먼지 */
    dolsoe(c) {
      emit(c, c.front, 520, { cls: "sh-drop", size: [4, 6], h: [5, 8], pts: [[14, 96], [134, 92]], dx: [-25, 25], dy: [-10, 25], t: [0.9, 1.3] });
      emit(c, c.back, 480, { cls: "sh-smoke", size: [10, 16], pts: [[55, 214], [100, 214]], jit: [0, 6], dx: [-22, 22], dy: [-12, -4], s0: 0.4, s1: 1.7, t: [1, 1.4], pc: ["rgba(150,105,60,.6)"] });
      shout(c, "영차!", 76, 14, { c: "#fffaf0", sh: "#8a5a2b", gl: "rgba(255,220,150,.7)", t: "2s" });
    },
    /* 선비 이삭: 한지 배경에 붓글씨가 번졌다 사라짐 + 매화 꽃잎 + 책 반짝 */
    seonbi(c) {
      emit(c, c.sky, 1100, { cls: "sh-ink", text: ["學", "文", "詩", "書", "道", "風", "月", "雅"], size: [24, 44], x: [8, 92], y: [8, 70], dx: [-8, 8], dy: [-26, -12], t: [4.5, 5.5], s0: 0.85, s1: 1.1 });
      emit(c, c.top, 380, { cls: "sh-petal", size: [6, 9], x: [0, 100], y: -4, dx: [-50, 30], dy: [320, 400], rot: [200, 520], t: [4, 6], pc: ["#ffd1dc", "#ffffff", "#ffb3c6"] });
      twinkle(c, c.front, 125, 168, 12, 0.3); twinkle(c, c.front, 18, 150, 10, 1.1);
    },
    /* 도령: 부채 바람 + 바람에 날리는 꽃잎 + 살랑살랑 */
    doryeong(c) {
      emit(c, c.front, 300, { cls: "sh-swoosh", size: [24, 40], pts: [[70, 130], [80, 150], [72, 170]], jit: [0, 6], dx: [40, 70], dy: [-22, -6], t: [1, 1.3] });
      emit(c, c.top, 260, { cls: "sh-petal", size: [6, 9], x: -5, y: [25, 85], dx: [300, 420], dy: [-70, 20], rot: [300, 700], t: [2.6, 3.6], pc: ["#ffd1dc", "#ffffff", "#ffe08a"] });
    },
    /* 아씨: 꽃다발 주위 나비 두 마리 + 흩날리는 꽃잎 + 수줍은 홍조 */
    assi(c) {
      c.top.insertAdjacentHTML("beforeend", `<div class="fx-bfly f1">${BFLY("#ffb547", "#ff7aa8")}</div><div class="fx-bfly f2">${BFLY("#a98bff", "#7ad7ff")}</div>`);
      emit(c, c.front, 300, { cls: "sh-petal", size: [5, 8], x: [110, 170], y: [105, 158], px: true, dx: [-30, 30], dy: [30, 80], rot: [180, 480], t: [2.2, 3], pc: ["#ffc4d6", "#fff2a8", "#ffffff", "#ffd8b0"] });
      [[40, 124], [98, 124]].forEach((p) => c.put(c.front, c.el("fx-c fx-blush"), p[0], p[1], 28, 18));
    },
    /* 자유의 이삭: 횃불처럼 빛나는 볏단 + 뒤로 퍼지는 빛 + 떠오르는 낟알 */
    liberty(c) {
      c.put(c.back, c.el("fx-c fx-rays"), 34, 24, 260);
      c.put(c.front, c.el("fx-c fx-torch"), 34, 22, 90);
      emit(c, c.front, 150, { cls: "sh-grain", size: [3, 5], h: [4, 7], x: [8, 62], y: [6, 46], px: true, dx: [-25, 25], dy: [-70, -35], t: [1.6, 2.4], rot: [-90, 90] });
      twinkle(c, c.front, 20, 10, 12, 0); twinkle(c, c.front, 52, 30, 10, 0.8);
    },
    /* 충성!: 경례할 때마다 몸이 착 + "충성!" + 손끝 반짝 + 무대 조명 */
    army(c) {
      c.sky.innerHTML = '<div class="fx-beam" style="left:4%"></div><div class="fx-beam r" style="background:linear-gradient(to bottom,rgba(255,240,170,.25),rgba(255,240,170,0) 80%)"></div>';
      shout(c, "충성!", 74, 15, { c: "#ffffff", sh: "#2d361b", gl: "rgba(255,255,200,.7)", t: "2.6s" });
      twinkle(c, c.front, 18, 102, 13, 0.1);
    },
    /* 수박 한 통: 대야 물결 + 튀는 물방울 + "와삭!" + 와삭와삭 씹는 동작 */
    watermelon(c) {
      c.sky.insertAdjacentHTML("beforeend", '<div class="fx-sunglow" style="position:absolute;top:-6%;right:-8%;width:46%;aspect-ratio:1"></div>');
      [[30, 200, 0], [64, 204, 0.6], [98, 199, 1.2]].forEach((p) => { const r = c.put(c.front, c.el("fx-c fx-ripple"), p[0], p[1], 50); r.style.animationDelay = p[2] + "s"; });
      emit(c, c.front, 150, { cls: "sh-drop", size: [3, 5], x: [16, 116], y: [188, 198], px: true, dx: [-26, 26], dy: [-45, -18], t: [0.7, 1], s1: 0.6 });
      shout(c, "와삭!", 78, 18, { c: "#ffffff", sh: "#d23c4b", gl: "rgba(255,150,160,.7)", t: "2.4s" });
    },
    /* 트리 장식: 반짝이는 전구 + 꼭대기 별빛 + 눈 */
    xmas(c) {
      const cols = ["#ff5a5a", "#ffd54a", "#5ad1ff", "#9cff7a", "#ff9ae0"];
      for (let i = 0; i < 18; i++) {
        const t = Math.random(), y = 92 + t * 105, half = 6 + t * 46, x = 151 + rnd(-half, half) * 0.85;
        const b = c.put(c.front, c.el("fx-c fx-bulb"), x, y, 4.5);
        b.style.setProperty("--pc", pick(cols)); b.style.setProperty("--dl", rnd(0, 1.4) + "s"); b.style.setProperty("--t", rnd(1, 1.8) + "s");
      }
      c.put(c.back, c.el("fx-c fx-rays"), 149, 66, 120);
      c.put(c.front, c.el("fx-c fx-torch"), 149, 66, 46);
      SNOW(c, 150);
    },
    /* 영의정이삭: 부채를 촤악 펼친 바람 + 은행잎 + 점잖은 흔들림 */
    premier(c) {
      emit(c, c.front, 320, { cls: "sh-swoosh", size: [24, 40], pts: [[96, 140], [100, 158], [94, 172]], jit: [0, 5], dx: [45, 75], dy: [-20, -4], t: [1, 1.3] });
      emit(c, c.top, 420, { cls: "sh-leaf", size: [9, 13], x: [0, 100], y: -5, dx: [-40, 40], dy: [320, 400], rot: [180, 540], t: [4, 6], pc: ["#f4c430", "#e8a820", "#ffd65c"] });
      twinkle(c, c.front, 106, 186, 11, 0.4);
    },
    /* 히어로: 하늘을 가르는 바람줄기 + 지나가는 구름 + 주먹 반짝 */
    hero(c) {
      emit(c, c.sky, 90, { cls: "sh-streak", size: [30, 80], h: 3, x: [-10, 60], y: [4, 96], dx: [280, 360], dy: [0, 0], t: [0.6, 0.9], op: 0.8 });
      emit(c, c.sky, 1100, { cls: "sh-cloud", size: [34, 50], h: [12, 16], x: -15, y: [10, 85], dx: [380, 460], t: [2, 2.8] });
      twinkle(c, c.front, 56, 134, 14, 0.2);
    },
    /* 이삭버스터: 웅웅 진동 + 톱날 불꽃 + 배기 연기 + 조종석 반짝 */
    buster(c) {
      emit(c, c.front, 70, { cls: "sh-sparkline", size: [6, 11], pts: [[17, 124], [181, 116], [187, 150]], jit: [0, 4], dx: [-45, 45], dy: [-35, 30], rot: [-180, 180], t: [0.45, 0.65], s1: 0.4 });
      emit(c, c.front, 260, { cls: "sh-smoke", size: [12, 18], pts: [[228, 30]], dx: [-12, 12], dy: [-55, -35], s0: 0.5, s1: 2.1, t: [1.6, 2.1], pc: ["rgba(200,200,200,.7)", "rgba(170,170,170,.6)"] });
      twinkle(c, c.front, 106, 44, 13, 0.3);
    },
    /* 우주이삭: 별이 반짝이는 우주 + 별똥별 + 헬멧 반사광 + 무중력 둥실 */
    space(c) {
      c.sky.innerHTML = '<div class="fx-skydots" style="position:absolute;inset:0"></div><div class="fx-shoot"></div>';
      const dots = c.sky.firstChild; for (let i = 0; i < 34; i++) { const s = document.createElement("i"); s.style.left = rnd(1, 99) + "%"; s.style.top = rnd(1, 99) + "%"; const z = rnd(1, 3); s.style.width = s.style.height = z + "px"; s.style.animationDelay = rnd(0, 2.4) + "s"; dots.appendChild(s); }
      const l = c.put(c.front, c.el("fx-c fx-lens", "<i></i>"), 126, 72, 104, 104); l.firstChild.style.animationDuration = "4s";
      twinkle(c, c.front, 194, 48, 12, 0.2); twinkle(c, c.front, 34, 154, 11, 1);
    },
    /* 세배새싹: 꾸벅 + 떨어지는 세뱃돈 봉투와 엽전 + 인사말 */
    sebae(c) {
      const g = c.el("fx-greet"); g.textContent = "새해 복 많이 받으세요"; g.style.color = "#7a2a24"; g.style.textShadow = "0 1px 0 rgba(255,255,255,.6)"; c.sky.appendChild(g);
      emit(c, c.top, 520, { cls: "sh-env", size: [11, 14], h: [8, 10], x: [0, 100], y: -5, dx: [-30, 30], dy: [320, 400], rot: [-90, 90], t: [3.5, 5] });
      emit(c, c.top, 420, { cls: "sh-coin", size: [8, 11], x: [0, 100], y: -5, dx: [-20, 20], dy: [320, 400], rot: [180, 540], t: [3, 4.5] });
    },
    /* 산타새싹: 눈 + 자루에서 튀어나오는 선물 + 인사말 + 종소리 리듬 */
    santa(c) {
      const g = c.el("fx-greet"); g.textContent = "Merry Christmas"; c.sky.appendChild(g);
      SNOW(c, 140);
      emit(c, c.front, 650, { cls: "sh-gift", size: [8, 11], pts: [[30, 112]], jit: [0, 8], dx: [-30, 15], dy: [-70, -45], rot: [-60, 60], t: [1.5, 1.9], pc: ["#e64a5c", "#3fbf9b", "#5a8cff", "#ffb547"] });
      twinkle(c, c.front, 30, 132, 12, 0.5);
    },
    /* 눈사람새싹: 함박눈 + 입김 + 흔들흔들 */
    snowman(c) {
      SNOW(c, 110, true);
      emit(c, c.front, 1400, { cls: "sh-smoke", size: [12, 16], pts: [[112, 88]], dx: [22, 36], dy: [-8, 4], s0: 0.3, s1: 1.6, t: [1.3, 1.6], pc: ["rgba(255,255,255,.85)"] });
    },
  });

  Object.assign(PRESETS, {
    /* 불멍: 장작불만 떼어 일렁이게 + 불티 + 핫초코 김 + 랜턴 + 따뜻한 불빛 */
    campfire(c) {
      c.sky.innerHTML = '<div class="fx-skydots" style="position:absolute;inset:0"></div>';
      const dots = c.sky.firstChild; for (let i = 0; i < 16; i++) { const s = document.createElement("i"); s.style.left = rnd(2, 98) + "%"; s.style.top = rnd(2, 40) + "%"; s.style.animationDelay = rnd(0, 2.4) + "s"; dots.appendChild(s); }
      const X1 = 140, X2 = 182, Y1 = 156, Y2 = 197, W = c.W, H = c.H;
      const x1 = (X1 / W) * 100, x2 = (X2 / W) * 100, y1 = (Y1 / H) * 100, y2 = (Y2 / H) * 100;
      c.img.style.clipPath = `polygon(evenodd,0 0,100% 0,100% 100%,0 100%,0 0,${x1}% 0,${x1}% ${y2}%,${x2}% ${y2}%,${x2}% ${y1}%,${x1}% ${y1}%,${x1}% 0)`;
      const fp = c.el("fx-firepiece"); const fi = new Image(); fi.src = c.img.src; fi.alt = "";
      fi.style.clipPath = `inset(${y1}% ${100 - x2}% ${100 - y2}% ${x1}%)`; fp.appendChild(fi);
      fp.style.transformOrigin = `${((X1 + X2) / 2 / W) * 100}% ${y2}%`;
      c.mover.insertBefore(fp, c.front);
      c.put(c.back, c.el("fx-c fx-glow soft"), 160, 182, 150);
      c.put(c.front, c.el("fx-c fx-glow"), 160, 184, 44);
      const lg = c.put(c.front, c.el("fx-c fx-glow soft"), 200, 180, 40); lg.style.animationDelay = ".7s";
      c.mover.insertBefore(c.el("fx-warm"), c.front);
      emit(c, c.front, 110, { cls: "sh-ember", size: [2, 3.5], pts: [[160, 166]], jit: [0, 10], dx: [-22, 22], dy: [-85, -45], t: [1.2, 1.9], s1: 0.4 });
      emit(c, c.front, 650, { cls: "fx-steam", size: [8, 12], pts: [[121, 140]], jit: [0, 3], dx: [-8, 8], dy: [-38, -26], s0: 0.4, s1: 1.6, t: [1.8, 2.2], op: 0.8 });
    },
    /* 풍선 둥실: 풍선에 매달려 그네처럼 흔들 + 흘러가는 구름 + 풍선 반짝 */
    balloon(c) {
      emit(c, c.sky, 1600, { cls: "sh-cloud", size: [36, 54], h: [12, 16], x: 105, y: [8, 80], dx: [-460, -380], t: [6, 8], op: 0.9 });
      [[14, 40, 0], [52, 12, 0.7], [76, 50, 1.4]].forEach((p) => twinkle(c, c.front, p[0], p[1], 10, p[2], "fx-glint"));
    },
  });
  /* ── 일반 도감: 설정(parts)만으로 효과를 조립 ── */
  const MOTION = { bob: "mvBob 1.8s ease-in-out", sway: "mvSway 3.2s ease-in-out", bounce: "mvBounce 1.2s ease-in-out", run: "mvRun .38s ease-in-out",
    glide: "mvGlide 2.4s ease-in-out", hop: "mvHop 2s ease-out", tremble: "mvTremble .18s linear", nod: "mvNod 3s ease-in-out", groove: "mvGroove 1s ease-in-out",
    rock: "mvRock 2.6s ease-in-out", float: "mvFloat 4.5s ease-in-out", squish: "mvSquish 1.6s ease-in-out", stomp: "mvStomp 1s ease-in-out",
    dive: "mvDive 1.6s ease-in-out", breathe: "mvBreathe 3s ease-in-out", trudge: "fxTrudge 1s ease-in-out", rumble: "fxRumble .16s steps(2)" };
  const PIECE = { spin: "pcSpin 1.4s linear", wiggle: "pcWiggle 1.6s ease-in-out", pulse: "pcPulse .9s ease-in-out", shake: "pcShake .35s linear",
    bob: "pcBob 1.4s ease-in-out", stretch: "pcStretch 1.4s ease-in-out", wave: "pcWave 1s ease-in-out", flicker: "fxFire .5s ease-in-out alternate",
    bounce: "pcBounce 1.1s", tilt: "pcTilt 2.2s ease-in-out" };
  const SVG = {
    drone: '<svg viewBox="0 0 80 40"><rect x="28" y="16" width="24" height="10" rx="4" fill="#e9eef5"/><rect x="10" y="12" width="60" height="3" rx="1.5" fill="#5b6b80"/><ellipse class="rot" cx="12" cy="10" rx="10" ry="2" fill="#9fb3c8"/><ellipse class="rot" cx="68" cy="10" rx="10" ry="2" fill="#9fb3c8"/><circle cx="40" cy="27" r="3" fill="#3fbf9b"/></svg>',
    plane: '<svg viewBox="0 0 100 50"><path d="M8 26 L70 22 C82 21 92 23 94 26 C92 29 82 31 70 30 L8 27Z" fill="#fff"/><path d="M40 24 L56 6 L62 6 L54 24Z M40 28 L56 46 L62 46 L54 28Z M10 26 L4 14 L10 14 L18 25Z" fill="#e8eef7"/></svg>',
    gull: '<svg viewBox="0 0 60 30"><g class="w"><path d="M2 14 Q15 2 30 16 Q45 2 58 14" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></g></svg>',
    crow: '<svg viewBox="0 0 60 30"><g class="w"><path d="M2 14 Q15 2 30 16 Q45 2 58 14" stroke="#2a2a33" stroke-width="5" fill="none" stroke-linecap="round"/></g></svg>',
    dfly: '<svg viewBox="0 0 70 36"><g class="w"><ellipse cx="30" cy="10" rx="13" ry="4" fill="rgba(220,240,255,.75)" stroke="#9cc3dd" stroke-width=".8" transform="rotate(-12 30 10)"/><ellipse cx="44" cy="10" rx="13" ry="4" fill="rgba(220,240,255,.75)" stroke="#9cc3dd" stroke-width=".8" transform="rotate(12 44 10)"/></g><g class="w" style="animation-delay:.08s"><ellipse cx="30" cy="20" rx="11" ry="3.5" fill="rgba(220,240,255,.7)" stroke="#9cc3dd" stroke-width=".8" transform="rotate(10 30 20)"/><ellipse cx="44" cy="20" rx="11" ry="3.5" fill="rgba(220,240,255,.7)" stroke="#9cc3dd" stroke-width=".8" transform="rotate(-10 44 20)"/></g><rect x="6" y="14" width="34" height="3" rx="1.5" fill="#d9502e"/><circle cx="40" cy="15.5" r="3.2" fill="#c0392b"/><circle cx="44" cy="15.5" r="3" fill="#8a2a1e"/></svg>',
    ball: '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#fff" stroke="#c33" stroke-width="1"/><path d="M5 4 Q8 10 5 16 M15 4 Q12 10 15 16" stroke="#c33" stroke-width="1" fill="none"/></svg>',
  };
  const BG = {
    morning: "linear-gradient(to bottom,#ffe2b0 0%,#ffd0a8 45%,#bfe3ff 100%)", sky: "linear-gradient(to bottom,#7cc4ff 0%,#cdeaff 60%,#f4fbff 100%)",
    field: "linear-gradient(to bottom,#cfeeff 0%,#e9f7da 58%,#b5dd86 100%)", gold: "linear-gradient(to bottom,#fff0c2 0%,#f7d27a 60%,#d9a441 100%)",
    night: "linear-gradient(to bottom,#151c3a 0%,#26335f 60%,#43548a 100%)", stage: "radial-gradient(120% 80% at 50% 110%,#5b2b8a 0%,#2a1747 55%,#170d28 100%)",
    office: "linear-gradient(to bottom,#e3eaf4 0%,#cbd8ea 100%)", cozy: "radial-gradient(110% 90% at 50% 30%,#fff3e0 0%,#f7d9b8 60%,#e7b98d 100%)",
    pink: "radial-gradient(110% 90% at 50% 30%,#ffeef4 0%,#f9c9da 60%,#e79ab9 100%)", rainy: "linear-gradient(to bottom,#7f97b4 0%,#aebfd4 60%,#dbe5f0 100%)",
    lab: "radial-gradient(110% 90% at 50% 30%,#effcf6 0%,#c9efdf 60%,#94d6bd 100%)", space: "radial-gradient(110% 90% at 50% 40%,#2b2264 0%,#120f34 60%,#05040f 100%)",
    autumn: "linear-gradient(to bottom,#ffe6bf 0%,#ffc690 60%,#e8915a 100%)", winter: "linear-gradient(to bottom,#7fa6d6 0%,#b8d1ef 60%,#e9f2ff 100%)",
    sea: "linear-gradient(to bottom,#8fd3ff 0%,#d4f1ff 60%,#9fd5f2 100%)", mint: "radial-gradient(110% 90% at 50% 30%,#f2fff9 0%,#d3f5e7 60%,#a8e6cf 100%)",
    spooky: "linear-gradient(to bottom,#241733 0%,#43294f 60%,#633a63 100%)", angry: "radial-gradient(110% 90% at 50% 30%,#ffe6df 0%,#ffb9ab 60%,#ef7d6b 100%)",
    camp: "radial-gradient(90% 70% at 72% 82%,#6b3a1e 0%,#2a2340 55%,#141428 100%)", sunset: "linear-gradient(to bottom,#ffb57a 0%,#ff8f8f 50%,#8a6fc4 100%)",
    lemon: "radial-gradient(110% 90% at 50% 30%,#fffbe6 0%,#fff0b3 60%,#f6d36b 100%)", lilac: "radial-gradient(110% 90% at 50% 30%,#f6f0ff 0%,#dccbff 60%,#b49ae8 100%)",
    pasture: "linear-gradient(to bottom,#bfe7ff 0%,#e6f7d9 55%,#9fd27a 100%)", kitchen: "radial-gradient(110% 90% at 50% 30%,#fff6ea 0%,#ffe0c2 60%,#f2b98a 100%)",
    stadium: "radial-gradient(110% 80% at 50% 0%,#3a5c9e 0%,#1d2f5a 60%,#0f1a36 100%)", moon: "radial-gradient(110% 90% at 50% 30%,#2c3566 0%,#1b2147 60%,#10142e 100%)",
  };
  function gen(c) {
    const cfg = c.cfg, W = c.W, H = c.H;
    if (cfg.bgc) c.stage.style.background = BG[cfg.bgc] || cfg.bgc;
    if (cfg.baseSrc) c.img.src = cfg.baseSrc;
    if (cfg.motion) { c.mover.style.animation = MOTION[cfg.motion] + " infinite"; if (cfg.origin) c.mover.style.transformOrigin = cfg.origin; }
    const P = (x, y) => [(x / W) * 100, (y / H) * 100];
    const holes = [];
    const polyRect = (r) => { const [a, b] = P(r[0], r[1]), [cc, d] = P(r[2], r[3]); return [[a, b], [cc, b], [cc, d], [a, d]]; };
    const polyCirc = (q) => { const pts = []; for (let i = 0; i < 24; i++) { const t = (i / 24) * Math.PI * 2; pts.push(P(q[0] + Math.cos(t) * q[2], q[1] + Math.sin(t) * q[2])); } return pts; };
    const S = (pts) => pts.map((p) => `${p[0].toFixed(2)}% ${p[1].toFixed(2)}%`).join(",");
    (cfg.parts || []).forEach((p) => {
      const L = c[p.layer || "front"];
      switch (p.k) {
        case "cut": {
          const pc = c.el("fx-piece"); const im = new Image(); im.alt = "";
          if (p.src) { im.src = p.src; } else { const pts = p.circle ? polyCirc(p.circle) : polyRect(p.rect); holes.push(pts); im.src = c.img.src; im.style.clipPath = `polygon(${S(pts)})`; }
          pc.appendChild(im);
          const o = p.origin || (p.circle ? [p.circle[0], p.circle[1]] : [(p.rect[0] + p.rect[2]) / 2, p.rect[3]]);
          pc.style.transformOrigin = `${(o[0] / W) * 100}% ${(o[1] / H) * 100}%`;
          pc.style.animation = PIECE[p.anim] + " infinite" + (p.delay ? " " + p.delay + "s" : "");
          if (p.dur) pc.style.animationDuration = p.dur + "s";
          if (p.rev) pc.style.animationDirection = "reverse";
          c.mover.insertBefore(pc, c.front); break;
        }
        case "emit": emit(c, L, p.ms, p); break;
        case "tw": twinkle(c, L, p.x, p.y, p.s || 11, p.d || 0, p.cls || "fx-star"); break;
        case "glow": { const g = c.put(L, c.el("fx-c fx-glow" + (p.soft ? " soft" : "")), p.x, p.y, p.s); if (p.d) g.style.animationDelay = p.d + "s"; if (p.color) { g.style.background = `radial-gradient(circle,${p.color} 0%,transparent 70%)`; g.style.animation = "fxFlicker2 2.2s ease-in-out infinite"; } break; }
        case "ring": { const r = c.put(L, c.el("fx-c fx-ring2"), p.x, p.y, p.s); if (p.pc) r.style.setProperty("--pc", p.pc); if (p.dur) r.style.setProperty("--t", p.dur + "s"); if (p.d) r.style.setProperty("--dl", p.d + "s"); break; }
        case "lens": { const l = c.put(L, c.el("fx-c fx-lens", "<i></i>"), p.x, p.y, p.w, p.h || p.w); if (p.d) l.firstChild.style.animationDelay = p.d + "s"; break; }
        case "shout": { shout(c, p.text, p.x, p.y, { c: p.c, sh: p.sh, gl: p.gl, t: p.tm }); if (p.fs) c.stage.lastChild.style.fontSize = p.fs; break; }
        case "snow": SNOW(c, p.ms || 160, p.big); break;
        case "rain": emit(c, c.top, p.ms || 50, { cls: "sh-rain", size: 1.5, h: [10, 16], x: [-5, 105], y: -5, dx: [-30, -20], dy: [380, 440], t: [0.6, 0.9] }); break;
        case "stars": { const d = c.el("fx-skydots"); d.style.cssText = "position:absolute;inset:0"; for (let i = 0; i < (p.n || 18); i++) { const s = document.createElement("i"); s.style.left = rnd(2, 98) + "%"; s.style.top = rnd(2, p.h || 45) + "%"; s.style.animationDelay = rnd(0, 2.4) + "s"; d.appendChild(s); } c.sky.appendChild(d); break; }
        case "moon": c.sky.insertAdjacentHTML("beforeend", `<div class="fx-moon" style="${p.style || ""}"></div>`); break;
        case "sun": c.sky.insertAdjacentHTML("beforeend", `<div class="fx-sunrise" style="${p.style || "top:6%;left:auto;right:6%;width:24%"}"><div class="fx-c fx-sunrays" style="left:50%;top:50%;width:260%;aspect-ratio:1"></div><div class="fx-sun" style="position:absolute;inset:0"></div></div>`); break;
        case "clouds": emit(c, c.sky, p.ms || 1500, { cls: "sh-cloud", size: [34, 52], h: [12, 16], x: p.rtl ? -15 : 105, y: [6, p.ymax || 55], dx: p.rtl ? [380, 460] : [-460, -380], t: [p.tmin || 6, (p.tmin || 6) + 2], op: 0.9 }); break;
        case "beams": c.sky.insertAdjacentHTML("beforeend", '<div class="fx-beam" style="left:4%"></div><div class="fx-beam r"></div>'); break;
        case "confetti": emit(c, c.sky, p.ms || 170, { cls: "fx-conf", size: 6, h: 9, x: [0, 100], y: -4, dx: [-40, 40], dy: [320, 420], rot: [300, 700], t: [2.6, 3.6], pc: ["#ffe066", "#ff6b8a", "#6be0ff", "#ffffff", "#9cff7a"] }); break;
        case "speed": emit(c, c.sky, p.ms || 110, { cls: "sh-streak", size: [30, 70], h: 3, x: p.rtl ? [-10, 50] : [50, 110], y: [5, 95], dx: p.rtl ? [280, 340] : [-340, -280], t: [0.6, 0.9], op: 0.7 }); break;
        case "waves": c.top.insertAdjacentHTML("beforeend", '<div class="fx-waves"></div><div class="fx-waves w2"></div>'); break;
        case "flyer": { const f = c.el("fx-flyer", SVG[p.svg]); f.style.width = (p.w || 18) + "%"; f.style.top = (p.y || 14) + "%"; f.style.animation = p.loop ? "droneLoop 7s ease-in-out infinite" : `${p.rtl ? "flyLR" : "flyRL"} ${p.dur || 8}s linear infinite ${p.d || 0}s, flyBob 1.4s ease-in-out infinite`; if (!p.loop) f.style.left = "110%"; (p.front ? c.top : c.sky).appendChild(f); break; }
        case "bfly": c.top.insertAdjacentHTML("beforeend", `<div class="fx-bfly f1">${BFLY("#ffb547", "#ff7aa8")}</div>` + (p.two ? `<div class="fx-bfly f2">${BFLY("#a98bff", "#7ad7ff")}</div>` : "")); break;
        case "bulbs": { const cols = ["#ff5a5a", "#ffd54a", "#5ad1ff", "#9cff7a", "#ff9ae0"]; p.pts.forEach((q) => { const b = c.put(c.front, c.el("fx-c fx-bulb"), q[0], q[1], p.s || 7); b.style.setProperty("--pc", pick(cols)); b.style.setProperty("--dl", rnd(0, 1.4) + "s"); b.style.setProperty("--t", rnd(0.9, 1.6) + "s"); }); break; }
        case "html": c[p.layer || "sky"].insertAdjacentHTML("beforeend", p.html); break;
      }
    });
    if (holes.length) {
      const outer = [[0, 0], [100, 0], [100, 100], [0, 100], [0, 0]];
      let path = outer.map((q) => `${q[0]}% ${q[1]}%`);
      holes.forEach((h) => { path.push(...h.map((q) => `${q[0].toFixed(2)}% ${q[1].toFixed(2)}%`), `${h[0][0].toFixed(2)}% ${h[0][1].toFixed(2)}%`, "0% 0%"); });
      c.img.style.clipPath = `polygon(evenodd,${path.join(",")})`;
    }
  }
  PRESETS.gen = gen;
  PRESETS.gsprout = PRESETS.gold; PRESETS.golden = PRESETS.gold;
  return { mount, PRESETS };
})();

const DEX_FX = (() => {

const Z = (x, y, ms = 900) => ({ k: "emit", ms, cls: "sh-txt", text: ["z", "Z", "z"], size: [12, 20], pts: [[x, y]], dx: [10, 30], dy: [-60, -40], t: [2, 2.6], pc: ["#6b7bb0"] });
const NOTES = (pts, ms = 420) => ({ k: "emit", ms, cls: "sh-txt fx-note", text: ["♪", "♫", "♬"], size: [14, 20], pts, jit: [0, 6], dx: [-25, 25], dy: [-70, -45], rot: [-25, 25], t: [1.8, 2.3], pc: ["#ffd56a", "#ff8fc8", "#7fe3ff", "#9be38a"] });
const STEAM = (pts, ms = 380, big) => ({ k: "emit", ms, cls: "fx-steam", size: big ? [14, 22] : [8, 13], pts, jit: [0, 6], dx: [-10, 10], dy: [-50, -30], s0: 0.4, s1: 1.8, t: [1.8, 2.4], op: 0.75 });
const SWEAT = (pts, ms = 600) => ({ k: "emit", ms, cls: "sh-drop", size: [4, 6], h: [5, 8], pts, dx: [-20, 20], dy: [-6, 22], t: [0.9, 1.2] });
const HEARTS = (pts, ms = 520) => ({ k: "emit", ms, cls: "sh-heart", size: [9, 14], pts, jit: [0, 10], dx: [-20, 20], dy: [-70, -45], s0: 0.5, s1: 1.1, t: [1.8, 2.4], pc: ["#ff5f86", "#ff8fb0", "#ff3d6e"] });
const SPARK = (x1, x2, y1, y2, ms = 300) => ({ k: "emit", ms, cls: "fx-spark", size: [6, 10], x: [x1, x2], y: [y1, y2], px: true, t: [1.2, 1.4], s0: 0.2 });
const WORDS = (words, x, y, ms = 1300, pc = ["#3c4a6e"]) => ({ k: "emit", ms, cls: "sh-txt", text: words, size: [13, 17], pts: [[x, y]], jit: [0, 14], dx: [-20, 20], dy: [-50, -30], t: [2.2, 2.6], pc });
const DUST = (pts, ms = 420, col = "rgba(150,110,70,.55)", back) => ({ k: "emit", ms, cls: "sh-smoke", size: [10, 16], pts, jit: [0, 6], dx: back ? [8, 30] : [-20, 20], dy: [-12, -4], s0: 0.4, s1: 1.7, t: [1, 1.4], pc: [col] });

const NORMAL = {
  /* ── 이삭이 ── */
  i01: { bgc: "morning", motion: "sway", effect: "아침 햇살 · 인사 말풍선 · 흔들흔들", parts: [{ k: "sun" }, { k: "shout", text: "좋은 아침!", x: 30, y: 14, c: "#fff", sh: "#e07a2c", tm: "3s" }, { k: "tw", x: 22, y: 148, s: 11 }] },
  i02: { bgc: "sky", motion: "run", effect: "달리는 동작 · 바람줄기 · 발밑 먼지", parts: [{ k: "speed", rtl: true }, DUST([[60, 210], [100, 212]], 260, "rgba(160,140,120,.5)", true)] },
  i03: { bgc: "rainy", motion: "nod", effect: "꾸벅 조는 동작 · Zzz", parts: [Z(118, 70)] },
  i04: { bgc: "field", motion: "trudge", effect: "밭 가는 동작 · 흙먼지 · 날리는 풀잎", parts: [DUST([[10, 200], [22, 204], [34, 206], [50, 212]], 110, "rgba(140,95,55,.65)"), { k: "emit", ms: 160, cls: "sh-leafg", size: [6, 10], x: [0, 70], y: [190, 212], px: true, dx: [-30, 30], dy: [-45, -20], rot: [-120, 120], t: [1.2, 1.7] }, { k: "emit", ms: 140, cls: "sh-dot", size: [3, 5], x: [0, 50], y: [198, 210], px: true, dx: [-25, 25], dy: [-35, -15], t: [0.7, 1], pc: ["#7a5232", "#9c6a40"] }] },
  i05: { bgc: "lilac", motion: "sway", effect: "머리 위로 떠오르는 물음표", parts: [WORDS(["?", "?", "…"], 110, 50, 900, ["#6a55c9", "#8a7ae0"])] },
  i06: { bgc: "kitchen", motion: "breathe", effect: "머릿속을 지나가는 점심 메뉴", parts: [WORDS(["돈가스?", "순대국밥?", "파스타?"], 70, 40, 1400, ["#c24d2c", "#7a4a1c"])] },
  i07: { bgc: "sunset", motion: "glide", effect: "인라인 질주 · 바람줄기 · 노을", parts: [{ k: "speed", rtl: true }, { k: "tw", x: 30, y: 210, s: 9 }, { k: "tw", x: 128, y: 190, s: 9, d: 0.6 }] },
  i08: { bgc: "office", motion: "sway", effect: "돋보기 반사광 · 찾아낸 오타", parts: [{ k: "lens", x: 103, y: 109, w: 34 }, WORDS(["오타!", "ㅇㅌ", "띄어쓰기"], 120, 90, 1400, ["#d64545"])] },
  i09: { bgc: "lemon", motion: "tremble", effect: "확성기 음파 · \"공지!\"", parts: [{ k: "ring", x: 140, y: 140, s: 30, pc: "rgba(230,80,60,.8)", dur: 0.9 }, { k: "ring", x: 140, y: 140, s: 30, pc: "rgba(230,80,60,.8)", dur: 0.9, d: 0.45 }, WORDS(["공지!", "읽어라!", "필독!"], 130, 120, 1100, ["#d64545", "#e07a2c"])] },
  i10: { bgc: "gold", motion: "bounce", effect: "통통 뛰는 동작 · 바구니 반짝 · 풍년", parts: [SPARK(30, 100, 135, 175, 260)] },
  i11: { name: "칼군무", bgc: "stage", motion: "groove", effect: "무대 조명 · 선글라스 반사광 · 꽃가루", parts: [{ k: "beams" }, { k: "lens", x: 46, y: 106, w: 30, h: 20 }, { k: "lens", x: 90, y: 106, w: 30, h: 20, d: 0.12 }, { k: "confetti", ms: 220 }] },
  i12: { name: "행사장인", bgc: "stage", motion: "sway", effect: "무대 조명 · 반짝이 정장 · 음표", parts: [{ k: "beams" }, SPARK(20, 100, 140, 185, 180), NOTES([[30, 150]], 600), { k: "lens", x: 60, y: 103, w: 60, h: 20 }] },
  i13: { name: "락앤롤", bgc: "stage", motion: "groove", effect: "베이스 울림 · 음표 · \"Rock & Roll!\"", parts: [{ k: "ring", x: 50, y: 160, s: 40, pc: "rgba(255,214,120,.8)", dur: 0.6 }, NOTES([[60, 150], [130, 150]], 380), { k: "shout", text: "Rock & Roll!", x: 50, y: 12, c: "#fff", sh: "#d23c6e", gl: "rgba(255,120,200,.7)", tm: "2.4s", fs: "clamp(17px,4.6vw,24px)" }] },
  i14: { name: "내가 메날두야말", bgc: "pasture", motion: "run", effect: "굴러가는 공 · 바람줄기 · 잔디", parts: [{ k: "cut", circle: [19, 201, 18], anim: "spin", dur: 0.8, rev: true }, { k: "speed", rtl: true }, { k: "emit", ms: 300, cls: "sh-leafg", size: [4, 7], pts: [[25, 212]], dx: [10, 35], dy: [-20, -8], rot: [-90, 90], t: [0.8, 1.1] }] },
  i15: { bgc: "stadium", motion: "sway", effect: "경기장 조명 · 카메라 플래시 · \"홈런!\"", parts: [{ k: "beams" }, { k: "emit", ms: 500, cls: "fx-spark", size: [10, 16], x: [0, 100], y: [5, 50], dx: 0, dy: 0, t: 0.5, layer: "sky" }, { k: "shout", text: "홈런!", x: 72, y: 15, c: "#fff", sh: "#d23c2b", tm: "2.8s" }] },
  i16: { bgc: "sky", motion: "hop", effect: "보드 위 점프 · 바람줄기", parts: [{ k: "speed", ms: 160, rtl: true }, DUST([[60, 214], [120, 214]], 700, "rgba(200,200,200,.6)", true)] },
  i17: { bgc: "sky", motion: "trudge", effect: "산바람 · 지나가는 구름 · \"야호!\"", parts: [{ k: "clouds", ms: 1300 }, { k: "shout", text: "야호!", x: 74, y: 14, c: "#fff", sh: "#3c7a3a", tm: "3.4s" }] },
  i18: { bgc: "lab", motion: "breathe", effect: "플라스크 거품 · 초록빛", parts: [{ k: "glow", x: 20, y: 145, s: 50, color: "rgba(120,255,140,.55)" }, { k: "emit", ms: 260, cls: "sh-dot", size: [3, 6], pts: [[20, 128]], jit: [0, 6], dx: [-8, 8], dy: [-55, -30], s0: 0.6, s1: 1.2, t: [1.2, 1.7], pc: ["rgba(170,255,170,.9)", "rgba(255,255,255,.9)"] }] },
  i19: { name: "AI", bgc: "mint", motion: "breathe", effect: "화면 빛 · 떠오르는 AI 이름들", parts: [{ k: "glow", x: 32, y: 145, s: 80, color: "rgba(140,220,255,.6)" }, WORDS(["클로드?", "챗지피티?", "제미나이?"], 40, 120, 1200, ["#2f9c78", "#2457E6", "#7a55c9"])] },
  i20: { bgc: "field", motion: "breathe", baseSrc: IMG.fx_i20_base, effect: "공중에 뜬 드론 · 리모컨 불빛", parts: [{ k: "cut", src: IMG.fx_i20_p0, origin: [136, 30], anim: "bob", dur: 1.2 }, { k: "glow", x: 60, y: 168, s: 26, color: "rgba(120,255,200,.7)" }, { k: "clouds", ms: 2200 }] },
  i21: { bgc: "night", motion: "nod", effect: "꾸벅 조는 동작 · 커피 김 · 흩날리는 서류", parts: [{ k: "stars", n: 12, h: 30 }, STEAM([[76, 140]], 700), { k: "emit", ms: 1200, cls: "sh-dot", size: [10, 13], h: [13, 16], pts: [[150, 140]], dx: [10, 40], dy: [-40, -20], rot: [-60, 60], t: [1.6, 2], pc: ["#ffffff"] }, Z(120, 70, 1400)] },
  i22: { bgc: "pasture", motion: "sway", effect: "\"음메~\" · 나비 · 목장", parts: [{ k: "shout", text: "음메~", x: 74, y: 14, c: "#fff", sh: "#3a3a3a", tm: "3.2s" }, { k: "bfly" }] },
  i23: { bgc: "gold", motion: "bounce", effect: "\"1++\" · 금빛 반짝", parts: [{ k: "shout", text: "1++", x: 76, y: 15, c: "#fff6d0", sh: "#a0701e", tm: "2.6s" }, SPARK(10, 150, 40, 200, 260)] },
  i24: { bgc: "field", motion: "sway", effect: "사과 바구니 반짝 · 사과꽃잎", parts: [SPARK(50, 105, 150, 195, 300), { k: "emit", layer: "top", ms: 450, cls: "sh-petal", size: [6, 8], x: [0, 100], y: -4, dx: [-40, 30], dy: [320, 400], rot: [200, 520], t: [4, 6], pc: ["#ffffff", "#ffe1ea"] }] },
  i25: { bgc: "autumn", motion: "sway", effect: "배 바구니 반짝 · 떨어지는 잎", parts: [SPARK(50, 105, 160, 205, 300), { k: "emit", layer: "top", ms: 600, cls: "sh-leafg", size: [8, 11], x: [0, 100], y: -4, dx: [-40, 30], dy: [320, 400], rot: [200, 520], t: [4, 6], pc: ["#d7b04a", "#a9c25a"] }] },
  i26: { bgc: "winter", motion: "sway", effect: "귤 장바구니 반짝 · 눈", parts: [SPARK(50, 105, 160, 205, 300), { k: "snow", ms: 180 }] },
  i27: { bgc: "gold", motion: "sway", effect: "황금 들판 · 날아다니는 잠자리 · 지푸라기", parts: [{ k: "flyer", svg: "dfly", w: 14, y: 12, dur: 7, rtl: true }, { k: "flyer", svg: "dfly", w: 10, y: 24, dur: 9, d: 3, rtl: true }, { k: "emit", ms: 500, cls: "sh-dot", size: [7, 10], h: 2, x: [160, 240], y: [60, 140], px: true, dx: [-40, -10], dy: [-10, 20], rot: [-180, 180], t: [1.6, 2.2], pc: ["#d9b25a"] }] },
  i28: { bgc: "pink", motion: "breathe", effect: "버블티 펄 · 릴스·숏폼·넷플릭스", parts: [{ k: "emit", ms: 500, cls: "sh-dot", size: [6, 12], x: [0, 100], y: 105, dx: [-20, 20], dy: [-380, -300], t: [5, 7], op: 0.6, pc: ["rgba(255,255,255,.8)"], layer: "sky" }, WORDS(["릴스", "숏폼", "넷플릭스"], 170, 120, 1300, ["#c25a8a", "#d23c4b", "#7a55c9"])] },
  i29: { bgc: "cozy", motion: "breathe", effect: "책에서 튀어나오는 글자와 종잇조각 · 안경 반사광", parts: [{ k: "emit", ms: 260, cls: "sh-txt", text: ["가", "나", "다", "라", "A", "B"], size: [12, 17], x: [15, 95], y: [150, 162], px: true, dx: [-40, 40], dy: [-75, -45], rot: [-30, 30], t: [1.6, 2.1], pc: ["#1e1e24"], z: 6 }, { k: "emit", ms: 340, cls: "sh-dot", size: [7, 10], h: [9, 12], x: [15, 95], y: [150, 162], px: true, dx: [-45, 45], dy: [-70, -40], rot: [-180, 180], t: [1.6, 2.1], pc: ["#ffffff"], z: 6 }, { k: "lens", x: 47, y: 116, w: 28 }, { k: "lens", x: 88, y: 116, w: 28, d: 0.12 }] },
  i30: { bgc: "sea", motion: "glide", effect: "날아가는 비행기 · \"남은 사람이 알아서 일하기!\"", parts: [{ k: "flyer", svg: "plane", w: 26, y: 8, dur: 9, rtl: true }, { k: "shout", text: "남은 사람이 알아서 일하기!", x: 50, y: 22, c: "#fff", sh: "#2a6fb3", tm: "3.4s", fs: "clamp(11px,3vw,16px)" }] },
  i31: { bgc: "field", motion: "trudge", effect: "강아지 하트 · 산책 · 나비", parts: [HEARTS([[25, 155]], 900), { k: "bfly" }] },
  i32: { bgc: "lemon", motion: "tremble", effect: "얼음 반짝 · 충전되는 에너지", parts: [{ k: "tw", x: 58, y: 145, s: 12, cls: "fx-glint" }, { k: "emit", ms: 340, cls: "sh-txt", text: ["!!", "충전!", "+"], size: [12, 16], x: [10, 120], y: [60, 120], px: true, dy: [-40, -20], t: [1.2, 1.6], pc: ["#f2a900", "#e07a2c"] }] },
  i33: { bgc: "moon", motion: "breathe", effect: "모니터 불빛 · 반짝이는 달 · 별", parts: [{ k: "stars", n: 16, h: 40 }, { k: "glow", x: 50, y: 110, s: 110, color: "rgba(120,180,255,.45)" }, { k: "tw", x: 150, y: 12, s: 12 }, WORDS(["탁탁", "타닥"], 70, 150, 1400, ["#9fb7ff"])] },
  i34: { bgc: "office", motion: "tremble", effect: "떨리는 몸 · 식은땀 · \"두근두근\"", parts: [SWEAT([[10, 95], [126, 95]], 700), { k: "shout", text: "두근두근", x: 72, y: 14, c: "#fff", sh: "#d64570", tm: "1.6s" }] },
  i35: { bgc: "field", motion: "rumble", effect: "엔진 진동 · 배기 연기 · 흙먼지", parts: [{ k: "emit", ms: 280, cls: "sh-smoke", size: [10, 16], pts: [[112, 128]], dx: [-8, 8], dy: [-45, -30], s0: 0.5, s1: 2, t: [1.5, 2], pc: ["rgba(190,190,190,.7)"] }, DUST([[28, 205], [118, 205]], 380)] },
  i36: { bgc: "rainy", motion: "sway", effect: "가랑비 · 해님 반짝", parts: [{ k: "rain", ms: 90 }, { k: "glow", x: 96, y: 10, s: 40, color: "rgba(255,220,120,.8)" }] },
  i37: { bgc: "kitchen", motion: "trudge", effect: "버무리는 동작 · 고춧가루 · \"쓱쓱\"", parts: [{ k: "emit", ms: 120, cls: "sh-flake", size: [2, 4], x: [110, 175], y: [140, 160], px: true, dx: [-10, 10], dy: [20, 40], rot: [-90, 90], t: [0.8, 1.1], pc: ["#d8322a", "#b81f1f"] }, { k: "shout", text: "쓱쓱", x: 76, y: 15, c: "#fff", sh: "#b81f1f", tm: "2s" }] },
  i38: { bgc: "sky", motion: "sway", effect: "지나가는 구름 · 비행기 · 모자 배지 반짝", parts: [{ k: "clouds", ms: 1100, tmin: 4 }, { k: "flyer", svg: "plane", w: 22, y: 6, dur: 10, d: 1, rtl: true }, { k: "tw", x: 64, y: 25, s: 12 }] },
  i39: { preset: "campfire", effect: "장작불 일렁임 · 불티 · 핫초코 김 · 랜턴" },
  i40: { bgc: "kitchen", motion: "groove", effect: "웍 불쇼 · 튀어 오르는 볶음밥 · \"흑백요리사 시즌27 나간다\"", parts: [{ k: "glow", x: 84, y: 198, s: 60, layer: "back" }, { k: "glow", x: 84, y: 200, s: 26 }, { k: "emit", ms: 70, cls: "sh-dot", size: [2, 4], h: [3, 5], pts: [[50, 140]], jit: [0, 20], dx: [-30, 30], dy: [-70, -40], rot: [-120, 120], t: [0.8, 1.1], pc: ["#fff3cc", "#f2d38a", "#ff8a4a", "#7cc35a"] }, { k: "emit", ms: 120, cls: "sh-ember", size: [2, 3], pts: [[84, 190]], jit: [0, 8], dx: [-15, 15], dy: [-60, -35], t: [1, 1.3] }, { k: "shout", text: "흑백요리사 시즌27 나간다", x: 50, y: 12, c: "#fff", sh: "#222", gl: "rgba(255,255,255,.5)", tm: "3.4s", fs: "clamp(11px,3vw,16px)" }] },

  /* ── 새싹이 ── */
  s01: { bgc: "mint", motion: "breathe", effect: "살랑이는 잎사귀 · 반짝", parts: [{ k: "cut", rect: [40, 0, 175, 42], origin: [109, 42], anim: "wiggle", dur: 2.2 }, SPARK(10, 200, 20, 200, 500)] },
  s02: { bgc: "field", motion: "breathe", effect: "물방울 · 살랑이는 잎 · \"쑥쑥\"", parts: [{ k: "cut", rect: [15, 0, 115, 32], origin: [79, 32], anim: "wiggle", dur: 2 }, { k: "emit", ms: 220, cls: "sh-drop", size: [3, 5], h: [5, 7], x: [20, 110], y: -5, px: true, dy: [60, 90], t: [0.8, 1] }, { k: "shout", text: "쑥쑥", x: 78, y: 15, c: "#fff", sh: "#3f8a2a", tm: "2.6s" }] },
  s03: { bgc: "cozy", motion: "float", effect: "찻잔 김 · 둥실 반신욕", parts: [STEAM([[50, 108], [90, 104], [130, 108]], 320, true)] },
  s04: { bgc: "lemon", effect: "상자에서 뿅 · \"짜잔!\" · 꽃가루", parts: [{ k: "cut", rect: [20, 0, 142, 118], origin: [82, 118], anim: "stretch", dur: 1.3 }, { k: "shout", text: "짜잔!", x: 74, y: 14, c: "#fff", sh: "#c2851e", tm: "2.6s" }, { k: "confetti", ms: 260 }] },
  s05: { bgc: "kitchen", motion: "breathe", effect: "갓 지은 밥 김 · \"밥심!\"", parts: [STEAM([[40, 128], [80, 122], [118, 128]], 360)] },
  s06: { bgc: "night", motion: "sway", effect: "깜빡이는 전구 · 눈", parts: [{ k: "bulbs", s: 8, pts: [[22, 119], [50, 131], [91, 128], [119, 116], [41, 163], [81, 169], [106, 150], [50, 194], [75, 203]] }, { k: "snow", ms: 170 }] },
  s07: { bgc: "sky", motion: "bounce", effect: "무지개 반짝 · 신난 동작 · 구름", parts: [SPARK(20, 230, 5, 90, 220), { k: "clouds", ms: 2000 }] },
  s08: { bgc: "moon", motion: "sway", effect: "한가위 보름달 · 별", parts: [{ k: "html", html: '<div class="fx-moon" style="left:auto;right:6%;top:6%;width:22%;box-shadow:0 0 50px 16px rgba(255,236,170,.45)"></div>' }, { k: "stars", n: 16, h: 40 }, SPARK(170, 330, 130, 215, 400)] },
  s09: { bgc: "autumn", motion: "sway", effect: "떨어지는 단풍잎", parts: [{ k: "emit", ms: 300, cls: "sh-maple", size: [9, 14], x: [150, 260], y: [10, 60], px: true, dx: [-60, 10], dy: [120, 200], rot: [180, 540], t: [3, 4.5], pc: ["#e8502e", "#f28a2e", "#d43a2a", "#f5b82e"] }] },
  s10: { bgc: "angry", baseSrc: IMG.fx_s10_base, motion: "tremble", effect: "부르르 떠는 동작 · 커지는 화 표시 · \"흥!\"", parts: [{ k: "cut", src: IMG.fx_s10_p0, origin: [166, 68], anim: "pulse", dur: 0.6 }, { k: "shout", text: "흥!", x: 22, y: 18, c: "#fff", sh: "#d23c2b", tm: "2s" }] },
  s11: { bgc: "pink", baseSrc: IMG.fx_s11_base, motion: "bounce", effect: "두근거리는 하트 · 떠오르는 하트", parts: [{ k: "cut", src: IMG.fx_s11_p0, origin: [25, 62], anim: "pulse", dur: 0.8 }, { k: "cut", src: IMG.fx_s11_p1, origin: [178, 74], anim: "pulse", dur: 0.8, delay: 0.4 }, HEARTS([[40, 120], [160, 120]], 600)] },
  s12: { bgc: "cozy", motion: "nod", origin: "50% 90%", effect: "꾸벅꾸벅 조는 동작 · Zzz", parts: [Z(175, 50)] },
  s13: { preset: "balloon", effect: "풍선에 매달려 흔들 · 구름 · 풍선 반짝" },
  s14: { bgc: "lilac", motion: "groove", effect: "둠칫둠칫 · 헤드폰 울림 · 음표", parts: [{ k: "ring", x: 36, y: 122, s: 40, pc: "rgba(140,220,200,.9)", dur: 0.9 }, { k: "ring", x: 200, y: 122, s: 40, pc: "rgba(140,220,200,.9)", dur: 0.9, d: 0.45 }, NOTES([[17, 47], [220, 44]], 450)] },
  s15: { bgc: "kitchen", motion: "breathe", effect: "찜기 김이 모락모락", parts: [STEAM([[40, 70], [80, 64], [130, 64], [175, 70]], 200, true)] },
  s16: { bgc: "sky", baseSrc: IMG.fx_s16_base, effect: "방방 점프 · 구름", parts: [{ k: "cut", src: IMG.fx_s16_p0, origin: [117, 158], anim: "bounce", dur: 1.1 }, { k: "clouds", ms: 1800 }] },
  s17: { bgc: "stage", motion: "groove", effect: "선글라스 반사광 · 금목걸이 반짝 · 음표", parts: [{ k: "beams" }, { k: "lens", x: 97, y: 112, w: 34, h: 24 }, { k: "lens", x: 144, y: 112, w: 34, h: 24, d: 0.12 }, { k: "tw", x: 105, y: 143, s: 11 }, { k: "tw", x: 140, y: 140, s: 9, d: 0.7 }, NOTES([[30, 100], [190, 100]], 520)] },
  s18: { bgc: "cozy", motion: "float", effect: "온천 김 · 둥실", parts: [STEAM([[50, 100], [100, 96], [150, 96], [200, 100]], 220, true)] },
  s19: { bgc: "field", baseSrc: IMG.fx_s19_base, motion: "tremble", effect: "덜덜 떠는 동작 · 식은땀 · 꼬리 치는 강아지", parts: [{ k: "cut", src: IMG.fx_s19_p0, origin: [176, 218], anim: "tilt", dur: 0.5 }, SWEAT([[40, 100], [30, 120]], 700), { k: "shout", text: "멍!", x: 82, y: 54, c: "#fff", sh: "#b5651d", tm: "2s" }] },
  s20: { bgc: "spooky", motion: "sway", effect: "빛나는 한쪽 눈 · 보랏빛 안개 · 별", parts: [{ k: "glow", x: 104, y: 109, s: 30, color: "rgba(140,230,255,.95)" }, { k: "stars", n: 12, h: 40 }, { k: "html", layer: "top", html: '<div class="fx-fog" style="--fog:rgba(190,150,220,.55)"></div>' }] },
  s21: { bgc: "cozy", motion: "breathe", effect: "톡톡 터지는 팝콘 · 노트북 빛", parts: [{ k: "emit", ms: 260, cls: "sh-pop", size: [5, 8], pts: [[144, 160]], jit: [0, 8], dx: [-30, 30], dy: [-60, -35], rot: [-120, 120], t: [0.9, 1.2] }, { k: "glow", x: 62, y: 180, s: 70, color: "rgba(150,200,255,.5)" }] },
  s22: { bgc: "office", motion: "breathe", effect: "안경 반사광 · 커피 김 · 오늘의 소식", parts: [{ k: "lens", x: 89, y: 109, w: 30 }, { k: "lens", x: 132, y: 109, w: 30, d: 0.12 }, STEAM([[198, 186]], 700), WORDS(["속보", "단독", "오늘의 소식"], 100, 130, 1600, ["#2457E6", "#3c4a6e"])] },
  s23: { bgc: "night", motion: "nod", effect: "스탠드 불빛 · 모니터 빛 · 커피 김", parts: [{ k: "stars", n: 12, h: 30 }, { k: "glow", x: 185, y: 128, s: 80, color: "rgba(255,220,130,.6)" }, { k: "glow", x: 160, y: 137, s: 50, color: "rgba(140,200,255,.5)" }, STEAM([[91, 145]], 800)] },
  s24: { bgc: "lab", motion: "breathe", effect: "시험관 거품 · 초록빛 · 보안경 반사광", parts: [{ k: "glow", x: 19, y: 75, s: 40, color: "rgba(120,255,140,.7)" }, { k: "emit", ms: 240, cls: "sh-dot", size: [3, 6], pts: [[19, 60]], jit: [0, 4], dx: [-8, 8], dy: [-50, -30], s0: 0.6, s1: 1.2, t: [1.2, 1.6], pc: ["rgba(170,255,170,.9)"] }, { k: "lens", x: 100, y: 106, w: 110, h: 30 }] },
  s25: { bgc: "field", motion: "breathe", effect: "밭 위를 도는 드론 · 반짝이는 새싹", parts: [{ k: "flyer", svg: "drone", w: 22, loop: true, front: true }, SPARK(20, 200, 170, 210, 280)] },
  s26: { bgc: "space", motion: "float", effect: "무중력 둥실 · 별 · 헬멧 반사광", parts: [{ k: "stars", n: 30, h: 99 }, { k: "html", html: '<div class="fx-shoot"></div>' }, { k: "lens", x: 126, y: 81, w: 100 }] },
  s27: { bgc: "winter", motion: "bob", effect: "붕어빵 김 · 눈", parts: [STEAM([[70, 96], [150, 96], [190, 110]], 360), { k: "snow", ms: 220 }] },
  s28: { bgc: "field", motion: "rock", origin: "50% 50%", effect: "데굴데굴 김밥 · 소풍 꽃가루", parts: [{ k: "emit", layer: "top", ms: 400, cls: "sh-petal", size: [6, 8], x: [0, 100], y: -4, dx: [-40, 30], dy: [320, 400], rot: [200, 520], t: [4, 6], pc: ["#ffd1dc", "#ffffff", "#ffe08a"] }] },
  s29: { bgc: "kitchen", motion: "groove", effect: "지글지글 돌솥 김 · \"지글지글\"", parts: [STEAM([[60, 148], [100, 144], [140, 148]], 260), { k: "shout", text: "지글지글", x: 72, y: 14, c: "#fff", sh: "#b5651d", tm: "2.4s" }] },
  s30: { bgc: "camp", motion: "breathe", effect: "장작불 일렁임 · 불티 · 노릇한 마시멜로", parts: [{ k: "stars", n: 14, h: 40 }, { k: "cut", rect: [140, 145, 200, 190], origin: [170, 190], anim: "flicker" }, { k: "glow", x: 168, y: 175, s: 130, soft: true, layer: "back" }, { k: "glow", x: 168, y: 178, s: 40 }, { k: "glow", x: 152, y: 128, s: 24, color: "rgba(255,190,90,.9)" }, { k: "emit", ms: 110, cls: "sh-ember", size: [2, 3.5], pts: [[168, 155]], jit: [0, 10], dx: [-20, 20], dy: [-80, -45], t: [1.2, 1.8], s1: 0.4 }] },
  s31: { bgc: "cozy", baseSrc: IMG.fx_s31_base, motion: "squish", effect: "따르릉 울리는 알람 · \"5분만…\"", parts: [{ k: "cut", src: IMG.fx_s31_p0, origin: [205, 200], anim: "shake", dur: 0.3 }, { k: "shout", text: "5분만…", x: 30, y: 16, c: "#fff", sh: "#8a6a9a", tm: "3s" }] },
  s32: { bgc: "rainy", motion: "stomp", effect: "빗줄기 · 물웅덩이 첨벙", parts: [{ k: "rain", ms: 60 }, { k: "ring", x: 108, y: 190, s: 60, pc: "rgba(255,255,255,.85)", dur: 1 }, { k: "emit", ms: 160, cls: "sh-drop", size: [3, 5], x: [70, 150], y: [182, 192], px: true, dx: [-25, 25], dy: [-35, -15], t: [0.6, 0.8], s1: 0.6 }] },
  s33: { bgc: "lilac", motion: "sway", effect: "별 지팡이 마법 가루", parts: [{ k: "glow", x: 56, y: 106, s: 40, color: "rgba(255,230,120,.9)" }, { k: "emit", ms: 110, cls: "fx-spark", size: [6, 10], pts: [[56, 106]], jit: [0, 8], dx: [-40, 20], dy: [-30, 40], t: [1, 1.4], s0: 0.3 }] },
  s34: { bgc: "sea", motion: "rock", effect: "출렁이는 배 · 파도 · 갈매기 · 보물 표시 반짝", parts: [{ k: "waves" }, { k: "flyer", svg: "gull", w: 12, y: 10, dur: 8 }, { k: "tw", x: 50, y: 181, s: 12, d: 0.3 }] },
  s35: { bgc: "office", motion: "sway", effect: "돋보기 반사광 · 단서 물음표", parts: [{ k: "lens", x: 46, y: 103, w: 70 }, WORDS(["?", "단서!", "!"], 120, 60, 1300, ["#8a5a2b"])] },
  s36: { bgc: "mint", baseSrc: IMG.fx_s36_base, motion: "sway", effect: "회전하는 나뭇잎 표창 · 날리는 잎", parts: [{ k: "cut", src: IMG.fx_s36_p0, origin: [45, 99], anim: "spin", dur: 0.6 }, { k: "emit", layer: "top", ms: 300, cls: "sh-leafg", size: [7, 10], x: -5, y: [20, 80], dx: [300, 400], dy: [-60, 20], rot: [300, 700], t: [2.4, 3.2], pc: ["#3a9a4a", "#6cc070"] }] },
  s37: { bgc: "sky", motion: "breathe", effect: "펄럭이는 깃발 · 구름 · \"야호!\"", parts: [{ k: "cut", rect: [0, 55, 42, 102], origin: [40, 78], anim: "wave", dur: 0.9 }, { k: "clouds", ms: 1400 }, { k: "shout", text: "야호!", x: 76, y: 14, c: "#fff", sh: "#3c7a3a", tm: "3.2s" }] },
  s38: { bgc: "pink", motion: "sway", effect: "딸기 바구니 반짝 · 하얀 꽃잎", parts: [SPARK(105, 160, 150, 200, 300), { k: "emit", layer: "top", ms: 450, cls: "sh-petal", size: [6, 8], x: [0, 100], y: -4, dx: [-40, 30], dy: [320, 400], rot: [200, 520], t: [4, 6], pc: ["#ffffff", "#fff6c2"] }] },
  s39: { bgc: "lemon", motion: "nod", effect: "얼음 반짝 · 컵에 맺힌 물방울 · Zzz", parts: [{ k: "tw", x: 30, y: 140, s: 12, cls: "fx-glint" }, { k: "emit", ms: 500, cls: "sh-drop", size: [3, 4], h: [4, 6], x: [8, 60], y: [140, 180], px: true, dx: 0, dy: [10, 25], t: [1.4, 1.8] }, Z(150, 40, 1300)] },
  s40: { bgc: "stadium", motion: "dive", effect: "회전하는 공 · 다이빙 · \"슈퍼 세이브!\"", parts: [{ k: "cut", circle: [27, 109, 29], anim: "spin", dur: 0.7 }, { k: "ring", x: 40, y: 109, s: 70, pc: "rgba(255,255,255,.8)", dur: 0.8 }, { k: "shout", text: "슈퍼 세이브!", x: 66, y: 12, c: "#fff", sh: "#e05a1e", tm: "2.6s" }] },
};

  return { NORMAL, ID2MK: {"i-wave": "i01", "i-run": "i02", "s-1": "s01", "i-sleepy": "i03", "i-rake": "i04", "s-2": "s02", "i-think": "i05", "i-crossed": "i06", "i-skate": "i07", "i-mag": "i08", "i-mega": "i09", "i-basket": "i10", "i-center": "i11", "i-kkeok": "i12", "i-band": "i13", "i-drib": "i14", "i-bat": "i15", "i-kick": "i16", "i-hike": "i17", "i-lab": "i18", "i-ai": "i19", "i-drone": "i20", "i-paper": "i21", "i-cow": "i22", "i-hanwoo": "i23", "i-apple": "i24", "i-pear": "i25", "i-tangerine": "i26", "i-scarecrow": "i27", "i-weekend": "i28", "i-book": "i29", "i-vacation": "i30", "i-walk": "i31", "i-iced": "i32", "i-night": "i33", "i-report": "i34", "i-tractor": "i35", "i-weather": "i36", "i-kimchi": "i37", "i-pilot": "i38", "i-campfire": "i39", "i-chef": "i40", "s-3": "s03", "s-4": "s04", "s-5": "s05", "s-6": "s06", "s-7": "s07", "s-8": "s08", "s-9": "s09", "s-10": "s10", "s-11": "s11", "s-12": "s12", "s-13": "s13", "s-14": "s14", "s-15": "s15", "s-16": "s16", "s-17": "s17", "s-18": "s18", "s-19": "s19", "s-20": "s20", "s-21": "s21", "s-22": "s22", "s-23": "s23", "s-24": "s24", "s-25": "s25", "s-26": "s26", "s-27": "s27", "s-28": "s28", "s-29": "s29", "s-30": "s30", "s-31": "s31", "s-32": "s32", "s-33": "s33", "s-34": "s34", "s-35": "s35", "s-36": "s36", "s-37": "s37", "s-38": "s38", "s-39": "s39", "s-40": "s40"}, LEG: {"l-cheer": ["cheer"], "l-king": ["king"], "l-kya": ["kya"], "l-newyear": ["newyear"], "l-sprout": ["gsprout", "gold"], "l-dolsoe": ["dolsoe"], "l-seonbi": ["seonbi"], "l-doryeong": ["doryeong"], "l-assi": ["assi"], "l-liberty": ["liberty"], "l-army": ["army"], "l-watermelon": ["watermelon"], "l-halloween": ["halloween"], "l-dracula": ["dracula"], "l-xmas": ["xmas"], "l-golden": ["golden", "gold"], "l-hipster": ["hipster"], "l-premier": ["premier"], "l-hero": ["hero"], "l-buster": ["buster"], "l-space": ["space"], "l-sebae": ["sebae"], "l-santa": ["santa"], "l-snowman": ["snowman"], "l-hidden": ["bubble"]}, SIZE: {"i-wave": [140, 220], "i-run": [151, 220], "s-1": [211, 220], "i-sleepy": [140, 220], "i-rake": [155, 220], "s-2": [158, 220], "i-think": [140, 220], "i-crossed": [139, 220], "i-skate": [156, 220], "i-mag": [145, 220], "i-mega": [145, 220], "i-basket": [139, 220], "i-center": [138, 220], "i-kkeok": [125, 220], "i-band": [165, 220], "i-drib": [142, 220], "i-bat": [155, 220], "i-kick": [163, 220], "i-hike": [135, 220], "i-lab": [136, 220], "i-ai": [182, 220], "i-drone": [184, 220], "i-paper": [176, 220], "i-cow": [183, 220], "i-hanwoo": [158, 220], "i-apple": [153, 220], "i-pear": [153, 220], "i-tangerine": [153, 220], "i-scarecrow": [248, 220], "i-weekend": [197, 220], "i-book": [139, 220], "i-vacation": [162, 220], "i-walk": [167, 220], "i-iced": [124, 220], "i-night": [239, 220], "i-report": [136, 220], "i-tractor": [145, 220], "i-weather": [145, 220], "i-kimchi": [181, 220], "i-pilot": [142, 220], "i-campfire": [213, 220], "i-chef": [196, 220], "s-3": [189, 220], "s-4": [166, 220], "s-5": [161, 220], "s-6": [149, 220], "s-7": [252, 220], "s-8": [330, 220], "s-9": [269, 220], "s-10": [192, 220], "s-11": [199, 220], "s-12": [231, 220], "s-13": [178, 220], "s-14": [238, 220], "s-15": [217, 220], "s-16": [183, 220], "s-17": [199, 220], "s-18": [229, 220], "s-19": [212, 220], "s-20": [177, 220], "s-21": [243, 220], "s-22": [224, 220], "s-23": [212, 220], "s-24": [192, 220], "s-25": [224, 220], "s-26": [249, 220], "s-27": [219, 220], "s-28": [208, 220], "s-29": [195, 220], "s-30": [228, 220], "s-31": [229, 220], "s-32": [210, 220], "s-33": [208, 220], "s-34": [202, 220], "s-35": [172, 220], "s-36": [229, 220], "s-37": [182, 220], "s-38": [184, 220], "s-39": [186, 220], "s-40": [276, 220], "l-cheer": [167, 220], "l-king": [160, 220], "l-kya": [168, 220], "l-newyear": [141, 220], "l-sprout": [211, 220], "l-dolsoe": [147, 220], "l-seonbi": [166, 220], "l-doryeong": [161, 220], "l-assi": [175, 220], "l-liberty": [167, 220], "l-army": [141, 220], "l-watermelon": [138, 220], "l-halloween": [235, 220], "l-dracula": [213, 220], "l-xmas": [206, 220], "l-golden": [142, 220], "l-hipster": [180, 220], "l-premier": [181, 220], "l-hero": [215, 220], "l-buster": [239, 220], "l-space": [249, 220], "l-sebae": [189, 220], "l-santa": [208, 220], "l-snowman": [196, 220], "l-hidden": [238, 220]} };
})();

/* ── 도감 카드 팝업: 카드 모양 · 효과 연결 · 끌어서 기울이기 · 탭해서 뒤집기 · 폰 기울기 ── */
const DXC_EMB = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22V8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/><ellipse cx="9.4" cy="11" rx="2.1" ry="3.4" transform="rotate(-28 9.4 11)" fill="currentColor"/><ellipse cx="14.6" cy="11" rx="2.1" ry="3.4" transform="rotate(28 14.6 11)" fill="currentColor"/><ellipse cx="9.4" cy="16" rx="2.1" ry="3.4" transform="rotate(-28 9.4 16)" fill="currentColor"/><ellipse cx="14.6" cy="16" rx="2.1" ry="3.4" transform="rotate(28 14.6 16)" fill="currentColor"/><ellipse cx="12" cy="6.2" rx="2" ry="3.2" fill="currentColor"/></svg>';
const DXC_KIND = { legend: ["전설", "★★★", "전설 도감"], isak: ["이삭이", "★", "이삭이 도감"], sprout: ["새싹이", "★", "새싹이 도감"] };
function dexFxCfg(x) {
  const lg = DEX_FX.LEG[x.id];
  if (lg) return { fx: lg[0], bg: lg[1] || undefined, legend: true, sparkle: lg[1] ? 300 : undefined };
  const n = DEX_FX.NORMAL[DEX_FX.ID2MK[x.id]];
  if (!n) return null;
  return n.preset ? { fx: n.preset } : Object.assign({ fx: "gen" }, n);
}
function dexCardHTML(x) {
  const k = DXC_KIND[x.kind], pad = (n) => String(n).padStart(3, "0"), lg = x.kind === "legend";
  const how = lg ? x.cond : "출석 5일마다 랜덤으로 만나요";
  const line = x.line || (lg ? `‘${x.cond}’ 기록으로 깨어난 전설이에요.` : "출석으로 만난 친구예요.");
  const total = DEX.totals[x.kind];
  return `<button type="button" class="dxc-x" data-close>닫기</button>
  <div class="dxc-wrap"><div class="dxc" data-kind="${x.kind}" data-dxc="${x.id}" tabindex="0" role="img" aria-label="${esc(x.name)} 카드">
    <div class="dxc-tilt"><div class="dxc-face"><div class="dxc-frame"><div class="dxc-inner">
      <div class="dxc-top"><span>No.${pad(x.no)}</span><span class="dxc-mid"><span class="dxc-emb">${DXC_EMB}</span></span><span class="dxc-chip">${k[0]}<i>${k[1]}</i></span></div>
      <div class="dxc-win"><div class="dxc-stage"></div></div>
      <div class="dxc-plate"><span class="dxc-pn">${esc(x.name)}</span><span class="dxc-pk">${k[2]}</span></div>
      <div class="dxc-info"><div><small>만난 날</small><b>${esc(x.got || "")}</b></div><div><small>얻는 법</small><b>${esc(how)}</b></div></div>
      <div class="dxc-foot"><span>DAILY BRIEFING</span><span>${pad(x.no)} / ${pad(total)}</span></div>
    </div></div><div class="dxc-glare"></div></div></div></div>
    <div class="dxc-side"><p class="dxc-line">${esc(line)}</p>
    <p class="dxc-hint">카드를 끌어서 기울여 보세요</p>
    ${"DeviceOrientationEvent" in window && matchMedia("(pointer: coarse)").matches ? '<button type="button" class="dxc-gy" aria-pressed="false">폰 기울여서 보기</button>' : ""}
    <p class="dxc-msg" hidden></p></div></div>`;
}
const DXC = { fx: null, raf: 0, gyro: false, got: false, base: null, card: null };
function dexCardStop() {
  if (DXC.fx) { DXC.fx.stop(); DXC.fx = null; }
  cancelAnimationFrame(DXC.raf); DXC.raf = 0; DXC.card = null;
  if (DXC.gyro) { window.removeEventListener("deviceorientation", dexCardOri); DXC.gyro = false; }
}
function dexCardOri(e) {
  const card = DXC.card; if (!card || e.beta == null || e.gamma == null) return;
  DXC.got = true; if (!DXC.base) DXC.base = { b: e.beta, g: e.gamma };
  const cl = (v, a, b) => Math.max(a, Math.min(b, v)), db = cl(e.beta - DXC.base.b, -25, 25), dg = cl(e.gamma - DXC.base.g, -25, 25);
  card.querySelector(".dxc-tilt").style.transition = "transform .12s linear";
  card._set(cl(-db * 0.6, -14, 14), cl(dg * 0.7, -16, 16), 50 + dg * 1.8, 50 + db * 1.8, 0.7);
}
function dexCardMount(sh) {
  const card = sh.querySelector(".dxc"); if (!card) return;
  const x = DEX.items.find((y) => y.id === card.dataset.dxc), cfg = x && dexFxCfg(x);
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  DXC.card = card;
  if (cfg) { const sz = DEX_FX.SIZE[x.id] || [180, 220]; try { DXC.fx = DexFx.mount(card.querySelector(".dxc-stage"), Object.assign({ img: IMG[x.img], w: sz[0], h: sz[1], alt: x.name }, cfg)); if (reduce) DXC.fx.pause(); } catch (e) { DXC.fx = null; } }
  else card.querySelector(".dxc-stage").innerHTML = `<img src="${IMG[x.img]}" alt="" style="position:absolute;left:50%;bottom:6%;height:84%;width:auto;transform:translateX(-50%)">`;
  const tilt = card.querySelector(".dxc-tilt"); let active = false, down = null, t0 = performance.now();
  const set = (rx, ry, mx, my, g) => { const s = card.style; s.setProperty("--rx", rx + "deg"); s.setProperty("--ry", ry + "deg"); s.setProperty("--mx", mx + "%"); s.setProperty("--my", my + "%"); s.setProperty("--glare", g); };
  card._set = set;
  const idle = (t) => { if (!DXC.card) return; if (!active && !DXC.gyro && !reduce) { const a = (t - t0) / 1000; set(Math.sin(a * 0.9) * 4, Math.sin(a * 0.6) * 7, 50 + Math.sin(a * 0.6) * 35, 40 + Math.cos(a * 0.9) * 25, 0.3); } DXC.raf = requestAnimationFrame(idle); };
  DXC.raf = requestAnimationFrame(idle);
  const cl = (v, a, b) => Math.max(a, Math.min(b, v));
  const poke = () => { card.classList.remove("poke"); void card.offsetWidth; card.classList.add("poke"); };
  card.addEventListener("animationend", (e) => { if (e.animationName === "dxcPoke") card.classList.remove("poke"); });
  const move = (e) => { const r = card.getBoundingClientRect(), px = cl((e.clientX - r.left) / r.width, 0, 1), py = cl((e.clientY - r.top) / r.height, 0, 1) ; set((0.5 - py) * 22, (px - 0.5) * 26, px * 100, py * 100, 0.75); };
  card.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { active = true; tilt.style.transition = "transform .08s linear"; } });
  card.addEventListener("pointermove", (e) => { if (e.pointerType === "mouse" || down) { active = true; move(e); } });
  card.addEventListener("pointerdown", (e) => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; active = true; tilt.style.transition = "transform .08s linear"; try { card.setPointerCapture(e.pointerId); } catch (_) {} move(e); });
  const end = (e) => {
    if (down) { if (Math.hypot(e.clientX - down.x, e.clientY - down.y) < 8 && performance.now() - down.t < 450) poke(); down = null; }
    if (e.pointerType !== "mouse" || e.type === "pointerleave") { active = false; tilt.style.transition = "transform .6s cubic-bezier(.2,1,.3,1)"; t0 = performance.now(); }
  };
  ["pointerup", "pointercancel", "pointerleave"].forEach((ev) => card.addEventListener(ev, end));
  card.addEventListener("click", (e) => e.stopPropagation());
  card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); poke(); } });
  const gy = sh.querySelector(".dxc-gy"), msg = sh.querySelector(".dxc-msg");
  if (gy) gy.addEventListener("click", async (e) => {
    e.stopPropagation(); msg.hidden = true;
    const off = () => { window.removeEventListener("deviceorientation", dexCardOri); DXC.gyro = false; DXC.base = null; gy.setAttribute("aria-pressed", "false"); gy.textContent = "폰 기울여서 보기"; };
    if (DXC.gyro) { off(); return; }
    try { if (typeof DeviceOrientationEvent.requestPermission === "function" && (await DeviceOrientationEvent.requestPermission()) !== "granted") { msg.textContent = "기울기 센서 사용이 허용되지 않았어요. 손가락으로 끌어서 기울여 보세요."; msg.hidden = false; return; } }
    catch (err) { msg.textContent = "이 기기에서는 기울기 센서를 쓸 수 없어요. 손가락으로 끌어서 기울여 보세요."; msg.hidden = false; return; }
    DXC.got = false; DXC.base = null; DXC.gyro = true; window.addEventListener("deviceorientation", dexCardOri);
    gy.setAttribute("aria-pressed", "true"); gy.textContent = "폰 기울기 끄기";
    setTimeout(() => { if (DXC.gyro && !DXC.got) { off(); msg.textContent = "기울기 센서 값이 들어오지 않아요. 손가락으로 끌어서 기울여 보세요."; msg.hidden = false; } }, 1500);
  });
}

/* 확인용(미리보기) 주소에서 ?dexdemo=1 을 붙이면 도감을 전부 연 상태로 보여 줌. 실제 배포 주소(rdadaily 등)에서는 동작하지 않음 */
function dexDemo() {
  try { const h = location.hostname; return (/-kyeongseok\.vercel\.app$/.test(h) || h === "localhost") && /[?&]dexdemo=1\b/.test(location.search); } catch (e) { return false; }
}
