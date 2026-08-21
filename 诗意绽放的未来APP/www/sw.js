/* ============================================================
   诗意绽放的未来 · Service Worker（离线缓存，全部相对路径）
   作用：首次加载后缓存核心资源，断网仍可打开使用
   ============================================================ */
const CACHE_NAME = 'poetic-bloom-v1-20260821';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

/* 安装：预缓存核心资源，跳过等待 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

/* 激活：清理旧缓存 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* 请求策略：
   - 同源 GET 请求：先网络，失败回退缓存（网络优先，保证更新）
   - 数据 URL（base64 背景图）直接放行不缓存
   - 其他请求正常透传 */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // base64 数据 URL 不缓存
  if (url.protocol === 'data:') return;
  // 跨域请求直接走网络
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        // 只缓存成功的同源基本资源
        if (res && res.status === 200 && (res.type === 'basic' || res.type === 'default')) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match('./index.html')))
  );
});
