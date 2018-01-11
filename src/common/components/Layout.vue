<template>
  <div id="app">
    <Header
      :hasIdeas="hasIdeas"
      :showCriteria="showCriteria"
      :updateShowCriteria="updateShowCriteria"
    />
    <slot></slot>
    <Toast
      message="An update is available"
      action="Refresh"
      :actionHandler="updateServiceWorker"
      v-if="updateAvailable"
    />
    <Footer :criterias="criterias" :ideas="ideas" :upload="upload" />
    <Baseline baseline="14px" color="rgba(155,217,98,100)" />
  </div>
</template>

<script>
  import Baseline from './Baseline.vue'
  import Footer from './Footer.vue'
  import Header from './Header.vue'
  import Toast from './Toast.vue'

  export default {
    name: 'Layout',
    props: {
      criterias: {
        type: Array,
        required: true
      },
      hasIdeas: {
        type: Boolean,
        required: true
      },
      ideas: {
        type: Array,
        required: true
      },
      showCriteria: {
        type: Boolean,
        required: true
      },
      updateAvailable: {
        type: Boolean,
        required: true
      },
      updateServiceWorker: {
        type: Function,
        required: true
      },
      updateShowCriteria: {
        type: Function,
        required: true
      },
      upload: {
        type: Function,
        required: true
      }
    },
    components: { Baseline, Footer, Header, Toast }
  }
</script>

<style lang="scss">
  @import '../../../node_modules/normalize.css/normalize.css';

  body {
    background: #F6F7F5;
    overflow-x: hidden;
    width: 100vw;
  }
</style>
