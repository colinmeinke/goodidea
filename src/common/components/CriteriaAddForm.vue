<template>
  <form v-on:submit.prevent="submitHandler">
    <h3>Add a new criteria</h3>

    <label for="criteria-title">
      Title
      <input
        type="text"
        name="title"
        ref="criteriaAddTitle"
        id="criteria-title"
        v-model="title"
        v-on:change.prevent="changeHandler"
        v-on:keyup.prevent="changeHandler"
      />
    </label>

    <label for="criteria-description">
      Description
      <textarea
        name="description"
        id="criteria-description"
        v-model="description"
        v-on:change.prevent="changeHandler"
        v-on:keyup.prevent="changeHandler"
      /></textarea>
    </label>

    <label for="criteria-weight">
      Weight (between 1 and 10)
      <input
        type="number"
        name="weight"
        id="criteria-weight"
        min="1"
        max="10"
        step="1"
        v-model.number="weight"
        v-on:change.prevent="changeHandler"
      />
    </label>

    <button
      type="submit"
      :disabled="disabled"
    >
      Add new criteria
    </button>
  </form>
</template>

<script>
  import shortid from 'shortid'

  export default {
    name: 'CriteriaAddForm',
    data: () => ({
      title: '',
      description: '',
      weight: 5,
      disabled: true
    }),
    props: {
      criteriaAdd: {
        type: Function,
        required: true
      }
    },
    methods: {
      changeHandler: function () {
        this.disabled = !this.validForm()
      },
      validForm: function () {
        return this.validTitle(this.title) &&
          this.validDescription(this.description) &&
          this.validWeight(this.weight)
      },
      validTitle: title => (
        typeof title === 'string' && title.trim().length
      ),
      validDescription: description => typeof description === 'string',
      validWeight: weight => (
        typeof weight === 'number' &&
        weight % 1 === 0 &&
        weight >= 1 &&
        weight <= 10
      ),
      submitHandler: function () {
        if (this.validForm()) {
          this.criteriaAdd({
            id: shortid.generate(),
            created: Date.now(),
            title: this.title.trim(),
            description: this.description.trim(),
            weight: this.weight
          })

          this.title = ''
          this.description = ''
          this.weight = 5
          this.$refs.criteriaAddTitle.focus()
        }
      }
    }
  }
</script>

<style scoped>
</style>
