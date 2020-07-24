// ------------------------------------------------------------------------------
// name: initialize - 项目初始化项目环境
// author: mudas( mschool.tech )
// created: 2019/11/14 17:32
// ------------------------------------------------------------------------------

import Vue from 'vue';
import * as filters from '@mudas/filters';

// ----------------------------------------
// Vue 全局过滤器
// ----------------------------------------
Vue.filter('currency', filters.currency);
Vue.filter('dateformat', filters.dateformat);
Vue.filter('timestr', filters.timestr);
Vue.filter('distance', filters.distance);

// ----------------------------------------
// Vue 全局参数设置
// ----------------------------------------
Vue.config.performance = true;
Vue.config.productionTip = process.env.NODE_ENV === 'development';

// ----------------------------------------
// STORE 设置（确保在 Vuex.Store 创建前设置生效）
// ----------------------------------------
// 让 store 内部能快速定位如 module/name 中的 name
// 因为开启了 module.namespace 模式，只需要在内部使用最后的 name
/* eslint-disable */
if (!String.prototype.namespace) {
  String.prototype.__defineGetter__('namespace', function() {
    return this.substring(this.lastIndexOf('/') + 1);
  });
}
