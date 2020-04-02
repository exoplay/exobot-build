const path = require('path');

module.exports = {
  extends: [
    '@exoplay/eslint-config-exobot',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, 'webpack.config.babel.js'),
      }
    },
  }
};
