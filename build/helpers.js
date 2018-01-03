const crypto = require('crypto')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

const fileNameExt = fileName => {
  const fileNameParts = fileName.split('.')
  const ext = fileNameParts.pop()
  return { name: fileNameParts.join('.'), ext }
}

const hashFileName = (fileName, hash) => {
  const { name, ext } = fileNameExt(fileName)
  return `${name}.${hash}.${ext}`
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
  const parts = filePath.split('/')
  const fileName = parts.pop()
  const dir = parts.join('/')
  const { name, ext } = fileNameExt(fileName)
  const tmpFilePath = `${dir}/${name}.tmp.${ext}`
  const readStream = fs.createReadStream(filePath)
  const writeStream = fs.createWriteStream(tmpFilePath)

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
    fs.renameAsync(tmpFilePath, filePath)
      .then(resolve)
      .catch(reject)
  })
})

module.exports = {
  hashFileName,
  hashFromFile,
  replace
}
