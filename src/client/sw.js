const cachePrefix = 'goodidea'
const cacheVersion = __VERSION__
const currentCacheName = `${cachePrefix}-${cacheVersion}`

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCacheName)
      .then(cache => cache.addAll([
        '/',
        '/manifest.json',
        '/client.js',
        '/icons/logo-16x16.png',
        '/icons/logo-on-16x16.png',
        '/icons/logo-32x32.png',
        '/icons/logo-on-32x32.png',
        '/icons/logo.svg',
        '/icons/logo-on.svg'
      ]))
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames
        .filter(cacheName => (
          cacheName.startsWith(cachePrefix) &&
          cacheName !== currentCacheName
        ))
        .map(cacheName => {
          caches.delete(cacheName)
        })
    ))
  )
})

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response
        } else {
          return fetch(event.request)
        }
      })
  )
})
