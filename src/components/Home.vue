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
  </div>
</template>

<script>
  import IdeaAddForm from './IdeaAddForm.vue'
  import IdeaList from './IdeaList.vue'
  import IdeaOverview from './IdeaOverview.vue'

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
      }
    },
    components: { IdeaAddForm, IdeaList, IdeaOverview }
  }
</script>
