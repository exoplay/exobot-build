const chalk = require('chalk');
const webpack = require('webpack');
const path = require('path');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const externals = require('webpack-node-externals');

module.exports = function (options) {
  if (typeof options.extensions === 'string') {
    options.extensions = options.extensions.split(',');
  }

  const extensions = ['.js', '.json'];

  const input = options.input;
  const output = options.output;
  const cwd = options.cwd;

  const sourceDir = path.parse(input).dir;
  const destDir = path.parse(output).dir;
  const modulesDir = path.join(cwd, 'node_modules');

  return {
    mode: process.env.NODE_ENV || 'production',
    target: 'node',
    externals: [ externals({ modulesDir }) ],
    devtool: 'source-map',
    context: path.join(cwd, sourceDir),
    entry: {
      js: path.parse(input).base,
    },
    output: {
      path: path.join(cwd, destDir),
      filename: path.parse(output).base,
      libraryTarget: 'commonjs'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: [
              '@babel/env',
              'babel-preset-minify',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { 'legacy': true }],
              ['@babel/plugin-proposal-class-properties', { 'loose' : true }],
              'babel-plugin-syntax-export-extensions',
            ],
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
      _filename: false,
      __dirname: false,
    }
  };
};
