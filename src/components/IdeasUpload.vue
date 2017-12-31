<template>
  <form enctype="multipart/form-data">
    <label for="upload">
      Upload ideas from file
      <input
        id="upload"
        name="upload"
        type="file"
        accept=".json"
        ref="upload"
        :disabled="uploading"
        v-on:change="upload"
      />
    </label>

    <p v-if="uploading">
      Uploading...
    </p>
  </form>
</template>

<script>
  export default {
    name: 'IdeasUpload',
    props: {
      ideasUpload: {
        type: Function,
        required: true
      }
    },
    data: () => ({
      uploading: false
    }),
    methods: {
      validate: result => {
        try {
          const ideas = JSON.parse(result).ideas

          if (!ideas || !Array.isArray(ideas)) {
            throw new TypeError(`The file must have an ideas property, and it must be an array`)
          }

          return ideas.map(idea => {
            if (typeof idea !== 'object') {
              throw new TypeError(`An idea must be an object`)
            }

            const { id, created, title } = idea

            if (typeof id !== 'string') {
              throw new TypeError(`An idea must have an id property, and it must be a string`)
            }

            if (typeof created !== 'number') {
              throw new TypeError(`An idea must have a created property, and it must be a number`)
            }

            if (typeof title !== 'string') {
              throw new TypeError(`An idea must have a title property, and it must be a string`)
            }

            return { id, created, title }
          })
        } catch (err) {
          return err
        }
      },
      upload: function ({ target }) {
        const file = target.files[ 0 ]

        if (file) {
          this.uploading = true

          const reader = new FileReader()

          reader.onload = ({ target }) => {
            this.uploading = false

            const ideas = this.validate(target.result)

            if (ideas instanceof Error) {
              console.error(`Sorry, your ideas upload failed.`, ideas.message)
            } else {
              this.ideasUpload(ideas)
            }
          }

          reader.onerror = () => {
            this.uploading = false
            console.error(`Sorry, your file upload failed`)
          }

          reader.readAsText(file);
        }
      }
    }
  }
</script>
