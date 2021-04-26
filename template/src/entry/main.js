import Vue from 'vue';

import Storage from '@mudas/storage';
import StorageConfig from '@/config/storage.conf';
import elementUILoader from '@/entry/element';

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

// ----------------------------------------
// 启动入口组件
// ----------------------------------------

import App from './App.vue';

// Vue.use(El);

Promise.all([
  import(/* webpackChunkName: "config" */ '@/config'),
  import(/* webpackChunkName: "custom-ui" */ './custom-ui'),
  elementUILoader()
]).then(chunks => {

  // 项目配置信息
  Vue.conf = Vue.prototype.$conf = chunks[0];

  // UI 框架
  // element-ui 和 yinhe-ui 已在加载的同时进行注册

  // 初始化 storage
  const storage = new Storage.Store({ unique: process.env.VUE_APP_UNIQUE, config: StorageConfig });
  Vue.use(Storage);

  new Vue({
    store,
    router,
    storage,
    render: h => h(App)
  }).$mount('#app');
});
