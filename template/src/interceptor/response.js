// ------------------------------------------------------------------------------
// name: response
// author: mudas( mschool.tech )
// created: 2019.08.05 上午 1:53
// ------------------------------------------------------------------------------

import Vue from 'vue';
import { Message, MessageBox } from 'element-ui';
import { HttpError } from '@mudas/http';
import store from '@/store';
import router from '@/router';

import ServiceError from '@/error/ServiceError';
import StatusCode from '@/config/response.code.conf';

// 所有网络请求错误，都将在此拦截器被首先捕捉到，可以考虑统一输出相同格式的 Error 结构
export default {
  type: 'response',

  interceptor: response => {
    // 只处理数据逻辑，此处默认都是正确数据（因为此处实际已进入 then 进程，要想在 then 前拦截需要使用 transformResponse）
    const { data } = response;
    const code = parseInt(data.code, 10);
    let transmit = true; // 是否需要向下继续传递 response

    if (StatusCode.has(code) && code !== StatusCode.SUCCESS) {
      const msg = StatusCode.message[code] || 'unknow error';

      if (code === StatusCode.REFRESH_TOKEN_ERROR || code === StatusCode.NOTOKEN) {
        // 未授权
        store.dispatch('common/setHasPermissions', {
          hasPermissions: false,
          redirectUrl: data.redirect_url,
          permissionMsg: null
        });
        // 未授权的时候，不出现alert提示信息
        return false;
      }

      if (code === StatusCode.NOTOKEN_ERROR) {
        // 未授权
        store.dispatch('common/setHasPermissions', {
          hasPermissions: false,
          redirectUrl: data.redirect_url,
          permissionMsg: data.msg
        });
        // 未授权的时候，不出现alert提示信息
        return false;
      }

      if (code === StatusCode.NOSESSION) {
        // 取消token过期，未登录提示弹窗多次出现
        Vue.http.cancel();

        store.dispatch('loginInfo/logout').then(() => {
          let redirectUrl = window.location.href;
          if (process.env.NODE_ENV === 'development') {
            router.replace({ path: '/login' });
          }
          else {
            let str = process.env.NODE_URL;
            window.location.href = `${process.env.NODE_TYPE}` + encodeURIComponent(redirectUrl);
          }
        });
      }
      else {
        Message.error({ message: msg });
      }
    }
    else {
      transmit = true;
    }

    if (transmit) return response;
  },

  error: error => {
    // 网络错误、取消请求、请求超时等
    // 服务器返回的业务错误不做二次转换处理
    if (!/^cancel/i.test(error.toString())) {
      MessageBox.alert(error.message, '提示', { type: 'warning', showClose: false });

      if (error instanceof ServiceError) {
        throw error;
      }
      else {
        const errInfo = HttpError.info(error);
        throw new Error(errInfo);
      }
    }

  }
};
