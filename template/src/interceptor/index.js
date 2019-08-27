// ------------------------------------------------------------------------------
// name: index
// author: 喵大斯( mschool.tech )
// created: 2019/8/4 1:18
// ------------------------------------------------------------------------------

import Response from './response';
import TokenHeader from './token';
import transformResponse from './transformResponse';

// 所有需要注册的拦截器列表
const interceptors = [TokenHeader, Response];

export { interceptors, transformResponse };
