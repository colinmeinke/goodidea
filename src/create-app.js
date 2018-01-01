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
          :criteriaAdd="criteriaAdd"
          :criteriaDelete="criteriaDelete"
          :criterias="criterias"
          :ideaAdd="ideaAdd"
          :ideaDelete="ideaDelete"
          :ideaScore="ideaScore"
          :ideas="ideas"
          :upload="upload"
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
