// ------------------------------------------------------------------------------
// name: login
// author: 喵大斯( h5devs.com/h5devs.net )
// created: 2018/8/24 15:18
// ------------------------------------------------------------------------------

import Vue from 'vue';

const State = {
  /*
   登录基础信息
   {
   "refresh_token": "string",
   "token": "string"
   }
   */
  loginfo: null,
};

// 同步立即更新
const MutAtions = {
  /**
   * 登录成功基础信息
   * @param state
   * @param {LoginInfo} loginfo
   */
  setLogInfo(state, loginfo) {
    // loginfo
    state.loginfo = loginfo;

    // 设置 Ajax 请求时所需要的 token
    Vue.token = loginfo.token;
  },

  // 退出登录
  setLogout(state) {
    // loginfo
    state.loginfo = null;
    // userinfo
    state.userinfo = null;
    // token
    Vue.token = null;
    // 缓存销毁
    Vue.storage.remove(Types.LOGIN);
  }

};

// 异步请求数据
const Actions = {

  // Step01：登录
  login({ commit }, params) {
    return this.dispatch(
      this.interceptor,
      {
        type: Types.LOGIN,
        handler() {
          const url = uri({ getway: ApiConf.user.$getway, api: ApiConf.user.login });
          return Vue.http.post(url, params).then(({ data }) => {
            // if (data.code === StatusCode.SUCCESS) {
            // 检测 token 有效性
            if (data.data && data.data.token) {
              return Promise.resolve(data);
            }
            // }
            // return Promise.reject(new Error(data['sub_msg'] || data.msg));
          }).catch(reason => {
            return Promise.reject(reason);
          });
        },
        success(data) {
          commit('setLogInfo', data.data);
        },
        error(reason) {
          console.warn('error:', reason);
        }
      }
    );
  },

  // Step Last：登出
  logout({ commit }) {
    const url = uri({ getway: ApiConf.user.$getway, api: ApiConf.user.loginOut });
    return Vue.http.post(url, {}).then(({ data }) => {
      if (data.code === StatusCode.SUCCESS) {
        commit('setLogout');
        return Promise.resolve(data);
      }
      else {
        return Promise.reject(new Error(data['sub_msg'] || data.msg));
      }
    }).catch(reason => {
      return Promise.reject(reason);
    });
  }
};

const Getters = {
  loginfo: state => state.loginfo,
  userinfo: state => state.userinfo,
  token: state => state.loginfo ? state.loginfo.token : null;
}

export default {
  namespaced: true,
  strict: true,
  state: State,
  getters: Getters,
  mutations: MutAtions,
  actions: Actions
};
