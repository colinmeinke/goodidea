const path = require('path')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const { hashFileName, hashFromFile, replace } = require('./helpers')

const staticDir = path.resolve(__dirname, '../static')
const distDir = path.resolve(__dirname, '../dist')

const hashFile = (dir, fileName) => new Promise((resolve, reject) => {
  hashFromFile(`${dir}/${fileName}`)
    .then(hash => {
      const hashedFileName = hashFileName(fileName, hash)

      fs.renameAsync(`${dir}/${fileName}`, `${dir}/${hashedFileName}`)
        .then(() => resolve({ find: fileName, replace: hashedFileName }))
    })
    .catch(reject)
})

const hashAllFiles = dir => new Promise((resolve, reject) => {
  fs.readdirAsync(dir)
    .then(files => Promise.all(files.map(fileName => new Promise((res, rej) => {
      fs.lstatAsync(`${dir}/${fileName}`)
        .then(stat => {
          if (stat.isDirectory()) {
            res(hashAllFiles(`${dir}/${fileName}`))
          } else {
            res(hashFile(dir, fileName))
          }
        })
        .catch(rej)
    }))))
    .then(data => {
      resolve(data.reduce((nextData, x) => {
        if (Array.isArray(x)) {
          return nextData.concat(x)
        } else {
          nextData.push(x)
          return nextData
        }
      }, []))
    })
    .catch(reject)
})

hashAllFiles(staticDir)
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
