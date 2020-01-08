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
    // 只处理数据逻辑，此处默认都是正确数据（因为此处实际已进入 then 进程，要想在 then 前拦截需要使用 transformResponse）
    // const { data } = response;
    // const { msg, sub_msg } = data;
    // const code = parseInt(data.code, 10);
    // let transmit = true; // 是否需要向下继续传递 response
    //
    // if (StatusCode.has(code) && code !== StatusCode.SUCCESS) {
    //   const message = sub_msg || msg || 'unknow error';
    //
    //   if (code === StatusCode.NOSESSION || code === StatusCode.TOCKEN_INVALID) {
    //     // 取消token过期，未登录提示弹窗多次出现
    //     Vue.http.cancel(`【${data.code}】请求已取消（${message}）`);
    //   }
    //
    //   // 弹出提示信息
    //   // Vue.toast({ icon: 'warning-o', message: msg, closeOnClick: true, forbidClick: true });
    //   transmit = false;
    //   throw new ServiceError(message, code);
    //
    // }
    // else {
    //   transmit = true;
    // }
    //
    // if (transmit) return response;
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
