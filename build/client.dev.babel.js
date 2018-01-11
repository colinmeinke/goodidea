import path from 'path'
import webpack from 'webpack'

export default {
  entry: './src/client/index.js',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, '..', 'static')
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'string-replace-loader',
        query: {
          search: '__DEV__',
          replace: 'true',
          flags: 'g'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}
