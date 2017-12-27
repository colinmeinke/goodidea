import compression from 'compression'
import { createRenderer } from 'vue-server-renderer'
import express from 'express'
import fs from 'fs'
import home from './components/home.vue'
import path from 'path'
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
    template: `<home></home>`,
    components: { home }
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
