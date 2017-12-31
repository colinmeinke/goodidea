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
        v-on:change="changeHandler"
      />
    </label>

    <p v-if="uploading">
      Uploading...
    </p>
  </form>
</template>

<script>
  export default {
    name: 'DataUpload',
    props: {
      upload: {
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
          const { ideas, criterias } = JSON.parse(result)

          if (!ideas || !Array.isArray(ideas)) {
            throw new TypeError(`The file must have an ideas property, and it must be an array`)
          }

          if (!criterias || !Array.isArray(criterias)) {
            throw new TypeError(`The file must have an criterias property, and it must be an array`)
          }

          const validIdeas = ideas.map(idea => {
            if (typeof idea !== 'object') {
              throw new TypeError(`An idea must be an object`)
            }

            const { id, created, title, description } = idea

            if (typeof id !== 'string') {
              throw new TypeError(`An idea must have an id property, and it must be a string`)
            }

            if (typeof created !== 'number') {
              throw new TypeError(`An idea must have a created property, and it must be a number`)
            }

            if (typeof title !== 'string') {
              throw new TypeError(`An idea must have a title property, and it must be a string`)
            }

            if (typeof description !== 'string') {
              throw new TypeError(`An idea must have a description property, and it must be a string`)
            }

            return { id, created, title }
          })

          const validCriterias = criterias.map(criteria => {
            if (typeof criteria !== 'object') {
              throw new TypeError(`An criteria must be an object`)
            }

            const { id, created, title, description, weight } = criteria

            if (typeof id !== 'string') {
              throw new TypeError(`A criteria must have an id property, and it must be a string`)
            }

            if (typeof created !== 'number') {
              throw new TypeError(`A criteria must have a created property, and it must be a number`)
            }

            if (typeof title !== 'string') {
              throw new TypeError(`A criteria must have a title property, and it must be a string`)
            }

            if (typeof description !== 'string') {
              throw new TypeError(`A criteria must have a description property, and it must be a string`)
            }

            if (typeof weight !== 'number') {
              throw new TypeError(`A criteria must have a weight property, and it must be a number`)
            }

            return { id, created, title, description, weight }
          })

          return {
            ideas: validIdeas,
            criterias: validCriterias
          }
        } catch (err) {
          return err
        }
      },
      changeHandler: function ({ target }) {
        const file = target.files[ 0 ]

        if (file) {
          this.uploading = true

          const reader = new FileReader()

          reader.onload = ({ target }) => {
            this.uploading = false

            const data = this.validate(target.result)

            if (data instanceof Error) {
              console.error(`Sorry, your file upload failed.`, data.message)
            } else {
              this.upload(data)
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
