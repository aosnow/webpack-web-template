// ------------------------------------------------------------------------------
// name: token
// author: 喵大斯( mschool.tech )
// created: 2019/8/4 1:13
// ------------------------------------------------------------------------------

import Vue from 'vue';
import { hash } from '@mudas/http';
import store from '@/store';

export default {
  type: 'request',
  interceptor: config => {
    const { invoke_source } = Vue.conf;

    config.headers.token = store.getters['loginInfo/token'];
    config.headers.invoke_source = invoke_source;
    config.headers.out_request_no = hash();
    return config;
  }
};
