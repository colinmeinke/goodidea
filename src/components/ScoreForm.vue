<template>
  <form v-on:submit.prevent="submitHandler">
    <h4>Score this idea</h4>

    <ScoreFormField
      v-for="(criteria, i) in criterias"
      :criteria="criteria"
      :ideaId="idea.id"
      :initialScore="idea.criteriaScores[ criteria.id ]"
      :key="i"
      :ref="criteria.id"
      :changeHandler="isDisabled"
    />

    <button type="submit" :disabled="disabled">
      Save scores
    </button>
  </form>
</template>

<script>
  import ScoreFormField from './ScoreFormField.vue'

  export default {
    name: 'ScoreForm',
    data: function () {
      return {
        disabled: true
      }
    },
    props: {
      criterias: {
        type: Array,
        required: true
      },
      idea: {
        type: Object,
        required: true
      },
      ideaScore: {
        type: Function,
        required: true
      }
    },
    methods: {
      isDisabled: function () {
        const criteriaScores = this.getCriteriaScores()
        const valid = this.validForm(criteriaScores)
        this.disabled = !this.validForm(criteriaScores)
      },
      validForm: criteriaScores => (
        Object.keys(criteriaScores).reduce((isValid, nextKey) => (
          isValid && criteriaScores[ nextKey ] !== null
        ), true)
      ),
      getCriteriaScores: function () {
        const criteriaScores = {}

        for (let i = 0, l = this.criterias.length; i < l; i++) {
          const criteria = this.criterias[ i ]
          const v = this.$refs[ criteria.id ][ 0 ].$refs.input.value
          const value = Math.max(Math.min(parseInt(v, 10), 10), 1) || null
          criteriaScores[ criteria.id ] = value
        }

        return criteriaScores
      },
      submitHandler: function () {
        const criteriaScores = this.getCriteriaScores()

        if (this.validForm(criteriaScores)) {
          this.ideaScore(this.idea, criteriaScores)
        }
      }
    },
    components: { ScoreFormField }
  }
</script>
