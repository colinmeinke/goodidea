<template>
  <form v-on:submit.prevent="submitHandler">
    <h2>Add a new idea</h2>
    <label for="idea-title">
      Title
      <input
        type="text"
        name="title"
        ref="addIdeaTitle"
        id="idea-title"
        v-model="title"
        v-on:keyup.prevent="keyupHandler"
      />
    </label>
    <button
      type="submit"
      :disabled="disabled"
    >
      Add idea
    </button>
  </form>
</template>

<script>
  export default {
    name: 'AddIdeaForm',
    data: () => ({
      title: '',
      disabled: true
    }),
    props: {
      addIdea: {
        type: Function,
        required: true
      }
    },
    computed: {
      keyupHandler: function () {
        return function () {
          this.disabled = this.title.trim().length === 0
        }
      },
      submitHandler: function () {
        return function () {
          const title = this.title.trim()

          if (title.length) {
            this.addIdea({ title })
            this.title = ''
            this.keyupHandler()
            this.$refs.addIdeaTitle.focus()
          }
        }
      }
    }
  }
</script>
