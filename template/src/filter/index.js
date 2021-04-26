// ------------------------------------------------------------------------------
// name: 项目全局过滤器安装入口
// author: mudas( mschool.tech )
// created: 2021/1/22 14:36
// ------------------------------------------------------------------------------

import { currency, dateformat, times, distance, prefixURL } from '@/utils';

// ----------------------------------------
// Vue 全局过滤器
// ----------------------------------------
export default function(Vue) {
  // 常用过滤器
  Vue.filter('currency', currency);
  Vue.filter('dateformat', dateformat);
  Vue.filter('times', times);
  Vue.filter('distance', distance);

  // 图片自动补全域名
  Vue.filter('image', prefixURL);

  // 其它过滤器
  // ...在此进行注册
}
