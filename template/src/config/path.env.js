// ------------------------------------------------------------------------------
// name: 项目路径相关配置
// author: 喵大斯( mschool.tech )
// created: 2019/8/23 22:18
// ------------------------------------------------------------------------------

const DEBUG = process.env.NODE_ENV === 'development';

module.exports = {
  /**
   * 应用于 vue.config 的构建，以及 router.config 配置的运行时路由基础路径
   * 当使用基于 HTML5 history.pushState 的路由时，或者使用 pages 选项构建多页面应用时，
   * basePath 应指定为类似 '/sub-name/' 的子级目录名
   * 注意：请在修改完成后，重新构建打包应用程序
   */
  basePath: DEBUG ? '/' : './'
};
