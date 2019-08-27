import Vue from 'vue';
import YinheUI from 'yinhe-ui';

import Storage from '@mudas/storage';
import EasyHttp from '@mudas/http';

import StorageConfig from '@/config/storage.config';
import { interceptors, transformResponse } from '@/interceptor';

// ----------------------------------------
// 数据状态管理
// ----------------------------------------
import store from './store';

// ----------------------------------------
// 路由管理
// ----------------------------------------
import router from './router';

// ----------------------------------------
// ui 样式
// ----------------------------------------
import '@mudas/reset.css';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(YinheUI);
console.log('vue:', Vue);
import(/* webpackChunkName: "config" */ './config')
.then(config => {

  // 项目配置信息
  Vue.conf = config.default;

  // 初始化 http
  const { unique, http } = Vue.conf;
  Vue.use(EasyHttp, { transformResponse, ...http });
  Vue.http.batchUseInterceptor(interceptors);

  // 初始化 storage
  Vue.use(Storage);
  console.log('loaded!');
  new Vue({
    router,
    store,
    storage: new Storage.Store({ unique, config: StorageConfig }),
    data() {
      return {
        a: 10
      };
    },
    beforeCreate: function() {
      // `this` 指向 vm 实例
      console.log('a is: ' + this.a);
    },
    render: h => h(App)
  }).$mount('#app');
});
