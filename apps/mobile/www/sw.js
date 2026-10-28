/* ============================================================
   VOZZY Service Worker  –  v5 (Full Offline Edition)
   Strategy:
     - Core assets: Cache-First  (app siempre corre offline)
     - Stale-While-Revalidate: devuelve caché instantáneo y
       actualiza en segundo plano cuando hay red
     - Fetch fallback: devuelve index.html para rutas SPA
   ============================================================ */

const CACHE_NAME = 'vozzy-v5';

// Todos los archivos que la app necesita para funcionar sin red
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/emergency.js',
  '/manifest.json',
  '/sw.js',
  '/fonts/inter-400.ttf',
  '/fonts/inter-500.ttf',
  '/fonts/inter-600.ttf',
  '/fonts/inter-700.ttf',
  '/fonts/inter-800.ttf',
  '/icons/favicon.png',
  '/icons/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png'
];

// ── INSTALL: Pre-cachea todos los core assets (resiliente) ─────
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Vozzy v5...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Usamos allSettled para que un recurso faltante no rompa la instalación
      const results = await Promise.allSettled(
        CORE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[SW] No se pudo cachear ${url}:`, err.message);
          })
        )
      );
      const ok = results.filter(r => r.status === 'fulfilled').length;
      console.log(`[SW] Cached ${ok}/${CORE_ASSETS.length} assets.`);
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: Limpia cachés antiguas ──────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Vozzy v5...');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('[SW] Eliminando caché antigua:', key);
            return caches.delete(key);
          })
      )
    ).then(() => {
      console.log('[SW] Vozzy v5 activo y controlando clientes.');
      return self.clients.claim();
    })
  );
});

// ── FETCH: Cache-First con Stale-While-Revalidate ─────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Solo procesar GET
  if (request.method !== 'GET') return;

  // Ignorar URLs externas (analytics, CDNs, etc.)
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then(async (cachedResponse) => {
      // Actualización en segundo plano (Stale-While-Revalidate)
      const revalidatePromise = fetch(request)
        .then(async (networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => null); // sin red → ignorar

      if (cachedResponse) {
        // Devolver desde caché inmediatamente
        event.waitUntil(revalidatePromise);
        return cachedResponse;
      }

      // No hay caché → intentar red
      const networkResponse = await revalidatePromise;
      if (networkResponse) return networkResponse;

      // Sin red y sin caché → fallback a index.html (shell offline)
      const fallback = await caches.match('/index.html') || await caches.match('/');
      if (fallback) return fallback;

      // Último recurso
      return new Response('Vozzy está offline. Instala la app para usarla sin conexión.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    })
  );
});

// ── Mensaje SKIP_WAITING para forzar actualización ────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
