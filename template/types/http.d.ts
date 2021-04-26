// ------------------------------------------------------------------------------
// name: http.d
// author: mudas( mschool.tech )
// created: 2021/1/22
// ------------------------------------------------------------------------------

import { AxiosRequestConfig } from '@mudas/http/types/axios';

declare interface ConfigItem  extends AxiosRequestConfig {

  // 唯一识别码（用于区别项目中调用多个不同API服务器接口资源）
  // 使用 Vue.http 调用默认首个配置，以及 Vue.http.<id> 来使用其它配置
  id: string;

  // 平台识别编码
  invokeSource: number;

  /**
   * `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
   * 该参数将作为请求时的默认前缀
   * 当局域网环境时，将通过 vue-cli 中的 proxyTable 配置来识别 '/api' 进行跨域
   * 当服务器环境时，通过如 ngix 配置来识别 '/api' 进行跨域
   */
  baseURL: string;

  /**
   * `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
   * 如果请求会话超过 `timeout` 的时间，请求将被中断
   */
  timeout: number;
}

export declare interface HttpConfig {

  // ----------------------------------------
  // 其它配置
  // ----------------------------------------

  [index: string]: any;

  // ----------------------------------------
  // 通信配置
  // ----------------------------------------

  http: ConfigItem | ConfigItem[];

}
