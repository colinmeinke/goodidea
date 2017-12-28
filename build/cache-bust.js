const path = require('path')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const { hashFileName, hashFromFile, replace } = require('./helpers')

const staticDir = path.resolve(__dirname, '../static')
const distDir = path.resolve(__dirname, '../dist')

fs.readdirAsync(staticDir)
  .then(files => Promise.all(files.map(fileName => (
    new Promise((resolve, reject) => {
      hashFromFile(`${staticDir}/${fileName}`)
        .then(hash => {
          const hashedFileName = hashFileName(fileName, hash)

          fs.renameAsync(`${staticDir}/${fileName}`, `${staticDir}/${hashedFileName}`)
            .then(() => resolve([ fileName, hashedFileName ]))
        })
        .catch(reject)
    })
  ))))
  .then(replaceData => new Promise((resolve, reject) => {
    fs.readdirAsync(distDir)
      .then(files => Promise.all(files.map(fileName => (
        replace(`${distDir}/${fileName}`, replaceData)
      ))))
      .then(resolve)
      .catch(reject)
  }))
  .then(() => console.log('Cache busting succeeded!'))
  .catch(err => console.error('Cache busting failed', err))
