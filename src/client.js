import editableTitle from './components/editable-title.vue'
import toast from './components/toast.vue'
import Vue from 'vue'

const app = new Vue({
  el: '#app',
  data: {
    updateAvailable: false,
    updateServiceWorker: worker => worker.postMessage({ action: 'skipWaiting' })
  },
  template: `
    <div id="app">
      <editable-title
        initialMessage="Good idea!"
      >
      </editable-title>
      <toast
        message="An update is available"
        action="Update"
        :actionHandler="updateServiceWorker"
        v-if="updateAvailable"
      >
      </toast>
    </div>
  `,
  components: { editableTitle, toast }
})

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
