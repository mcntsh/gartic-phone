const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => ({
  entry: './client/index.js',

  output: {
    path: path.resolve('build'),
    filename: 'client.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
      },
    ],
  },
  watch: env.run,
  watchOptions: {
    ignored: ['build', 'node_modules', 'server'],
  },

  optimization: {
    minimize: false,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('client/index.html'),
      publicPath: '/',
    }),
  ],
})
