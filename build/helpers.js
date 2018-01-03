const crypto = require('crypto')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

const hashFileName = (fileName, hash) => {
  const fileNameParts = fileName.split('.')
  const extension = fileNameParts.pop()
  return `${fileNameParts.join('.')}.${hash}.${extension}`
}

const hashFromFile = filePath => new Promise((resolve, reject) => {
  const stream = fs.createReadStream(filePath)
  const h = crypto.createHash('md5')

  h.setEncoding('hex')

  h.on('finish', () => {
    resolve(h.read().slice(0, 10))
  })

  stream.on('error', reject)

  stream.pipe(h)
})

const replace = (filePath, replaceData) => new Promise((resolve, reject) => {
  const readStream = fs.createReadStream(filePath)
  const writeStream = fs.createWriteStream(`${filePath}.tmp`)

  readStream.on('error', reject)
  writeStream.on('error', reject)

  readStream.on('data', chunk => {
    let content = chunk.toString()

    replaceData.map(({ find, replace }) => {
      content = content.replace(new RegExp(find, 'g'), replace)
    })

    writeStream.write(content, 'utf-8')
  })

  readStream.on('close', () => {
    fs.renameAsync(`${filePath}.tmp`, filePath)
      .then(resolve)
      .catch(reject)
  })
})

module.exports = {
  hashFileName,
  hashFromFile,
  replace
}
