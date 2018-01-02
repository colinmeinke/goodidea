<template>
  <li>
    <h3>{{ idea.title }}</h3>

    <p v-if="idea.description">{{ idea.description }}</p>

    <p>
      <strong>
        Score:
        {{
          idea.score
            ? idea.score % 1 === 0
              ? idea.score
              : Number((idea.score).toFixed(1))
            : '?'
        }}
      </strong>
    </p>

    <ScoreForm
      :criterias="criterias"
      :idea="idea"
      :ideaScore="ideaScore"
      :onSubmit="toggleScoreForm"
      v-if="showScoreForm"
    />

    <button type="button" v-on:click.prevent="toggleScoreForm">
      {{ showScoreForm ? 'Cancel' : 'Edit score' }}
    </button>

    <button type="button" v-on:click.prevent="deleteIdea">
      Delete
    </button>
  </li>
</template>

<script>
  import ScoreForm from './ScoreForm.vue'

  export default {
    name: 'IdeaOverview',
    props: {
      criterias: {
        type: Array,
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
      idea: {
        type: Object,
        required: true
      }
    },
    data: function () {
      return {
        showScoreForm: false
      }
    },
    methods: {
      deleteIdea: function () {
        this.ideaDelete(this.idea)
      },
      toggleScoreForm: function () {
        this.showScoreForm = !this.showScoreForm
      }
    },
    components: { ScoreForm }
  }
</script>
