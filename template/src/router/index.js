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
  { path: '/index', component: () => import('views/frame'), meta: { title: '测试首页' } }
];

// 创建路由实例
const router = new Router({
  // mode: 'history',
  base: config.basePath,
  routes: routesConfig
});

// 自动根据 meta.title 设置页面标题
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
