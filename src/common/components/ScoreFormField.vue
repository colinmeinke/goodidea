<template>
  <label :for="id">
    {{ criteria.title }}
    <input
      type="number"
      :name="id"
      :id="id"
      min="1"
      max="10"
      step="1"
      ref="input"
      v-model.number="score"
      v-on:change.prevent="changeHandler"
      v-on:keyup.prevent="changeHandler"
    />
  </label>
</template>

<script>
  export default {
    name: 'ScoreFormField',
    data: function () {
      return {
        score: this.initialScore
      }
    },
    props: {
      criteria: {
        type: Object,
        required: true
      },
      ideaId: {
        type: String,
        required: true
      },
      initialScore: {
        type: Number
      },
      changeHandler: {
        type: Function,
        required: true
      }
    },
    computed: {
      id: function () {
        return `score${this.ideaId}${this.criteria.id}`
      }
    }
  }
</script>

<style scoped>
</style>
