const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './client/index',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../public')
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
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|ico|svg)$/i,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './client/favicon',
        to: '',
        toType: 'dir'
      }
    ])
  ],
  target: 'web'
}
