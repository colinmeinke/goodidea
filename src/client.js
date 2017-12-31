import createApp from './create-app'
import initServiceWorker from './service-worker'
import {
  open as openDb,
  ideaAdd as dbIdeaAdd,
  ideaDelete as dbIdeaDelete,
  ideasClear as dbIdeasClear,
  ideasGet as dbGetIdeas
} from './db'

openDb()
  .then(db => {
    const ideaAdd = function (idea) {
      this.$root.ideas.push(idea)

      dbIdeaAdd(db, idea)
        .then(() => console.log(`"${idea.title}" saved to your browser's local DB`))
        .catch(err => {
          console.error(`Sorry, we failed to save "${idea.title}" to your browser's local DB.`, err)
        })
    }

    const ideaDelete = function (idea) {
      const title = idea.title

      for (let i = 0, l = this.$root.ideas.length; i < l; i++) {
        if (idea.id === this.$root.ideas[ i ].id) {
          this.$root.ideas.splice(i, 1)
          break
        }
      }

      dbIdeaDelete(db, idea)
        .then(() => console.log(`"${title}" deleted from your browser's local DB`))
        .catch(err => {
          console.error(`Sorry, we failed to delete "${title}" from your browser's local DB.`, err)
        })
    }

    const ideasUpload = function (ideas) {
      this.$root.ideas = ideas

      dbIdeasClear(db)
        .then(() => Promise.all(
          ideas.map(idea => dbIdeaAdd(db, idea))
        ))
        .then(() => console.log(`Your uploaded ideas were synced with your browser's local DB`))
        .catch(err => {
          console.log(`Sorry, your uploaded ideas were not synced with your browser's local DB.`, err)
        })
    }

    const state = {
      ideaAdd,
      ideaDelete,
      ideas: [],
      ideasUpload,
      updateAvailable: false,
      updateServiceWorker: worker => worker.postMessage({ action: 'skipWaiting' })
    }

    const app = createApp(state, '#app')

    dbGetIdeas(db)
      .then(ideas => {
        if (ideas.length) {
          state.ideas = ideas
        }
      })
      .catch(err => {
        console.error(`Sorry, we failed to fetch the ideas from your browser's local database.`, err)
      })

    if (!__DEV__) {
      initServiceWorker(state)
    }
  })
  .catch(err => {
    console.error(`Sorry, we failed to open your browser's local database.`, err)
  })
