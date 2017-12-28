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
  template: fs.readFileSync('./dist/page.html', 'utf-8')
})

if (process.env.NODE_ENV === 'production') {
  server.use(compression())
}

server.use(express.static('static', {
  maxage: process.env.NODE_ENV === 'production' ? '1y' : 0
}))

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
    res.header('Cache-Control', 'no-cache').end(html)
  }).catch(err => {
    res.status(500).end(err)
  })
})

server.get('/sw.js', (req, res) => {
  res
    .header('Cache-Control', 'no-cache')
    .sendFile(path.resolve(__dirname, '..', 'dist', 'sw.js'))
})

server.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
