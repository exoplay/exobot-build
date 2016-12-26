#!/usr/bin/env node
const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');

const fork = require('child_process').fork;
const execSync = require('child_process').execSync;

const config = require('./webpackConfig');

const defaultName = path.parse(process.cwd()).name + '.js';

const argv = require('yargs')
              .usage('exobot <command> [options]')
              .example('exobot build', 'uses webpack to build ./src/exobot.js to ./exobot.js')
              .example('exobot run', 'starts an exobot from ./src/exobot.js or exobot.config.js')
              .demand(1)
              .alias('h', 'help')
              .help('h')
              .alias('c', 'cwd')
              .nargs('c', 1)
              .alias('d', 'dest-directory')
              .nargs('d', 1)
              .alias('e', 'extensions')
              .nargs('e', 1)
              .alias('i', 'input')
              .nargs('i', 1)
              .alias('o', 'output')
              .nargs('o', 1)
              .alias('s', 'source-directory')
              .nargs('s', 1)
              .alias('w', 'watch')
              .nargs('w', 1)
              .default({
                cwd: process.cwd() + '/',
                'dest-directory': './',
                extensions: '.js,.json',
                input: `./src/${defaultName}`,
                output: defaultName,
                'source-directory': './src',
                watch: false,
              })
              .argv;

function build(args, callback) {
  const webpackConfig = config(argv);
  const compiler = webpack(webpackConfig);

  if (argv._[0] === 'watch') {
    compiler.watch({}, (err, stats) => {
      if (err) { return console.error(err); }

      console.log(`Wrote to ${argv.d}${argv.o}`);

      if (callback) {
        callback();
      }
    });
  } else {
    compiler.run((err, stats) => {
      if (err) { return console.error(err); }

      console.log(`Wrote to ${argv.d}${argv.o}`);

      if (callback) {
        callback();
      } else {
        process.exit();
      }
    });
  }
}

function buildFromConfig(args, configFile, callback) {
  const config = require(configFile);
  const packagePath = path.join(args.cwd, 'package.json');
  var package;


  try {
     package = require(packagePath);
  } catch (e) {
    fs.copySync('./package.json', packagePath);
  }

  const pluginsToInstall = (configFile.plugins || []).filter(p =>
    typeof p === 'string'
  );

  execSync('npm install', [
    '--save',
    ...pluginsToInstall,
  ]);

  const botFileContents = [
    `require('babel-polyfill')`,
    `const config = require('${configFile}')`,
    `const { Exobot } = require('../exobot');`,
    `const bot = new Exobot(config);`,
    `module.exports = bot;`,
  ].join('\n');

  const outputFile = path.join(argv.cwd, argv['dest-directory'], argv.output);
  fs.createFileSync(outputFile);
  fs.writeFileSync(outputFile,  botFileContents);

  //build(args);

  if (callback) {
    callback();
  }
}

switch (argv._[0]) {
  case 'build':
  case 'watch':
    return build(argv);

  case 'run':
    const inputFile = path.join(argv.cwd, argv.input);
    const configFile = path.join(argv.cwd, 'exobot.config.js');
    const outputFile = path.join(argv.cwd, argv['dest-directory'], argv.output);

    let exobotPath = inputFile;
    const exobotSourceExists = fs.existsSync(inputFile);

    if (!exobotSourceExists) {
      if(fs.exists(configFile)) {
        exobotPath = configFile;
      }
    }

    if (!exobotPath) {
      throw new Error(`An exobot file was not found at ${inputFile} or ${configFile}.`);
    }

    return buildFromConfig(argv, exobotPath, () => {
      fork(outputFile);
    });

}
