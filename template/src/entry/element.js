// ------------------------------------------------------------------------------
// name: ui
// author: mudas( mschool.tech )
// created: 2019.10.02 下午 16:47
// ------------------------------------------------------------------------------

import Vue from 'vue';

// 不论是本地还是其它环境，都使用自定义对应 element-ui 的 theme-chalk
import '@/css/theme-chalk/index.scss';

const DEBUG = process.env.NODE_ENV === 'development';

/**
 * 兼容按需要加载本地 ElementUI
 * <p>目的在于开发阶段，节省对 CDN 资源的浪费</p>
 * @return {Promise<Object>}
 */
export default function() {
  return new Promise((resolve, reject) => {
    // 本地测试环境，使用本地 element-ui 包
    if (DEBUG) {
      // 与 CDN 版本一致：element-ui v2.15.1
      import(/* webpackChunkName: "element-ui" */ 'element-ui').then(chunk => {
        Vue.use(chunk.default);
        resolve(chunk);
      }).catch(reason => reject(reason));
    }

    else {
      // 除本地环境外的 test、pre、release 使用 CDN 资源
      // 构建时会通过 externals 排除在构建 chunk 之外
      resolve();
    }
  });
}
