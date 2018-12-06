const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/renderer',
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, '../out'),
    publicPath: './out/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|ico|svg)$/i,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        use: ['url-loader']
      }
    ]
  },
  externals: [nodeExternals({
    whitelist: ['typeface-quicksand']
  })],
  target: 'node'
}
