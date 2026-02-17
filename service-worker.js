const CACHE_NAME = 'birikim-kocum-v1';
const urlsToCache = [
  './',
  './index.html',
  './logo.png',
  './manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
```

### 3. Adım: `index.html` Dosyanı Güncelle
Son olarak, mevcut `index.html` dosyanı aç ve `<script>` etiketlerinin olduğu en alt kısma (kapanış `</body>` etiketinden hemen önce) şu kodu ekle. Bu kod, yukarıda oluşturduğumuz service worker dosyasını çalıştırır.

Mevcut `index.html` dosyanın **en altına**, `<script> ... </script>` bloğunun içine, `const firebaseConfig = ...` satırından **önce** şu bloğu yapıştır:

```javascript
      // --- PWA SERVICE WORKER KAYDI ---
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
            console.log('ServiceWorker başarıyla kaydedildi: ', registration.scope);
          }, function(err) {
            console.log('ServiceWorker kaydı başarısız: ', err);
          });
        });
      }
