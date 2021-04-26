// ------------------------------------------------------------------------------
// name: token
// author: 喵大斯( mschool.tech )
// created: 2019/8/4 1:13
// ------------------------------------------------------------------------------

import { hash } from '@mudas/http';
import Config from '@/http/config';

export default {
  type: 'request',
  interceptor: config => {
    // http 配置
    const { http } = Config;
    const httpConf = http.filter(item => item.id === '{{name}}');

    if (httpConf.length > 0) {
      const { invokeSource } = httpConf[0];

      // 部分手机不支持下划线的 header 信息提取
      config.headers.invoke_source = invokeSource;
      config.headers.invokeSource = invokeSource;
    }

    // token 信息
    // const cacheData = Vue.storage.resolve(Types.LOGIN);
    //
    // if (cacheData && cacheData.payload) {
    //   const { token } = cacheData.payload;
    //   config.headers.token = token;
    // }

    config.headers.out_request_no = hash();
    return config;
  }
};
