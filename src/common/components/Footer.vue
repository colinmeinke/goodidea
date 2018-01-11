<template>
  <footer>
    <div class="container">
      <h2>
        Work offline
      </h2>

      <p>
        This is a progressive web app that serves a cached version of the UI by
        default, even when you have no connection!
      </p>

      <h2>
        Save ideas locally
      </h2>

      <p>
        Ideas are saved and read from your browser's local database. Your ideas
        are never sent to a server, so nobody else ever knows of their
        existence!
      </p>

      <p>
        The downside with this is that if your browser decides to wipe its local
        database, then your list of ideas will be lost forever. That's why it's
        recommended to download your ideas to file each time you finish working
        on them — just in case!
      </p>

      <div class="buttons">
        <Download :ideas="ideas" :criterias="criterias" />
        <Upload :upload="upload" />
      </div>

      <p class="smallprint">
        Made by <a href="https://colinmeinke.com">Colin Meinke</a> ·
        <a href="https://github.com/colinmeinke/goodidea">View on Github</a>
      </p>
    </div>
  </footer>
</template>

<script>
  import Download from './Download.vue'
  import Upload from './Upload.vue'

  export default {
    name: 'Footer',
    props: {
      criterias: {
        type: Array,
        required: true
      },
      ideas: {
        type: Array,
        required: true
      },
      upload: {
        type: Function,
        required: true
      }
    },
    components: { Download, Upload }
  }
</script>

<style scoped>
  footer {
    background-color: #F9FAF7;
    display: flex;
    justify-content: center;
    padding: calc(14px * 3) calc(14px * 2) calc(14px * 2);
  }

  .container {
    max-width: 600px;
  }
</style>
