// ------------------------------------------------------------------------------
// name: index
// author: 喵大斯( mschool.tech )
// created: 2019/8/22 21:34
// ------------------------------------------------------------------------------

import Vue from 'vue';
import Router from 'vue-router';
import config from '@/config/path.env';

Vue.use(Router);

// 路由配置
const routesConfig = [
  { path: '', redirect: '/index' },
  { path: '/', redirect: '/index' },
  { path: '/index', component: () => import('views/frame') }
];

// 创建路由实例
const router = new Router({
  // mode: 'history',
  base: config.basePath,
  routes: routesConfig
});

export default router;
