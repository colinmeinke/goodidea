<template>
  <div>
    <button type="button" v-on:click="download">
      Download
    </button>

    <a
      :href="file"
      :download="fileName"
      ref="download"
    >
    </a>
  </div>
</template>

<script>
  export default {
    name: 'DataDownload',
    props: {
      ideas: {
        type: Array,
        required: true
      },
      criterias: {
        type: Array,
        required: true
      }
    },
    data: () => ({
      file: '',
      fileName: 'ideas.json'
    }),
    methods: {
      download: function () {
        const ideasJson = JSON.stringify({
          ideas: this.ideas,
          criterias: this.criterias
        })

        this.file = `data:text/json;charset=utf-8,${encodeURIComponent(ideasJson)}`
        this.fileName = `ideas-${Date.now()}.json`

        setTimeout(() => this.$refs.download.click(), 0)
      }
    }
  }
</script>

<style scoped>
  a {
    display: none;
  }
</style>
