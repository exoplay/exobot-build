/* globals __non_webpack_require__ */
/* eslint no-console: 0 */

import path from 'path';
import webpack from 'webpack';
import yargs from 'yargs';

import baseConfig from './webpackConfig';


const defaultName = `${path.parse(process.cwd()).name }.js`;

const inputOption = {
  alias: 'i',
  default: `./src/${defaultName}`,
};

const outputOption = {
  alias: 'o',
  default: defaultName,
};

const cwdOption = {
  default: process.cwd(),
};

const configOption = {
  alias: 'c',
  default: 'webpack.config.js',
};

const { argv } = yargs
              .usage('exobot-build [options]')
              .option('input', inputOption)
              .option('output', outputOption)
              .option('cwd', cwdOption)
              .option('config', configOption)
              .boolean('watch')
              .boolean('start')
              .help('help');

function logResult(err, stats) {
  if (err) {
    return console.error(err);
  }

  const jsonStats = stats.toJson();

  if (jsonStats.errors.length > 0) {
    return console.error(jsonStats.errors);
  }

  if (jsonStats.warnings.length > 0) {
    console.warn(jsonStats.warnings);
  }

  return console.log(`Built ${jsonStats.outputPath}/${jsonStats.assets[0].name}`);
}

function build(args, callback) {
  let webpackConfig = baseConfig({
    input: args.input,
    output: args.output,
    cwd: args.cwd,
  });

  if (args.config) {
    let configPath = args.config;

    if (configPath.indexOf('babel')) {
      __non_webpack_require__('@babel/register');
    }

    if (!path.isAbsolute(configPath)) {
      configPath = path.join(args.cwd, configPath);
    }

    const customConfig = __non_webpack_require__(configPath).default;
    webpackConfig = customConfig(webpackConfig);
  }

  const compiler = webpack(webpackConfig);

  if (argv.watch) {
    compiler.watch({}, (err, stats) => {
      logResult(err, stats);
      if (callback) {
        callback();
      }
    });
  } else {
    compiler.run((err, stats) => {
      logResult(err, stats);

      if (callback) {
        callback();
      } else {
        process.exit();
      }
    });
  }
}

build(argv);
