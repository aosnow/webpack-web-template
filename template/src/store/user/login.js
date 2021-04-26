// ------------------------------------------------------------------------------
// name: login
// author: 喵大斯( h5devs.com/h5devs.net )
// created: 2018/8/24 15:18
// ------------------------------------------------------------------------------

import Vue from 'vue';
import * as Types from '@/store/types';
import EasyStore, { namespace, increment } from '@mudas/store';

const USER_LOGIN = namespace(Types.USER_LOGIN);
const USER_LOGINOUT = namespace(Types.USER_LOGINOUT);

const Config = [
  {
    type: USER_LOGIN,
    action(context, params, conf) {
      return Vue.http.post('/v2/user-system/login/login', { ...params }, conf)
                .then(({ data }) => {
                  // 登录成功
                  if (data.data.token) {
                    context.commit(USER_LOGIN, data.data);
                    return Promise.resolve(data.data);
                  }
                  // 登录失败
                  return Promise.reject(new Error(data['sub_msg'] || data.msg));
                })
                .catch(reason => Promise.reject(reason));
    },
    mutation(state, data) {
      increment(state[USER_LOGIN], data);
      Vue.storage.cache(Types.USER_LOGIN, state[USER_LOGIN]);
      // Vue.storage.cache('token', state[USER_LOGIN]);
    }
  },

  {
    type: USER_LOGINOUT,
    url: { url: '/index/getUserInfo', http: Vue.http, method: 'get' },
    state: false,
    getter: false,
    mutation(state, data) {
      console.warn('USER_LOGINOUT:', data);
      state[USER_LOGIN] = null;
      Vue.storage.remove(Types.USER_LOGIN);
    }
  }
];

export default new EasyStore(Config).output();
