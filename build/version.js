const { hashFromFile, replace } = require('./helpers')
const path = require('path')
const Promise = require('bluebird')

const filePath = path.resolve(__dirname, '../dist/sw.js')

hashFromFile(filePath)
  .then(hash => replace(filePath, [{
    find: '__VERSION__',
    replace: `'${hash}'` }
  ]))
  .then(() => console.log('Versioning succeeded!'))
  .catch(err => console.error('Versioning failed', err))
