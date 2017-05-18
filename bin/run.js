require("source-map-support").install();require("regenerator-runtime/runtime");
(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const chalk = __webpack_require__(11),
      webpack = __webpack_require__(2),
      path = __webpack_require__(1),
      ProgressBarPlugin = __webpack_require__(12),
      externals = __webpack_require__(13);


module.exports = function (options) {
  if (typeof options.extensions === 'string') {
    options.extensions = options.extensions.split(',');
  }

  const input = options.input,
        output = options.output,
        cwd = options.cwd,
        sourceDir = path.parse(input).dir,
        destDir = path.parse(output).dir,
        modulesDir = path.join(cwd, 'node_modules');


  return {
    target: 'node',
    externals: [externals({ modulesDir })],
    devtool: 'source-map',
    context: path.join(cwd, sourceDir),
    entry: {
      js: path.parse(input).base
    },
    output: {
      path: path.join(cwd, destDir),
      filename: path.parse(output).base,
      libraryTarget: 'commonjs'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: !0,
          presets: ['babel-preset-stage-2'],
          plugins: ['transform-export-extensions', 'syntax-decorators', 'transform-decorators-legacy', 'transform-decorators', 'transform-es2015-object-super', 'transform-class-properties', 'transform-es2015-classes', 'minify-constant-folding', 'minify-dead-code-elimination', 'minify-infinity', 'minify-numeric-literals', 'minify-replace', 'transform-merge-sibling-variables', 'transform-minify-booleans', 'transform-regexp-constructors', 'transform-remove-undefined', 'transform-undefined-to-void'].map(p => `babel-plugin-${p}`)
        }
      }]
    },
    resolve: {
      extensions: ['.js', '.json'],
      modules: [path.join(cwd, sourceDir)]
    },
    plugins: [new ProgressBarPlugin({
      clear: !1,
      format: 'build [:bar] ' + chalk.green(':percent') + ' (:elapsed seconds)'
    }),
    //new webpack.NoErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: !0,
      debug: !0
    }), new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();require("regenerator-runtime/runtime");',
      raw: !0,
      entryOnly: !1
    })],
    node: {
      global: !1,
      process: !1,
      Buffer: !1,
      crypto: !1,
      module: !1,
      clearImmediate: !1,
      setImmediate: !1,
      clearTimeout: !1,
      setTimeout: !1,
      os: !1,
      _filename: !0,
      __dirname: !0
    }
  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("@exoplay/exobot");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("change-case");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("generator-exobot");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("vm");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("yeoman-environment");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("progress-bar-webpack-plugin");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exoplay_exobot__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exoplay_exobot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__exoplay_exobot__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_change_case__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_change_case___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_change_case__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webpack__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs_extra__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs_extra___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_fs_extra__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vm__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vm__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_yeoman_environment__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_yeoman_environment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_yeoman_environment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_child_process__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_child_process___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_child_process__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__webpackConfig__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__webpackConfig___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__webpackConfig__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_generator_exobot__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_generator_exobot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_generator_exobot__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


















const yeomanEnv = __WEBPACK_IMPORTED_MODULE_6_yeoman_environment___default.a.createEnv();
yeomanEnv.register(require.resolve('generator-exobot/generators/app'), 'exobot:app');
yeomanEnv.register(require.resolve('generator-exobot/generators/adapter'), 'exobot:adapter');
yeomanEnv.register(require.resolve('generator-exobot/generators/plugin'), 'exobot:plugin');

const defaultName = __WEBPACK_IMPORTED_MODULE_3_path___default.a.parse(process.cwd()).name + '.js',
      exampleConfig = {
  key: 'exobot-example',
  plugins: {
    shell: ['@exoplay/exobot', { import: 'adapters.Shell' }],
    http: ['@exoplay/exobot', { import: 'adapters.HTTP' }],
    uptime: ['@exoplay/exobot', { import: 'plugins.Uptime' }],
    help: ['@exoplay/exobot', { import: 'plugins.Help' }],
    greetings: ['@exoplay/exobot', { import: 'plugins.Greetings' }],
    permissions: ['@exoplay/exobot', { import: 'plugins.Permissions' }],
    config: ['@exoplay/exobot', { import: 'plugins.Config' }]
  }
},
      inputOption = {
  input: {
    alias: 'i',
    default: `./src/${defaultName}`
  }
},
      outputOption = {
  output: {
    alias: 'o',
    default: defaultName
  }
},
      cwdOption = {
  cwd: {
    default: process.cwd()
  }
},
      watchOption = {
  watch: {
    alias: 'w',
    default: !1
  }
},
      forceOption = {
  force: {
    alias: 'f',
    default: !1
  }
},
      argv = __webpack_require__(9).usage('exobot <command> [options]').command('build', 'Builds exobot', _extends({}, inputOption, outputOption, cwdOption, watchOption, forceOption)).command('watch', 'Builds exobot', _extends({}, inputOption, outputOption, cwdOption, forceOption, {
  watch: _extends({}, watchOption.watch, {
    default: !0
  })
})).command('run', 'Starts an exobot from config', _extends({}, inputOption, outputOption, cwdOption, watchOption, forceOption, {
  start: {
    default: !0
  }
})).command('example', 'Starts an exobot example', _extends({}, inputOption, outputOption, cwdOption, forceOption)).command('new <bot|plugin|adapter>', 'Bootstraps an exobot project', _extends({}, inputOption, cwdOption, outputOption, forceOption, {
  name: {
    default: 'exobot'
  }
})).demand(1).boolean('watch').boolean('start').alias('h', 'help').help('h').argv;

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

  console.log(`Wrote to ${argv.o}`);
}

function build(args, callback) {
  const webpackConfig = __WEBPACK_IMPORTED_MODULE_8__webpackConfig___default()(argv),
        compiler = __WEBPACK_IMPORTED_MODULE_2_webpack___default()(webpackConfig);


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
  eval('require')(configFile);

  const packagePath = __WEBPACK_IMPORTED_MODULE_3_path___default.a.join(args.cwd, 'package.json');

  if (__WEBPACK_IMPORTED_MODULE_4_fs_extra___default.a.existsSync(packagePath) && !argv.f) {
    console.log('Using existing package.json.');
  } else {
    console.log('No package.json found; creating one.');

    __WEBPACK_IMPORTED_MODULE_4_fs_extra___default.a.copySync('./package.json', packagePath);

    const pluginsToInstall = (configFile.plugins || []).filter(p => typeof p === 'string');

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_child_process__["execSync"])('npm install', ['--save', ...pluginsToInstall]);
  }

  const outputFile = __WEBPACK_IMPORTED_MODULE_3_path___default.a.join(argv.cwd, argv.output);

  console.log('Generating exobot file...');

  const botFileContents = [`require('babel-polyfill')`, `const config = require('${configFile}')`, `const { Exobot } = require('@exoplay/exobot');`, `const bot = new Exobot(config);`, `module.exports = bot;`].join('\n');

  __WEBPACK_IMPORTED_MODULE_4_fs_extra___default.a.createFileSync(outputFile);
  __WEBPACK_IMPORTED_MODULE_4_fs_extra___default.a.writeFileSync(outputFile, botFileContents);

  if (callback) {
    callback();
  }
}

function createBot(cb = () => {}) {
  const inputFile = __WEBPACK_IMPORTED_MODULE_3_path___default.a.join(argv.cwd, argv.input),
        configFile = __WEBPACK_IMPORTED_MODULE_3_path___default.a.join(argv.cwd, 'exobot.config.js'),
        outputFile = __WEBPACK_IMPORTED_MODULE_3_path___default.a.join(argv.cwd, argv.output);


  let exobotPath = inputFile;
  const exobotSourceExists = __WEBPACK_IMPORTED_MODULE_4_fs_extra___default.a.existsSync(inputFile);

  if (!exobotSourceExists) {
    if (__WEBPACK_IMPORTED_MODULE_4_fs_extra___default.a.existsSync(configFile)) {
      exobotPath = configFile;
    }
  }

  if (!exobotPath) {
    throw new Error(`An exobot file was not found at ${inputFile} or ${configFile}.`);
  }

  buildFromConfig(argv, exobotPath, () => cb(outputFile));
}

function runExampleBot(args) {
  const packagePath = __WEBPACK_IMPORTED_MODULE_3_path___default.a.join(args.cwd, 'package.json'),
        pkg = require(packagePath),
        botConfig = _extends({}, exampleConfig, {
    plugins: _extends({}, exampleConfig.plugins, {
      [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_change_case__["camel"])(pkg.name)]: [require(__WEBPACK_IMPORTED_MODULE_3_path___default.a.join(args.cwd, `./${pkg.main}`)), {}]
    })
  }),
        exobot = new __WEBPACK_IMPORTED_MODULE_0__exoplay_exobot__["Exobot"](botConfig);

  return exobot;
}

switch (argv._[0]) {
  case 'build':
  case 'watch':
    build(argv);
    break;

  case 'run':
    createBot(outputFile => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_child_process__["fork"])(outputFile));
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

/***/ })
/******/ ])));
//# sourceMappingURL=run.js.map