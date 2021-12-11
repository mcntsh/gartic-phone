const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './server/index.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('build'),
    filename: 'server.js',
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
}
