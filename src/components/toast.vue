<template>
  <div>
    <p>{{ message }}</p>
    <button
      type="button"
      v-if="action"
      v-on:click="actionHandler"
    >
      {{ action }}
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      action: String,
      actionHandler: Function,
      message: {
        type: String,
        required: true
      }
    }
  }
</script>
