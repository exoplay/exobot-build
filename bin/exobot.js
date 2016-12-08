#!/usr/bin/env node
const webpack = require('webpack');
const config = require('./webpackConfig');
const path = require('path');

const defaultName = path.parse(process.cwd()).name + '.js';

const argv = require('yargs')
              .usage('exobot <command> [options]')
              .example('exobot build', 'uses webpack to build ./src/exobot.js to ./exobot.js')
              .example('exobot run', 'runs an exobot from ./src/exobot.js')
              .demand(1)
              .alias('h', 'help')
              .help('h')
              .alias('s', 'source-directory')
              .nargs('s', 1)
              .alias('d', 'dest-directory')
              .nargs('d', 1)
              .alias('i', 'input')
              .nargs('i', 1)
              .alias('o', 'output')
              .nargs('o', 1)
              .alias('e', 'extensions')
              .nargs('e', 1)
              .alias('c', 'cwd')
              .nargs('c', 1)
              .alias('w', 'watch')
              .nargs('w', 1)
              .default({
                'source-directory': './src',
                'dest-directory': './',
                input: `./src/${defaultName}`,
                output: defaultName,
                extensions: '.js,.json',
                cwd: process.cwd() + '/',
                watch: false,
              })
              .argv;

if (argv._[0] === 'build') {
  const webpackConfig = config(argv);

  const compiler = webpack(webpackConfig)
  console.log(`Beginning build from ${argv.cwd}${argv.i}`);

  compiler.run((err, stats) => {
    if (err) { return console.error(err); }

    console.log(`Wrote to ${argv.d}${argv.o}`);
    process.exit();
  });

}
