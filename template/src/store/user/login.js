// ------------------------------------------------------------------------------
// name: login
// author: 喵大斯( h5devs.com/h5devs.net )
// created: 2018/8/24 15:18
// ------------------------------------------------------------------------------

import Vue from 'vue';
import * as Types from '@/store/types';

const USER_LOGIN = Types.USER_LOGIN.namespace;
const USER_LOGINOUT = Types.USER_LOGINOUT.namespace;

const State = {
  /*
   登录基础信息
   {
   "refresh_token": "string",
   "token": "string"
   }
   */
  loginfo: null
};

const Getters = {
  [USER_LOGIN]: state => state.loginfo
};

// 同步立即更新
const MutAtions = {
  /**
   * 登录成功基础信息
   * @param state
   * @param {LoginInfo} loginfo
   */
  [USER_LOGIN](state, loginfo) {
    state.loginfo = loginfo;
  },

  // 退出登录
  [USER_LOGINOUT](state) {
    // loginfo
    state.loginfo = null;
    // 缓存销毁
    Vue.storage.remove(Types.USER_LOGIN);
  }

};

// 异步请求数据
const Actions = {

  // Step01：登录
  [USER_LOGIN](context, params) {
    return Vue.http.post('url', params).then(({ data }) => {
      // 登录成功
      if (data.data.token) {
        context.commit(USER_LOGIN, data.data);
        return Promise.resolve(data.data);
      }
      // 登录失败
      return Promise.reject(new Error(data['sub_msg'] || data.msg));
    }).catch(reason => Promise.reject(reason));
  },

  // Step Last：登出
  [USER_LOGINOUT](context) {
    return Vue.http.post('url').then(({ data }) => {
      context.commit(USER_LOGINOUT);
      return Promise.resolve(data.data);
    }).catch(reason => Promise.reject(reason));
  }
};

export default {
  state: State,
  getters: Getters,
  mutations: MutAtions,
  actions: Actions
};
