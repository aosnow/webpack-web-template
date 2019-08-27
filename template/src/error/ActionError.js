// ------------------------------------------------------------------------------
// name: ActionError
// author: 喵大斯( mschool.tech )
// created: 2019/8/5 19:33
// ------------------------------------------------------------------------------

export default class ActionError extends Error {

  /**
   * Vuex Action 错误
   * @param {String} message
   * @param {ActionConf} action
   * @param {State} state
   */
  constructor(message, action, state) {
    super(message);
    this.name = 'ActionError';
    this.action = action;
    this.state = state;
  }
}
