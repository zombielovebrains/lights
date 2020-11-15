const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/dist/',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentedSyntax: true
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    // убедитесь что подключили плагин!
    new VueLoaderPlugin()
  ]
};