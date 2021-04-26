// ------------------------------------------------------------------------------
// name: ServiceError
// author: mudas( mschool.tech )
// created: 2019.08.05 上午 2:53
// ------------------------------------------------------------------------------

/**
 * [@mudas/storage] service error
 * @type {StorageServiceError}
 */
export default class ServiceError extends Error {

  /**
   * Vuex Action 错误
   * @param {string} message
   * @param {number} code
   */
  constructor(message, code) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
  }
}
