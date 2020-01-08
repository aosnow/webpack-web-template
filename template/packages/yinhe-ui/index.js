// ------------------------------------------------------------------------------
// yinhe-ui 银盒宝成UI规范暂行方案
// author: 喵大斯( mschool.tech )
// created: 2018/8/22 22:57
// ------------------------------------------------------------------------------

// 二次封装的组件集合
// 其标签名规则为 “yh” 前缀，如“yh-dialog”。
// 而以上未经二次封装的组件前缀仍然为 “el” 为前缀，如 “el-button”
import YhButton from './button';

// 二次封装组件
const components = [
  YhButton
];

const install = function(Vue, opts = {}) {

  components.forEach(component => {
    Vue.use(component);
  });

};

export default {
  install,
  ...components
};
