// ------------------------------------------------------------------------------
// name: 项目全局配置
// note: 该配置文件将被独立打包，作用于运行时全局参数，请勿引用外部资源
// author: 喵大斯( mschool.tech )
// created: 2019/8/23 22:18
// ------------------------------------------------------------------------------

const DEBUG = process.env.NODE_ENV === 'development';

/**
 * 该配置主要用于初始化 axios 请求参数，可参照 axios 的默认配置进行设置
 */
module.exports = {
  // ----------------------------------------
  // 页面模块级配置
  // ----------------------------------------

  // 全局配置
  global: {},

  // 启动页配置
  startup: {},

  // ----------------------------------------
  // 通信配置
  // ----------------------------------------

  // 该配置可以做为数组来同时初始化多个 EasyHttp 实例来访问不同的服务器接口
  // 也可以设置为 Object 单个配置，为数组类型时必须包含 id 做为唯一标识，Vue.http 为数组第一个配置创建的 EasyHttp 实例，
  // 其它的实例通过 Vue.http.<id> 来访问
  // 相应的本地需要通过 webpack.proxy 来设置代理访问，服务端需要设置 nginx 反向代理来实现
  http: [
    {
      id: '{{name}}',

      // 平台识别编码
      invoke_source: 0,

      /**
       * `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
       * 该参数将作为请求时的默认前缀
       * 当局域网环境时，将通过 vue-cli 中的 proxyTable 配置来识别 '/api' 进行跨域
       * 当服务器环境时，通过如 ngix 配置来识别 '/api' 进行跨域
       */
      baseURL: process.env.VUE_APP_API_ROOT,

      /**
       * `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
       * 如果请求会话超过 `timeout` 的时间，请求将被中断
       */
      timeout: 10000
    }
  ]

};
