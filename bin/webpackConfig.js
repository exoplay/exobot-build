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
  const modulesDir = path.join(cwd, 'node_modules');

  return {
    target: 'node',
    externals: [ externals({ modulesDir }) ],
    devtool: 'source-map',
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
              require.resolve('babel-preset-stage-2'),
            ],
            plugins: [
              'transform-export-extensions',
              'syntax-decorators',
              'transform-decorators-legacy',
              'transform-decorators',

              /* a few things from es2015 preset */
              'transform-es2015-object-super',
              'transform-class-properties',
              'transform-es2015-classes',

              /* a few things from babili */
              'minify-constant-folding',
              'minify-dead-code-elimination',
              'minify-infinity',
              'minify-numeric-literals',
              'minify-replace',
              'transform-merge-sibling-variables',
              'transform-minify-booleans',
              'transform-regexp-constructors',
              'transform-remove-undefined',
              'transform-undefined-to-void',
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
      //new webpack.NoErrorsPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: true
      }),
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();require("regenerator-runtime/runtime");',
        raw: true,
        entryOnly: false,
      }),
      /*
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: true
        },
        mangle: false,
        debug: true,
        output: {
          comments: false
        },
        sourceMap: true
      }),
      */
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
