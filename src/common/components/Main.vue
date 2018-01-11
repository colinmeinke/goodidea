<template>
  <main :class="showCriteria ? 'show-criteria' : ''">
    <div class="ideas">
      <div class="container">
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
      </div>
    </div>

    <div class="criteria">
      <div class="container">
        <CriteriaList>
          <CriteriaOverview
            v-for="(criteria, i) in criterias"
            :key="i"
            :criteria="criteria"
            :criteriaDelete="criteriaDelete"
          />
        </CriteriaList>

        <CriteriaAddForm :criteriaAdd="criteriaAdd" />
      </div>
    </div>
  </main>
</template>

<script>
  import CriteriaAddForm from './CriteriaAddForm.vue'
  import CriteriaList from './CriteriaList.vue'
  import CriteriaOverview from './CriteriaOverview.vue'
  import IdeaAddForm from './IdeaAddForm.vue'
  import IdeaList from './IdeaList.vue'
  import IdeaOverview from './IdeaOverview.vue'

  export default {
    name: 'Main',
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
      showCriteria: {
        type: Boolean,
        required: true
      }
    },
    components: {
      CriteriaAddForm,
      CriteriaList,
      CriteriaOverview,
      IdeaAddForm,
      IdeaList,
      IdeaOverview
    }
  }
</script>

<style scoped>
  main {
    display: flex;
    transition: transform 0.3s ease-in-out;
    width: 200vw;
  }

  .show-criteria {
    transform: translateX(-100vw);
  }

  .ideas,
  .criteria {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding: 14px 14px calc(14px * 4);
    width: 50%;
  }

  .container {
    max-width: 600px;
  }
</style>
