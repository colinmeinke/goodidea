import Home from './components/Home.vue'
import Layout from './components/Layout.vue'
import Vue from 'vue'

const createApp = (data = {}, el) => {
  const x = {
    data,
    template: `
      <layout
        :updateAvailable="updateAvailable"
        :updateServiceWorker="updateServiceWorker"
      >
        <home
          :addIdea="addIdea"
          :deleteIdea="deleteIdea"
          :ideas="ideas"
        >
        </home>
      </layout>
    `,
    components: { Home, Layout }
  }

  if (el) {
    x.el = el
  }

  return new Vue(x)
}

export default createApp
