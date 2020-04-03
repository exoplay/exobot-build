import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import externals from 'webpack-node-externals';


export default (options) => {
  const extensions = ['.js', '.json'];

  const {
    input,
    output,
    cwd,
    env,
    minify,
    ...opts
  } = options;

  const sourceDir = path.parse(input).dir;
  const destDir = path.parse(output).dir;
  const modulesDir = path.join(cwd, 'node_modules');

  const babelEnv = env || {
    targets: {
      node: '10',
    },

    loose: true,
  };

  const babelMinify = minify || {
    mangle: false,
  };

  return {
    mode: process.env.NODE_ENV || 'production',
    target: 'node',
    externals: [externals({ modulesDir })],
    devtool: 'source-map',
    context: path.join(cwd, sourceDir),
    entry: {
      js: path.parse(input).base,
    },
    output: {
      path: path.join(cwd, destDir),
      filename: path.parse(output).base,
      libraryTarget: 'commonjs',
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
              ['@babel/env', babelEnv],
              ['babel-preset-minify', babelMinify],
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              'babel-plugin-syntax-export-extensions',
            ],
          },
        },
      ],
    },
    resolve: {
      extensions,
      modules: [
        path.join(cwd, sourceDir),
        path.join(cwd, 'node_modules'),
      ],
    },
    plugins: [
      new ProgressBarPlugin({
        clear: false,
        format: `build [:bar] ${chalk.green(':percent')} (:elapsed seconds)`,
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: true,
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
    },

    ...(opts || {}),
  };
};
