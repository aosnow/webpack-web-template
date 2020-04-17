// ------------------------------------------------------------------------------
// name: env
// author: mudas( mschool.tech )
// created: 2020/3/30 16:50
// ------------------------------------------------------------------------------

import * as utils from '@mudas/util-store';
import * as Types from '@/store/types';

// 内部化的 Types 命名（不包含路径）
const ENV_INFO = Types.ENV_INFO.namespace;

const State = () => ({
  envInfo: {
    a: 1,
    b: 2,
    c: 3
  }
});

const Getters = {
  [ENV_INFO](state) {
    return state.envInfo;
  }
};

// 同步立即更新
const Mutations = {
  [ENV_INFO](state, data) {
    // state.envInfo = data;
    // 增量保存环境信息（基本环境，以及配置环境）
    utils.increment(state.envInfo, data);
  }
};

// 异步请求数据
const Actions = {};

export default {
  state: State,
  getters: Getters,
  mutations: Mutations,
  actions: Actions
};
