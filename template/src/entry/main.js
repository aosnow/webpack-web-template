import Vue from 'vue';
import ErrorPrint from '@/error/ErrorPrint';
import Storage from '@mudas/storage';
import StorageConfig from '@/config/storage.conf';

// ----------------------------------------
// 基本环境配置
// ----------------------------------------
import './init';

// ----------------------------------------
// 本地数据和路由
// ----------------------------------------
import store from '@/store';
import router from '@/router';

// ----------------------------------------
// ui 样式
// ----------------------------------------
import '@mudas/reset.css';
import '@/css/main.scss';
import '@/css/theme-chalk/index.scss';

// ----------------------------------------
// 启动入口组件
// ----------------------------------------
import App from './App.vue';

const ChunkListLoaded = [
  import(/* webpackChunkName: "config" */ '@/config'),
  import(/* webpackChunkName: "custom-ui" */ '@/entry/custom-ui')
];

// 本地开发启用 node_modules（element-ui v2.15.1），打包环境后直接使用 CDN（element-ui v2.15.1）
if (process.env.NODE_ENV === 'development') {
  ChunkListLoaded.push(
    import(/* webpackChunkName: "element-ui" */ '@/entry/element')
  );
}

Promise.all(ChunkListLoaded).then(chunks => {

  // 项目配置信息
  Vue.conf = Vue.prototype.$conf = chunks[0];

  // 初始化 storage
  const storage = new Storage.Store({ unique: process.env.VUE_APP_UNIQUE, config: StorageConfig });
  Vue.use(Storage);

  new Vue({
    store,
    router,
    storage,
    render: h => h(App)
  }).$mount('#app');

}).catch(reason => ErrorPrint(reason));
