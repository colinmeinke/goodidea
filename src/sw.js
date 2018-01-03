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
        '/icons/favicon-16x16.png',
        '/icons/favicon-32x32.png',
        '/icons/favicon-64x64.png',
        '/icons/logo.svg'
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
