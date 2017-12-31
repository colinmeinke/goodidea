<template>
  <div>
    <button type="button" v-on:click="download">
      Download ideas to file
    </button>

    <a
      :href="file"
      :download="fileName"
      ref="download"
      style="display: none;"
    >
    </a>
  </div>
</template>

<script>
  export default {
    name: 'IdeasDownload',
    props: {
      ideas: {
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
        const ideasJson = JSON.stringify({ ideas: this.ideas })

        this.file = `data:text/json;charset=utf-8,${encodeURIComponent(ideasJson)}`
        this.fileName = `ideas-${Date.now()}.json`

        setTimeout(() => this.$refs.download.click(), 0)
      }
    }
  }
</script>
