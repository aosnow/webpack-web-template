// ------------------------------------------------------------------------------
// name: index
// author: 喵大斯( mschool.tech )
// created: 2019/8/4 1:18
// ------------------------------------------------------------------------------

import Response from './response';
import Token from './token';
import transformRequest from './transformRequest';
import transformResponse from './transformResponse';

// 所有需要注册的拦截器列表
const interceptors = {
  // key 值需要与 config/index.js 中的 http 配置数组一一对应
  // 引用方法 vue.http.post() 或者 vue.http.default.post()
  '{{name}}': [Token, Response]
};

export { interceptors, transformRequest, transformResponse };
