import createApp from './create-app'
import initServiceWorker from './service-worker'
import {
  open as openDb,
  criteriaAdd as dbCriteriaAdd,
  criteriaDelete as dbCriteriaDelete,
  criteriaClear as dbCriteriaClear,
  criteriaGet as dbCriteriaGet,
  ideaAdd as dbIdeaAdd,
  ideaDelete as dbIdeaDelete,
  ideasClear as dbIdeasClear,
  ideasGet as dbIdeasGet
} from './db'
import { sortIdeas, sortCriterias } from './helpers'

const calculateScore = (criterias, criteriaScores) => {
  const hasScore = Object.keys(criteriaScores).reduce((x, id) => (
    x && criteriaScores[ id ] !== null
  ))

  if (!hasScore) {
    return null
  }

  let totalWeight = 0

  return criterias.map(criteria => {
    totalWeight += criteria.weight
    return [ criteria.weight, criteriaScores[ criteria.id ] ]
  }).reduce((accumulatedScore, [ nextWeight, nextScore ]) => (
    accumulatedScore + nextScore * nextWeight / totalWeight
  ), 0)
}

openDb()
  .then(db => {
    const criteriaAdd = function (criteria) {
      const nextCriterias = [ ...this.$root.criterias, criteria ].sort(sortCriterias)

      this.$root.criterias = nextCriterias

      this.$root.ideas = this.$root.ideas.map(idea => {
        const nextIdea = {
          ...idea,
          criteriaScores: { ...idea.criteriaScores, [criteria.id]: null }
        }

        delete nextIdea.score

        return nextIdea
      }).sort(sortIdeas)

      Promise.all([
        dbCriteriaAdd(db, criteria),
        Promise.all(this.$root.ideas.map(idea => dbIdeaAdd(db, idea)))
      ])
        .then(() => console.log(`"${criteria.title}" saved to your browser's local DB`))
        .catch(err => {
          console.error(`Sorry, we failed to save "${criteria.title}" to your browser's local DB.`, err)
        })
    }

    const criteriaDelete = function (criteria) {
      for (let i = 0, l = this.$root.criterias.length; i < l; i++) {
        if (criteria.id === this.$root.criterias[ i ].id) {
          this.$root.criterias.splice(i, 1)
          break
        }
      }

      this.$root.ideas = this.$root.ideas.map(idea => {
        const nextCriteriaScores = { ...idea.criteriaScores }

        delete nextCriteriaScores[ criteria.id ]

        const nextIdea = {
          ...idea,
          criteriaScores: nextCriteriaScores,
          score: calculateScore(this.$root.criterias, nextCriteriaScores)
        }

        if (!nextIdea.score) {
          delete nextIdea.score
        }

        return nextIdea
      }).sort(sortIdeas)

      Promise.all([
        dbCriteriaDelete(db, criteria),
        Promise.all(this.$root.ideas.map(idea => dbIdeaAdd(db, idea)))
      ])
        .then(() => console.log(`"${criteria.title}" deleted from your browser's local DB`))
        .catch(err => {
          console.error(`Sorry, we failed to delete "${criteria.title}" from your browser's local DB.`, err)
        })
    }

    const ideaAdd = function (idea) {
      this.$root.ideas.push(idea)
      this.$root.ideas.sort(sortIdeas)

      dbIdeaAdd(db, idea)
        .then(() => console.log(`"${idea.title}" saved to your browser's local DB`))
        .catch(err => {
          console.error(`Sorry, we failed to save "${idea.title}" to your browser's local DB.`, err)
        })
    }

    const ideaDelete = function (idea) {
      for (let i = 0, l = this.$root.ideas.length; i < l; i++) {
        if (idea.id === this.$root.ideas[ i ].id) {
          this.$root.ideas.splice(i, 1)
          break
        }
      }

      dbIdeaDelete(db, idea)
        .then(() => console.log(`"${idea.title}" deleted from your browser's local DB`))
        .catch(err => {
          console.error(`Sorry, we failed to delete "${idea.title}" from your browser's local DB.`, err)
        })
    }

    const ideaScore = function (idea, criteriaScores) {
      const ideaIndex = this.$root.ideas.indexOf(idea)

      const nextIdea = {
        ...idea,
        criteriaScores,
        score: calculateScore(this.$root.criterias, criteriaScores)
      }

      if (!nextIdea.score) {
        delete nextIdea.score
      }

      this.$root.ideas[ ideaIndex ] = nextIdea

      this.$root.ideas.sort(sortIdeas)

      dbIdeaAdd(db, nextIdea)
        .then(() => console.log(`"${idea.title}" scores saved to your browser's local DB`))
        .catch(err => {
          console.error(`Sorry, we failed to save "${idea.title}" scores to your browser's local DB.`, err)
        })
    }

    const upload = function ({ ideas, criterias }) {
      this.$root.ideas = ideas
      this.$root.criterias = criterias

      Promise.all([ dbIdeasClear(db), dbCriteriaClear(db) ])
        .then(() => Promise.all(
          ideas
            .map(idea => dbIdeaAdd(db, idea))
            .concat(
              criterias.map(criteria => dbCriteriaAdd(db, criteria))
            )
        ))
        .then(() => console.log(`Your uploaded ideas were synced with your browser's local DB`))
        .catch(err => {
          console.log(`Sorry, your uploaded ideas were not synced with your browser's local DB.`, err)
        })
    }

    const state = {
      criteriaAdd,
      criteriaDelete,
      criterias: [],
      ideaAdd,
      ideaDelete,
      ideaScore,
      ideas: [],
      upload,
      updateAvailable: false,
      updateServiceWorker: worker => worker.postMessage({ action: 'skipWaiting' })
    }

    const app = createApp(state, '#app')

    Promise.all([ dbIdeasGet(db), dbCriteriaGet(db) ])
      .then(([ ideas, criterias ]) => {
        state.ideas = ideas
        state.criterias = criterias
      })
      .catch(err => {
        console.error(`Sorry, we failed to fetch data from your browser's local database.`, err)
      })

    if (!__DEV__) {
      initServiceWorker(state)
    }
  })
  .catch(err => {
    console.error(`Sorry, we failed to open your browser's local database.`, err)
  })
