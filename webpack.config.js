module.exports = require('./src/webpackConfig.js')({
  input: './src/run.js',
  output: './bin/run.js',
  cwd: __dirname,
});

