const path = require('path')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const { hashFileName, hashFromFile, replace } = require('./helpers')

const iconsDir = path.resolve(__dirname, '../static/icons')
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

const hashFiles = (dir, files) => new Promise((resolve, reject) => {
  Promise.all(files.map(file => (
    new Promise((res, rej) => {
      fs.lstatAsync(`${dir}/${file}`)
        .then(stat => {
          if (stat.isDirectory()) {
            const subdir = `${dir}/${file}`

            fs.readdirAsync(subdir).then(subdirFiles => {
              res(hashFiles(subdir, subdirFiles))
            })
          } else {
            res(hashFile(dir, file))
          }
        })
        .catch(rej)
    })
  ))).then(data => {
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

const findAndReplace = (dir, replaceData) => new Promise((resolve, reject) => {
  fs.readdirAsync(dir)
    .then(files => Promise.all(files.map(fileName => new Promise((res, rej) => {
      fs.lstatAsync(`${dir}/${fileName}`)
        .then(stat => {
          if (stat.isDirectory()) {
            findAndReplace(`${dir}/${fileName}`, replaceData).then(res)
          } else {
            replace(`${dir}/${fileName}`, replaceData).then(res)
          }
        })
        .catch(rej)
    }))))
    .then(resolve)
    .catch(reject)
})

const replaceInFiles = replaceData => Promise.all([
  findAndReplace(distDir, replaceData),
  findAndReplace(staticDir, replaceData)
])

fs.readdirAsync(iconsDir)
  .then(iconFiles => hashFiles(iconsDir, iconFiles))
  .then(replaceInFiles)
  .then(() => hashFiles(staticDir, [ 'client.js', 'manifest.json' ]))
  .then(replaceInFiles)
  .then(() => console.log('Cache busting succeeded!'))
  .catch(err => console.error('Cache busting failed', err))
