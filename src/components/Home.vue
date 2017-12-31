<template>
  <div>
    <IdeaList>
      <IdeaOverview
        v-for="(idea, i) in ideas"
        :key="i"
        :idea="idea"
        :ideaDelete="ideaDelete"
      />
    </IdeaList>
    <IdeaAddForm :ideaAdd="ideaAdd" />
    <IdeasDownload :ideas="ideas" />
    <IdeasUpload :ideasUpload="ideasUpload" />
  </div>
</template>

<script>
  import IdeaAddForm from './IdeaAddForm.vue'
  import IdeaList from './IdeaList.vue'
  import IdeaOverview from './IdeaOverview.vue'
  import IdeasDownload from './IdeasDownload.vue'
  import IdeasUpload from './IdeasUpload.vue'

  export default {
    name: 'Home',
    props: {
      ideaAdd: {
        type: Function,
        required: true
      },
      ideaDelete: {
        type: Function,
        required: true
      },
      ideas: {
        type: Array,
        required: true
      },
      ideasUpload: {
        type: Function,
        required: true
      }
    },
    components: {
      IdeaAddForm,
      IdeaList,
      IdeaOverview,
      IdeasDownload,
      IdeasUpload
    }
  }
</script>
