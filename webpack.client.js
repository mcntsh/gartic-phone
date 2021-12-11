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
  watch: env.watch,
  watchOptions: {
    ignored: ['build', 'node_modules', 'server'],
  },

  devtool: env.development ? 'eval-cheap-source-map' : undefined,
  optimization: {
    minimize: !env.development,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('client/index.html'),
      publicPath: '/',
    }),
  ],
})
