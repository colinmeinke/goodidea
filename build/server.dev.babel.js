import fs from 'fs'
import path from 'path'
import webpack from 'webpack'

const externals = fs
  .readdirSync('node_modules')
  .filter(file => !file.includes('.bin'))
  .map(name => ({ [name]: `commonjs ${name}` }))
  .reduce((p, c) => ({ ...p, ...c }))

export default {
  entry: './src/server.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  externals,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(js|vue)$/,
        loader: 'string-replace-loader',
        query: {
          search: '__DEV__',
          replace: 'true',
          flags: 'g'
        }
      }
    ]
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  }
}
