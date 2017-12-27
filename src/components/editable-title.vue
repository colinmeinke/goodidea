<template>
  <div>
    <h1>{{ message }}</h1>
    <input type="text" v-model="message" />
  </div>
</template>

<script>
  export default {
    name: 'editable-title',
    props: {
      initialMessage: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
        message: this.initialMessage
      }
    }
  }
</script>
