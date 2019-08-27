// ------------------------------------------------------------------------------
// name: ServiceError
// author: mudas( mschool.tech )
// created: 2019.08.05 上午 2:53
// ------------------------------------------------------------------------------

export default class ServiceError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
  }
}
