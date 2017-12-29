<template>
  <li>
    <h2>{{ idea.title }}</h2>
    <button type="button" v-on:click.prevent="clickHandler">
      Delete
    </button>
  </li>
</template>

<script>
  export default {
    name: 'IdeaOverview',
    props: {
      deleteIdea: {
        type: Function,
        required: true
      },
      idea: {
        type: Object,
        required: true
      }
    },
    computed: {
      clickHandler: function () {
        return function () {
          this.deleteIdea(this.idea)
        }
      }
    }
  }
</script>
