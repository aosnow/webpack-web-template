// ------------------------------------------------------------------------------
// name: vue.config.js
// author: 喵大斯( mschool.tech )
// created: 2019/4/23 21:00
// ------------------------------------------------------------------------------

const path = require('path');
const os = require('os');
const TerserPlugin = require('terser-webpack-plugin');

const terserOptions = require('@vue/cli-service/lib/config/terserOptions');
const config = require('./src/config/path.env');
const DEBUG = process.env.NODE_ENV === 'development';

function resolve(...dir) {
  return path.join(__dirname, ...dir);
}

// externals 排除列表
const externals = { vue: 'Vue', vuex: 'Vuex', 'vue-router': 'VueRouter', 'element-ui': 'ElementUI' };
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
    externals: DEBUG ? '' : externals
  },

  // 配置单页为 pages 启动错误无法解析 public/index.html
  // pages: {
  //   index: {
  //     title: '商家便利宝',
  //     entry: 'src/entry/main.js',
  //     filename: 'main.html'
  //   }
  // },

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件
  // 此处列出 node_modules 中同样需要让 babel 转译的 esm 模块
  transpileDependencies: [
    '@mudas/*'
  ],

  chainWebpack: (config) => {

    // 增加资源识别路径（仍然不支持 style="background: url()" 的路径识别）
    // config.module.rule('file').include.add('/demo/assets');

    // 路径别名
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
    config.resolve.alias.set('@', resolve('src'));
    config.resolve.alias.set('views', resolve('src', 'views'));

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
    config.optimization.splitChunks({
      chunks: 'initial',
      minSize: 20480,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      automaticNameDelimiter: '-',
      name: true,

      cacheGroups: {
        // 基础包：分离 node_modules 中的 core-js|lodash-es
        lib: {
          test: /[\\/]node_modules[\\/](core-js|lodash-es)/,
          priority: -10
        },
        // 内部包：分离 node_modules 中的 core-js|lodash-es
        com: {
          test: /[\\/]node_modules[\\/](@mudas\/*|axios)/,
          priority: -10
        },
        // 其它 node_modules 包
        vendors: {
          test: /[\\/]node_modules[\\/](?!core-js|lodash-es|@mudas\/*|axios)/,
          priority: -40
        },
        // 业务包，按常规引用规则拆分，达到2个引用则独立成包
        default: {
          minChunks: 2,
          priority: -50,
          reuseExistingChunk: true
        }
      }
    });

  }
};

module.exports = webpackConfig;
