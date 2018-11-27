const path = require('path')

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
  target: 'web'
}
