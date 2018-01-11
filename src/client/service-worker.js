const init = state => {
  if ('serviceWorker' in navigator) {
    const updateReady = worker => {
      state.updateAvailable = true
      state.updateServiceWorker = state.updateServiceWorker.bind(null, worker)
    }

    const trackInstalling = worker => {
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed') {
          updateReady(worker)
        }
      })
    }

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
  }
}

export default init
