<template>
  <li>
    <h3>{{ criteria.title }}</h3>
    <p v-if="criteria.description">{{ criteria.description }}</p>
    <p>Weight: {{ criteria.weight }}</p>
    <button type="button" v-on:click.prevent="clickHandler">
      Delete
    </button>
  </li>
</template>

<script>
  export default {
    name: 'CriteriaOverview',
    props: {
      criteriaDelete: {
        type: Function,
        required: true
      },
      criteria: {
        type: Object,
        required: true
      }
    },
    methods: {
      clickHandler: function () {
        this.criteriaDelete(this.criteria)
      }
    }
  }
</script>

<style scoped>
</style>
