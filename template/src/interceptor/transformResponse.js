// ------------------------------------------------------------------------------
// name: transformResponse
// author: mudas( mschool.tech )
// created: 2019.08.05 上午 2:31
// ------------------------------------------------------------------------------

import Vue from 'vue';
import ServiceError from '@/error/ServiceError';
import StatusCode from '@/config/response.code.conf';

export default [
  // 拦截 response，处理业务逻辑错误
  function(data) {

    data.code = parseInt(data.code, 10);
    const { code, msg, sub_msg } = data;

    if (code !== StatusCode.SUCCESS) {
      // 一旦发生错误，后续请求考虑取消
      Vue.http.cancel();

      // 转发给 reponse.error 进行处理
      throw new ServiceError(sub_msg || msg, code);
    }

    // 转发给 reponse.interceptor 进行处理
    return data;
  }
];
