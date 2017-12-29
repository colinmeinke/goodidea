import createApp from './create-app'

const app = createApp({
  addIdea: function (idea) {
    this.$root.ideas.push(idea)
  },
  deleteIdea: function (idea) {
    for (let i = 0, l = this.$root.ideas.length; i < l; i++) {
      if (idea === this.$root.ideas[ i ]) {
        this.$root.ideas.splice(i, 1)
        break
      }
    }
  },
  ideas: [],
  updateAvailable: false,
  updateServiceWorker: worker => worker.postMessage({ action: 'skipWaiting' })
}, '#app')

if ('serviceWorker' in navigator) {
  const updateReady = worker => {
    app.updateAvailable = true
    app.updateServiceWorker = app.updateServiceWorker.bind(null, worker)
  }

  const trackInstalling = worker => {
    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed') {
        updateReady(worker)
      }
    })
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        if (!navigator.serviceWorker.controller) {
          return
        }

        if (reg.waiting) {
          updateReady(reg.waiting)
          return
        }

        if (reg.installing) {
          trackInstalling(reg.installing)
          return
        }

        reg.addEventListener('updatefound', () => {
          trackInstalling(reg.installing)
        })
      })

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })
  })
}
