// ------------------------------------------------------------------------------
// name: vue.config.js
// author: 喵大斯( h5devs.com/h5devs.net )
// created: 2019/4/23 21:00
// ------------------------------------------------------------------------------

const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const terserOptions = require('@vue/cli-service/lib/config/terserOptions');
const HappyPack = require('happypack');
const os = require('os');
const config = require('./src/config/path.env');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const DEBUG = process.env.NODE_ENV === 'development';

function resolve(...dir) {
  return path.join(__dirname, ...dir);
}

// 配置集合
const webpackConfig = {
  publicPath: config.basePath,
  outputDir: 'dist',
  assetsDir: '',
  productionSourceMap: DEBUG,

  // 调试配置
  devServer: {
    // 跨域配置
    proxy: {
      '/api': {
        target: 'http://172.16.31.16:8080',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        secure: false
      }
    }
  },

  // 页面配置
  // pages: {
  //   main: {
  //     entry: 'src/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //     title: 'vue 模板项目 - mudas'
  //   }
  // },

  // integrity: true,
  configureWebpack: {

    // 排除外部库以及不需要打包的 node_modules 第三方包（如使用CDN或引用本地JS库）
    externals: {
      // 'element-ui': 'ElementUI'
    }
  },

  chainWebpack: (config) => {

    // 增加资源识别路径（仍然不支持 style="background: url()" 的路径识别）
    // config.module.rule('file').include.add('/demo/assets');

    // 路径别名
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
    config.resolve.alias.set('@', resolve('src'));
    config.resolve.alias.set('modules', resolve('src', 'modules'));
    config.resolve.alias.set('yinhe-ui', resolve('packages', 'yinhe-ui'));

    // 待转出独立功能模块
    config.resolve.alias.set('@mudas/affair', resolve('packages', 'affair'));

    // 压缩配置（排除配置文件）
    const excludeChunks = ['config'];
    config.optimization.minimizer([
      new TerserPlugin({
        chunkFilter: (chunk) => {
          return excludeChunks.indexOf(chunk.name) === -1;
        },
        ...terserOptions({
          productionSourceMap: DEBUG,
          parallel: os.cpus().length > 1
        })
      })
    ]);

    config.optimization.runtimeChunk('single');
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        // 将 node_modules 中的包分离出来做长久缓存，加快每次发布的加载速度
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: false,
          minSize: 122880, // 120kb
          maxSize: 249856, // 244kb
          priority: -100,
          reuseExistingChunk: true
        }
      }
    });

    // 新插件
    config.plugin('manifest').use(ManifestPlugin);
    config.plugin('happy-pack').use(
      new HappyPack({
        id: 'happy-babel',
        loaders: [{ loader: 'babel-loader?cacheDirectory=true' }],
        threadPool: happyThreadPool
      })
    );

    // config.plugins.delete('preload');
    // config.plugins.delete('prefetch');

  }
};

module.exports = webpackConfig;
