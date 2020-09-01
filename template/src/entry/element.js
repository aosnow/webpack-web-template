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
  Switch,

  // Others
  Message,
  MessageBox,
  Notification
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

// Notification
Vue.message = Message;
Vue.messageBox = MessageBox;
Vue.notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

ElComponents.forEach(component => {
  Vue.use(component);
});
