const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',
  entry: './index.js',
  output: {
      path: path.resolve(__dirname, '../AssLoader'),
    filename: 'inject.js'
  }
}