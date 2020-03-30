// ------------------------------------------------------------------------------
// name: store
// author: mudas( mschool.tech )
// created: 2020.03.11 下午 19:58
// ------------------------------------------------------------------------------

import Vue from 'vue';

/**
 * 合并多个子级 store 模块后输出合并模块
 * @param {StoreOptions[]} modules
 * @param {Object} options
 */
export function mergeStore(modules, options = Object.create(null)) {
  const store = {
    namespaced: true,
    strict: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    ...options
  };

  modules.forEach(mod => {
    const states = typeof mod.state === 'function' ? mod.state() : mod.state;
    store.state = { ...store.state, ...states };
    store.getters = { ...store.getters, ...mod.getters };
    store.mutations = { ...store.mutations, ...mod.mutations };
    store.actions = { ...store.actions, ...mod.actions };
  });

  return store;
}

/**
 * 对指定 state 进行增量数据修改或者增加
 * @param state store.state.item
 * @param data 需要保存的数据体
 */
export function incremental(state, data) {
  Object.keys(data).forEach(key => {
    if (state[key]) {
      state[key] = data[key];
    }
    else {
      Vue.set(state, key, data[key]);
    }
  });
}
