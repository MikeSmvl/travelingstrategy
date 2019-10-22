var path = require('path');

module.exports = {
    entry: './src/App.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
            test: /\.(le|c)ss$/,
            use: ['style-loader', 'css-loader', 'less-loader']
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
      path: path.resolve(__dirname),
      filename: './dist/bundle.js'
    },
    devServer: {
      contentBase: './public',
      port: 3000
    }
  };
