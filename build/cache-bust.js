const crypto = require('crypto')
const path = require('path')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

const staticDir = path.resolve(__dirname, '../static')
const distDir = path.resolve(__dirname, '../dist')

const hashFileName = (fileName, hash) => {
  const fileNameParts = fileName.split('.')
  const extension = fileNameParts.pop()
  return `${fileNameParts.join('.')}.${hash}.${extension}`
}

fs.readdirAsync(staticDir)
  .then(files => Promise.all(files.map(fileName => {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(`${staticDir}/${fileName}`)
      const h = crypto.createHash('md5')

      h.setEncoding('hex')

      h.on('finish', () => {
        const hash = h.read().slice(0, 10)
        const hashedFileName = hashFileName(fileName, hash)

        fs.renameAsync(`${staticDir}/${fileName}`, `${staticDir}/${hashedFileName}`)
          .then(() => resolve([ fileName, hashedFileName ]))
      })

      stream.pipe(h)
    })
  })))
  .then(data => new Promise((resolve, reject) => {
    fs.readdirAsync(distDir)
      .then(files => Promise.all(files.map(fileName => {
        return new Promise((res, rej) => {
          const readStream = fs.createReadStream(`${distDir}/${fileName}`)
          const writeStream = fs.createWriteStream(`${distDir}/${fileName}.tmp`)

          readStream.on('error', rej)
          writeStream.on('error', rej)

          readStream.on('data', chunk => {
            let content = chunk.toString()

            data.map(([ find, replace ]) => {
              content = content.replace(new RegExp(find, 'g'), replace)
            })

            writeStream.write(content, 'utf-8')
          })

          readStream.on('close', () => {
            fs.renameAsync(`${distDir}/${fileName}.tmp`, `${distDir}/${fileName}`)
              .then(res)
              .catch(rej)
          })
        })
      })))
      .then(resolve)
      .catch(reject)
  }))
  .then(() => console.log('Cache busting succeeded!'))
  .catch(err => console.log('Cache busting failed', err))
