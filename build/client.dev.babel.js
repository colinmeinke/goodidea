import path from 'path'
import webpack from 'webpack'

export default {
  entry: './src/client.js',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, '..', 'public')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}
