// ------------------------------------------------------------------------------
// name: ui
// author: mudas( mschool.tech )
// created: 2019.10.02 下午 16:47
// ------------------------------------------------------------------------------

import Vue from 'vue';
import ElementUI from 'element-ui';

// 本地测试环境，使用本地 element-ui(v2.15.1) 包
// 除本地环境外的 test、pre、release 使用 CDN 资源
// 构建时会通过 externals 排除在构建 chunk 之外
// 开发环境使用本地 element-ui(v2.15.1)，目的在于节省 CDN 资源不必要的使用浪费
Vue.use(ElementUI);
