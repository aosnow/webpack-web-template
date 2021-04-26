// ------------------------------------------------------------------------------
// name: http 通信配置主入口文件
// author: mudas( mschool.tech )
// created: 2021/1/21 23:46
// ------------------------------------------------------------------------------

import EasyHttp from '@mudas/http';

import Config from './config';
import { interceptors, transformRequest, transformResponse } from './interceptor';

export default function(Vue) {
  // 初始化 http
  const { http } = Config;

  http.forEach(config => {
    config.transformRequest = transformRequest;
    config.transformResponse = transformResponse;
  });

  Vue.use(EasyHttp, http);

  // 注册HTTP通信拦截器函数
  Object.keys(interceptors).forEach(key => {
    Vue.http[key].batchUseInterceptor(interceptors[key]);
  });
}
