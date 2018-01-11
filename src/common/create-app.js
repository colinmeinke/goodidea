import Layout from './components/Layout.vue'
import Main from './components/Main.vue'
import Vue from 'vue'

const createApp = (data = {}, el) => {
  const x = {
    data,
    template: `
      <Layout
        :criterias="criterias"
        :hasIdeas="hasIdeas"
        :ideas="ideas"
        :showCriteria="showCriteria"
        :updateAvailable="updateAvailable"
        :updateServiceWorker="updateServiceWorker"
        :updateShowCriteria="updateShowCriteria"
        :upload="upload"
      >
        <Main
          :criteriaAdd="criteriaAdd"
          :criteriaDelete="criteriaDelete"
          :criterias="criterias"
          :ideaAdd="ideaAdd"
          :ideaDelete="ideaDelete"
          :ideaScore="ideaScore"
          :ideas="ideas"
          :showCriteria="showCriteria"
        />
      </Layout>
    `,
    components: { Layout, Main }
  }

  if (el) {
    x.el = el
  }

  return new Vue(x)
}

export default createApp
