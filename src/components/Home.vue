<template>
  <div>
    <IdeaList>
      <IdeaOverview
        v-for="(idea, i) in ideas"
        :key="i"
        :criterias="criterias"
        :idea="idea"
        :ideaDelete="ideaDelete"
        :ideaScore="ideaScore"
      />
    </IdeaList>

    <IdeaAddForm :ideaAdd="ideaAdd" />

    <CriteriaList>
      <CriteriaOverview
        v-for="(criteria, i) in criterias"
        :key="i"
        :criteria="criteria"
        :criteriaDelete="criteriaDelete"
      />
    </CriteriaList>

    <CriteriaAddForm :criteriaAdd="criteriaAdd" />

    <DataDownload :ideas="ideas" :criterias="criterias" />

    <DataUpload :upload="upload" />
  </div>
</template>

<script>
  import CriteriaAddForm from './CriteriaAddForm.vue'
  import CriteriaList from './CriteriaList.vue'
  import CriteriaOverview from './CriteriaOverview.vue'
  import IdeaAddForm from './IdeaAddForm.vue'
  import IdeaList from './IdeaList.vue'
  import IdeaOverview from './IdeaOverview.vue'
  import DataDownload from './DataDownload.vue'
  import DataUpload from './DataUpload.vue'

  export default {
    name: 'Home',
    props: {
      criteriaAdd: {
        type: Function,
        required: true
      },
      criteriaDelete: {
        type: Function,
        required: true
      },
      criterias: {
        type: Array,
        required: true
      },
      ideaAdd: {
        type: Function,
        required: true
      },
      ideaDelete: {
        type: Function,
        required: true
      },
      ideaScore: {
        type: Function,
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
    components: {
      CriteriaAddForm,
      CriteriaList,
      CriteriaOverview,
      IdeaAddForm,
      IdeaList,
      IdeaOverview,
      DataDownload,
      DataUpload
    }
  }
</script>
