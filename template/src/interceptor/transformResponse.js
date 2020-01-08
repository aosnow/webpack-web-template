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

    // 异常接口或者 code 不存在
    if (!data || !data.code) {
      // 一旦发生错误，后续请求考虑取消
      Vue.http.cancel('Exception interface');

      // 转发给 reponse.error 进行处理
      throw new ServiceError('request params exceptions, or lack of fields(code)', data.code);
    }

    // 兼容老接口 datas 命名请求实体的问题
    else if (data['datas'] && !data.data) {
      data.data = data['datas'];
      delete data['datas'];

      // 转发给 reponse.interceptor 进行处理
      return data;
    }

    // 接口返回处理
    else {
      data.code = parseInt(data.code, 10);
      const { code, msg, sub_msg, data: content } = data;
      const message = sub_msg || msg || 'unknow error';
      let extraMessage = '';

      if (code !== StatusCode.SUCCESS) {
        // 若是 40005 服务端代码执行错误，则增加详细参数
        if (content) {
          const { message: msg, path } = content;
          extraMessage = `\n【path】${path}\n【message】${msg}`;
        }

        // 一旦发生错误，后续请求考虑取消
        // Vue.http.cancel(`【${data.code}】请求已取消（${message}）${extraMessage}`);

        // 转发给 reponse.error 进行处理
        throw new ServiceError(`${message}${extraMessage}`, code);
      }
      else {
        // 转发给 reponse.interceptor 进行处理
        return data;
      }
    }
  }
];
