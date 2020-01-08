// ------------------------------------------------------------------------------
// name: ui
// author: mudas( mschool.tech )
// created: 2019.10.02 下午 16:47
// ------------------------------------------------------------------------------
import Vue from 'vue';
import {
  // layout

  // base
  Icon,
  Button,

  // show

  // feedback

  // Nav

  // form
  Switch
} from 'element-ui';

// 饿了么组件
const ElComponents = [
  // layout

  // base
  Icon,
  Button,

  // show

  // feedback

  // Nav

  // form
  Switch
];

const install = function(Vue, opts = {}) {

  ElComponents.forEach(component => {
    Vue.use(component);
  });

};

export default {
  install,
  ...ElComponents
};
