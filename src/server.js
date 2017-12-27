import compression from 'compression'
import { createRenderer } from 'vue-server-renderer'
import editableTitle from './components/editable-title.vue'
import express from 'express'
import fs from 'fs'
import path from 'path'
import toast from './components/toast.vue'
import Vue from 'vue'

const port = 3000

const server = express()

const renderer = createRenderer({
  template: fs.readFileSync('./src/page.html', 'utf-8')
})

if (process.env.NODE_ENV === 'production') {
  server.use(compression())
}

server.use(express.static('public'))

server.get('/', (req, res) => {
  const app = new Vue({
    data: {
      updateAvailable: false,
      updateServiceWorker: () => ({})
    },
    template: `
      <div id="app">
        <editable-title
          initialMessage="Good idea!"
        >
        </editable-title>
        <toast
          message="An update is available"
          action="Update"
          :actionHandler="updateServiceWorker"
          v-if="updateAvailable"
        >
        </toast>
      </div>
    `,
    components: { editableTitle, toast }
  })

  const context = {
    description: 'Rank your ideas based on your own criteria',
    title: 'Good idea!',
  }

  renderer.renderToString(app, context).then(html => {
    res.end(html)
  }).catch(err => {
    res.status(500).end(err)
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
