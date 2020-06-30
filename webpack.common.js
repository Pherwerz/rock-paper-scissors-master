const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js', // where webpack starts looking

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './src/img',
          to: 'img'
        }
      ]
    })
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: ['html-loader?minimize=false']
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
