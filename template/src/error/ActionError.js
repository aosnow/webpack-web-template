// ------------------------------------------------------------------------------
// name: ActionError
// author: 喵大斯( mschool.tech )
// created: 2019/8/5 19:33
// ------------------------------------------------------------------------------

/**
 * [@mudas/storage] vuex action error
 * @type {StorageActionError}
 */
export default class ActionError extends Error {

  /**
   * Vuex Action 错误
   * @param {string} message
   * @param {StorageActionConf} action
   * @param {StorageState} state
   */
  constructor(message, action, state) {
    super(message);
    this.name = 'ActionError';
    this.action = action;
    this.state = state;
  }
}
