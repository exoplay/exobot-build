const chalk = require('chalk');
const webpack = require('webpack');
const path = require('path');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const externals = require('webpack-node-externals');

module.exports = function (options) {
  if (typeof options.extensions === 'string') {
    options.extensions = options.extensions.split(',');
  }

  const sourceDir = options['source-directory'];
  const extensions = options.extensions;
  const destDir = options['dest-directory'];
  const input = options.input;
  const output = options.output;
  const cwd = options.cwd;

  return {
    target: 'node',
    externals: [ externals() ],
    devtool: 'inline-source-map',
    context: path.join(cwd, sourceDir),
    entry: {
      js: path.join(cwd, input),
    },
    output: {
      path: path.join(cwd, destDir),
      filename: output,
      libraryTarget: 'commonjs'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: [
              [ require.resolve('babel-preset-es2015'), {
                loose: true,
                modules: false
              } ],
              require.resolve('babel-preset-stage-2'),
            ],
            plugins: [
              'syntax-decorators',
              'transform-class-properties',
              'transform-decorators-legacy',
              'transform-decorators',
            ].map(p => require.resolve(`babel-plugin-${p}`))
          }
        }
      ]
    },
    resolve: {
      extensions: extensions,
      modules: [
        path.join(cwd, sourceDir),
      ]
    },
    plugins: [
      new ProgressBarPlugin({
        clear: false,
        format: 'build [:bar] ' + chalk.green(':percent') + ' (:elapsed seconds)',
      }),
      //new webpack.ProgressPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: true
      }),
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();require("regenerator-runtime/runtime");',
        raw: true,
        entryOnly: false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        debug: true,
        output: {
          comments: false
        },
        sourceMap: true
      }),
    ],
    node: {
      global: false,
      process: false,
      Buffer: false,
      crypto: false,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      clearTimeout: false,
      setTimeout: false,
      os: false,
      _filename: true,
      __dirname: true,
    }
  };
};
