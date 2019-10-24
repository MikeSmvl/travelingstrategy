var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
            test: /\.(le|c)ss$/,
            use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/')
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
      contentBase: 'public',
      hot: true,
      port: 3000
    }
  };
