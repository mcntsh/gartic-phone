const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = (env) => ({
  entry: './server/index.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('build'),
    filename: 'server.js',
  },

  watch: env.watch,
  watchOptions: {
    ignored: ['build', 'node_modules', 'client'],
  },

  devtool: env.development ? 'eval-cheap-source-map' : undefined,
  optimization: {
    minimize: !env.development,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'webpack-import-glob-loader',
          },
          {
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
        ],
      },

      {
        test: /\.css/,
        use: {
          loader: 'ignore-loader',
        },
      },
    ],
  },
})
