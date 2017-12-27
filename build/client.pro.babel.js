import path from 'path'
import uglify from 'uglifyjs-webpack-plugin'
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
      vue: 'vue/dist/vue.min.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new uglify()
  ]
}
