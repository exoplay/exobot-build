import baseConfig from './src/webpackConfig';

export default () => (
  baseConfig({
    input: './src/exobot-build.js',
    output: './bin/exobot-build.js',
    cwd: __dirname,
  })
);
