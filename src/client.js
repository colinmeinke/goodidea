import home from './components/home.vue'
import Vue from 'vue'

const app = new Vue({
  el: '#app',
  template: `<home></home>`,
  components: { home }
})
