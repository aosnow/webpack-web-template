// ------------------------------------------------------------------------------
// name: custom
// author: mudas( mschool.tech )
// created: 2020/8/14 16:35
// ------------------------------------------------------------------------------

import Vue from 'vue';

// 用户定义全局公共组件
const CommonComponents = [
  { name: 'switch-group', main: () => import('@/components/switch-group') }
];

// 安装所有异步注册组件（仅使用时才加载）
[
  ...CommonComponents
].forEach(part => {
  Vue.component(part.name, part.main);
});
