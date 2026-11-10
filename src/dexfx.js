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
