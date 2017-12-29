<template>
  <div>
    <IdeaList>
      <IdeaOverview
        v-for="(idea, i) in ideas"
        :key="i"
        :idea="idea"
        :deleteIdea="deleteIdea"
      />
    </IdeaList>
    <AddIdeaForm :addIdea="addIdea" />
  </div>
</template>

<script>
  import AddIdeaForm from './AddIdeaForm.vue'
  import IdeaList from './IdeaList.vue'
  import IdeaOverview from './IdeaOverview.vue'

  export default {
    name: 'Home',
    props: {
      addIdea: {
        type: Function,
        required: true
      },
      deleteIdea: {
        type: Function,
        required: true
      },
      ideas: {
        type: Array,
        required: true
      }
    },
    components: { AddIdeaForm, IdeaList, IdeaOverview }
  }
</script>
