<template>
  <form v-on:submit.prevent="submitHandler">
    <h2>Add a new idea</h2>
    <label for="idea-title">
      Title
      <input
        type="text"
        name="title"
        ref="ideaAddTitle"
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
  import shortid from 'shortid'

  export default {
    name: 'IdeaAddForm',
    data: () => ({
      title: '',
      disabled: true
    }),
    props: {
      ideaAdd: {
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
            this.ideaAdd({
              id: shortid.generate(),
              created: Date.now(),
              title
            })

            this.title = ''
            this.keyupHandler()
            this.$refs.ideaAddTitle.focus()
          }
        }
      }
    }
  }
</script>
