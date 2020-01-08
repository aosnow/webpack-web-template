// ------------------------------------------------------------------------------
// name: webpack.config
// author: 喵大斯( h5devs.com/h5devs.net )
// created: 2019/4/23 21:48
// ------------------------------------------------------------------------------

const path = require('path');

function resolve(...dir) {
  return path.join(__dirname, ...dir);
}

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      '@': resolve('src'),
      views: resolve('src', 'views'),
      'yinhe-ui': resolve('packages', 'yinhe-ui')
    }
  }
};
