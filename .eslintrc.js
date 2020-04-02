const path = require('path');

module.exports = {
  extends: [
    '@exoplay/eslint-config-exobot',
  ],
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: path.join(__dirname, 'webpack.config.babel.js'),
      },
    },
  }
};
