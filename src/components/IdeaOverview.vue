<template>
  <li>
    <h3>{{ idea.title }}</h3>
    <p v-if="idea.description">{{ idea.description }}</p>

    <ScoreForm
      :criterias="criterias"
      :idea="idea"
      :ideaScore="ideaScore"
    />

    <p>
      <strong>
        Score: {{ idea.score || '?' }}
      </strong>
    </p>

    <button type="button" v-on:click.prevent="deleteHandler">
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
    methods: {
      deleteHandler: function () {
        this.ideaDelete(this.idea)
      },
      rankHandler: function () {
        alert('SHOW RANK UI')
      }
    },
    components: { ScoreForm }
  }
</script>
