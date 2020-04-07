// ------------------------------------------------------------------------------
// name: vue.config.js
// author: 喵大斯( mschool.tech )
// created: 2019/4/23 21:00
// ------------------------------------------------------------------------------

const path = require('path');
const os = require('os');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const terserOptions = require('@vue/cli-service/lib/config/terserOptions');
const config = require('./src/config/path.env');
const DEBUG = process.env.NODE_ENV === 'development';

function resolve(...dir) {
  return path.join(__dirname, ...dir);
}

// externals 排除列表
const externals = { vue: 'Vue', vuex: 'Vuex', 'vue-router': 'VueRouter' };
// if (process.env.VUE_APP_ENV === 'release') externals.packageName = 'exportPackageName';

// 配置集合
const webpackConfig = {
  publicPath: config.publicPath,
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: DEBUG,

  // 调试配置
  devServer: {
    // 跨域配置
    proxy: {
      '/api': {
        target: 'http://172.16.31.16:8080',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' }
      }
    }
  },

  configureWebpack: {
    // 启动程序入口（若需要配置多个html页程序，使用 pages 进行替换）
    entry: resolve('src', 'entry', 'main.js'),

    // 排除外部库以及不需要打包的 node_modules 第三方包（如使用CDN或引用本地JS库）
    externals
  },

  // 配置单页为 pages 启动错误无法解析 public/index.html
  // pages: {
  //   index: {
  //     title: '商家便利宝',
  //     entry: 'src/entry/main.js',
  //     filename: 'main.html'
  //   }
  // },

  chainWebpack: (config) => {

    // 增加资源识别路径（仍然不支持 style="background: url()" 的路径识别）
    // config.module.rule('file').include.add('/demo/assets');

    // 路径别名
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
    config.resolve.alias.set('@', resolve('src'));
    config.resolve.alias.set('views', resolve('src', 'views'));
    config.resolve.alias.set('yinhe-ui', resolve('packages', 'yinhe-ui'));

    // 压缩配置（排除配置文件）
    config.optimization.minimizer('terser')
          .use(TerserPlugin, [{
            exclude: /[\\/](config|[\w-.]+\.conf)/i, // webpackChunkName
            ...terserOptions({
              productionSourceMap: DEBUG,
              parallel: os.cpus().length > 1
            })
          }]);

    // config.optimization.runtimeChunk('single'); // 该设置与多页 pages 与 preload 冲突造成空白页
    // config.optimization.splitChunks({
    //   cacheGroups: {
    //     // 将 node_modules 中的包分离出来做长久缓存，加快每次发布的加载速度
    //     // vendors: {
    //     //   name: `chunk-vendors`,
    //     //   test: /[\\/]node_modules[\\/]/,
    //     //   minChunks: 2,
    //     //   // maxSize: 102400, // 该设置与多页 pages 与 preload 冲突造成空白页
    //     //   priority: -10,
    //     //   chunks: 'initial'
    //     // },
    //     common: {
    //       name: `chunk-common`,
    //       minChunks: 2,
    //       priority: -20,
    //       chunks: 'all',
    //       reuseExistingChunk: true
    //     }
    //   }
    // });

    // 按需打包 moment 语言包
    config.plugin('moment')
          .use(
            new webpack.ContextReplacementPlugin(
              /moment[\\\/]locale$/,
              /^\.\/(zh-cn|es-us)$/
            )
          );

  }
};

module.exports = webpackConfig;
