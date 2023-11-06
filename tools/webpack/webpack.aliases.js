const { createWebpackAliases } = require('./webpack.helpers');

// Export aliases
module.exports = createWebpackAliases({
  '@assets': 'assets',
  '@components': 'src/renderer/components',
  '@common': 'src/common',
  '@main': 'src/main',
  '@quesu': 'src/quesu',
  '@renderer': 'src/renderer',
  '@src': 'src',
  '@misc': 'misc',
  '@utils': 'utils',
});
