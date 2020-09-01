// ------------------------------------------------------------------------------
// name: response
// author: mudas( mschool.tech )
// created: 2019.08.05 上午 1:53
// ------------------------------------------------------------------------------
import Vue from 'vue';
import { HttpError } from '@mudas/http';

import ServiceError from '@/error/ServiceError';
import StatusCode from '@/config/response.code.conf';

// 所有网络请求错误，都将在此拦截器被首先捕捉到，可以考虑统一输出相同格式的 Error 结构
export default {
  type: 'response',

  interceptor: response => {
    const { data: axiosResponseData, status, statusText } = response;

    if (status !== 200) {
      throw new ServiceError(statusText, status);
    }

    // 接口返回处理
    else {
      axiosResponseData.code = parseInt(axiosResponseData.code, 10);

      const { code, msg, sub_msg, data: content } = axiosResponseData;
      const message = sub_msg || msg || 'unknow error';
      let extraMessage = '';

      if (code !== StatusCode.SUCCESS) {
        // 若是 40005 服务端代码执行错误，则增加详细参数
        if (content) {
          const { message: msg, path } = content;
          extraMessage = `\n【path】${path}\n【message】${msg}`;
        }

        // 登录失效逻辑处理
        if (code === StatusCode.NOSESSION || code === StatusCode.TOCKEN_INVALID) {
          // 取消token过期，未登录提示弹窗多次出现
          Vue.http.cancel(`【${code}】请求已取消（${message}）${extraMessage}`);

          // 登录失效，派发全局事件（需要安装 @mudas/plugin-vue-handler 才能生效）
          Vue.emit(StatusCode.NOSESSION, axiosResponseData);
        }

        // 转发给 reponse.error 进行处理
        throw new ServiceError(`${message}${extraMessage}`, code);
      }
    }

    return response;
  },

  error: error => {
    // 网络错误、取消请求、请求超时等
    // 服务器返回的业务错误不做二次转换处理
    if (error instanceof ServiceError) {
      throw error;
    }
    else {
      const errInfo = HttpError.info(error);

      // 包含已取消请求（取消请求若不处理，则会将 undefined 传送给 response）
      throw new Error(errInfo);
    }

  }
};
