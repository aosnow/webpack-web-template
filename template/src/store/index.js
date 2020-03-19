// ------------------------------------------------------------------------------
// name: index
// author: 喵大斯( mschool.tech )
// created: 2019/8/22 21:34
// ------------------------------------------------------------------------------

import Vue from 'vue';
import Vuex from 'vuex';
import * as Module from './types/module';

import User from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    [Module.USER]: User
  }
});

export default store;
