<template>
  <div id="app">
    <LayoutHeader />
    <slot></slot>
    <Toast
      message="An update is available"
      action="Refresh"
      :actionHandler="updateServiceWorker"
      v-if="updateAvailable"
    />
    <LayoutFooter />
  </div>
</template>

<script>
  import LayoutFooter from './LayoutFooter.vue'
  import LayoutHeader from './LayoutHeader.vue'
  import Toast from './Toast.vue'

  export default {
    name: 'Layout',
    props: {
      updateAvailable: {
        type: Boolean,
        required: true
      },
      updateServiceWorker: {
        type: Function,
        required: true
      }
    },
    components: { LayoutFooter, LayoutHeader, Toast }
  }
</script>
