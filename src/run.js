import { Exobot } from '@exoplay/exobot';
import { camel } from 'change-case';

import webpack from 'webpack';
import path from 'path';
import fs from 'fs-extra';
import vm from 'vm';

import yeoman from 'yeoman-environment'

import { fork } from 'child_process';
import { execSync } from 'child_process';

import config from './webpackConfig';

import { app, plugin, adapter } from 'generator-exobot';

const yeomanEnv = yeoman.createEnv();
yeomanEnv.register(__non_webpack_require__.resolve('generator-exobot/generators/app'), 'exobot:app');
yeomanEnv.register(__non_webpack_require__.resolve('generator-exobot/generators/adapter'), 'exobot:adapter');
yeomanEnv.register(__non_webpack_require__.resolve('generator-exobot/generators/plugin'), 'exobot:plugin');

const defaultName = path.parse(process.cwd()).name + '.js';

const exampleConfig = {
  key: 'exobot-example',
  plugins: {
    shell: ['@exoplay/exobot', { import: 'adapters.Shell' }],
    http: ['@exoplay/exobot', { import: 'adapters.HTTP' }],
    uptime: ['@exoplay/exobot', { import: 'plugins.Uptime' }],
    help: ['@exoplay/exobot', { import: 'plugins.Help' }],
    greetings: ['@exoplay/exobot', { import: 'plugins.Greetings' }],
    permissions: ['@exoplay/exobot', { import: 'plugins.Permissions' }],
    config: ['@exoplay/exobot', { import: 'plugins.Config' }],
  },
};

const inputOption = {
  input: {
    alias: 'i',
    default: `./src/${defaultName}`,
  },
};

const outputOption = {
  output: {
    alias: 'o',
    default: defaultName,
  }
};

const cwdOption = {
  cwd: {
    default: process.cwd(),
  }
};

const watchOption = {
  watch: {
    alias: 'w',
    default: false,
  }
};

const forceOption = {
  force: {
    alias: 'f',
    default: false,
  }
};

const argv = require('yargs')
              .usage('exobot <command> [options]')
              .command('build', 'Builds exobot', {
                ...inputOption,
                ...outputOption,
                ...cwdOption,
                ...watchOption,
                ...forceOption,
              })
              .command('watch', 'Builds exobot', {
                ...inputOption,
                ...outputOption,
                ...cwdOption,
                ...forceOption,
                watch: {
                  ...watchOption.watch,
                  default: true,
                },
              })
              .command('run', 'Starts an exobot from config', {
                ...inputOption,
                ...outputOption,
                ...cwdOption,
                ...watchOption,
                ...forceOption,
                start: {
                  default: true,
                }
              })
              .command('example', 'Starts an exobot example', {
                ...inputOption,
                ...outputOption,
                ...cwdOption,
                ...forceOption,
              })
              .command('new <bot|plugin|adapter>', 'Bootstraps an exobot project', {
                ...inputOption,
                ...cwdOption,
                ...outputOption,
                ...forceOption,
                name: {
                  default: 'exobot',
                }
              })
              .demand(1)
              .boolean('watch')
              .boolean('start')
              .alias('h', 'help')
              .help('h')
              .argv;

function logResult (err, stats) {
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

  console.log(`Wrote to ${argv.o}`);
}

function build(args, callback) {
  const webpackConfig = config(argv);
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

function buildFromConfig(args, configFile, callback) {
  const config = eval('require')(configFile);
  const packagePath = path.join(args.cwd, 'package.json');

  if (fs.existsSync(packagePath) && !argv.f) {
    console.log('Using existing package.json.');
  } else {
    console.log('No package.json found; creating one.');

    fs.copySync('./package.json', packagePath);

    const pluginsToInstall = (configFile.plugins || []).filter(p =>
      typeof p === 'string'
    );

    execSync('npm install', [
      '--save',
      ...pluginsToInstall,
    ]);
  }

  const outputFile = path.join(argv.cwd, argv.output);

  console.log('Generating exobot file...');

  const botFileContents = [
    `require('babel-polyfill')`,
    `const config = require('${configFile}')`,
    `const { Exobot } = require('@exoplay/exobot');`,
    `const bot = new Exobot(config);`,
    `module.exports = bot;`,
  ].join('\n');

  fs.createFileSync(outputFile);
  fs.writeFileSync(outputFile,  botFileContents);

  if (callback) {
    callback();
  }
}

function createBot(cb = () => {}) {
  const inputFile = path.join(argv.cwd, argv.input);
  const configFile = path.join(argv.cwd, 'exobot.config.js');
  const outputFile = path.join(argv.cwd, argv.output);

  let exobotPath = inputFile;
  const exobotSourceExists = fs.existsSync(inputFile);

  if (!exobotSourceExists) {
    if(fs.existsSync(configFile)) {
      exobotPath = configFile;
    }
  }

  if (!exobotPath) {
    throw new Error(`An exobot file was not found at ${inputFile} or ${configFile}.`);
  }

  buildFromConfig(argv, exobotPath, () => cb(outputFile));
}

function runExampleBot(args) {
  const packagePath = path.join(args.cwd, 'package.json');
  const pkg = __non_webpack_require__(packagePath);

  const botConfig = {
    ...exampleConfig,
    plugins: {
      ...exampleConfig.plugins,
      [camel(pkg.name)]: [__non_webpack_require__(path.join(args.cwd, `./${pkg.main}`)), {}],
    }
  };

  const exobot = new Exobot(botConfig);
  return exobot;
}

switch (argv._[0]) {
  case 'build':
  case 'watch':
    build(argv);
    break;

  case 'run':
    createBot(outputFile => fork(outputFile));
    break;

  case 'example':
    // run yo generate bot
    runExampleBot(argv);
    break;

  case 'new':
    switch (argv.bot) {
      case 'bot':
        yeomanEnv.run('exobot:app');
        break;
      case 'adapter':
        yeomanEnv.run('exobot:adapter');
        break;
      case 'plugin':
        yeomanEnv.run('exobot:plugin');
        break;
    }
    break;
}
