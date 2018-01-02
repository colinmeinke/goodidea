<template>
  <form v-on:submit.prevent="submitHandler">
    <h3>Add a new idea</h3>

    <label for="idea-title">
      Title
      <input
        type="text"
        name="title"
        ref="ideaAddTitle"
        id="idea-title"
        v-model="title"
        v-on:change.prevent="changeHandler"
        v-on:keyup.prevent="changeHandler"
      />
    </label>

    <label for="idea-description">
      Description
      <textarea
        name="description"
        id="idea-description"
        v-model="description"
        v-on:change.prevent="changeHandler"
        v-on:keyup.prevent="changeHandler"
      /></textarea>
    </label>

    <button
      type="submit"
      :disabled="disabled"
    >
      Add new idea
    </button>
  </form>
</template>

<script>
  import shortid from 'shortid'

  export default {
    name: 'IdeaAddForm',
    data: () => ({
      title: '',
      description: '',
      disabled: true
    }),
    props: {
      ideaAdd: {
        type: Function,
        required: true
      }
    },
    methods: {
      changeHandler: function () {
        this.disabled = !this.validForm()
      },
      validForm: function () {
        return this.validTitle(this.title) && this.validDescription(this.description)
      },
      validTitle: title => (
        typeof title === 'string' && title.trim().length
      ),
      validDescription: description => typeof description === 'string',
      submitHandler: function () {
        if (this.validForm()) {
          this.ideaAdd({
            id: shortid.generate(),
            created: Date.now(),
            title: this.title.trim(),
            description: this.description.trim(),
            criteriaScores: {}
          })

          this.title = ''
          this.description = ''
          this.$refs.ideaAddTitle.focus()
        }
      }
    }
  }
</script>
