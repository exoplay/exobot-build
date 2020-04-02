module.exports = {
  presets: [
    ['@babel/env', {
      targets: {
        node: '10',
      },
      loose: true,
    }],
  ],
  plugins: [
    'babel-plugin-syntax-export-extensions',
  ],
};
