// 홈 화면 앱으로 설치할 수 있게 하는 최소 서비스 워커
// 네트워크를 그대로 쓰고, 연결이 끊겼을 때만 마지막으로 받은 화면을 보여 줌
const CACHE = "db-shell-v1";
self.addEventListener("install", (e) => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin || r.url.includes("/api/")) return;
  e.respondWith(fetch(r).then((res) => { const c = res.clone(); caches.open(CACHE).then((k) => k.put(r, c)); return res; }).catch(() => caches.match(r)));
});
