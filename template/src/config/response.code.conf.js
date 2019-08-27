// --------------------------------------------------
// API 请求响应的对应 CODE 编号列表
// --------------------------------------------------

const StatusCode = {
  // 请求成功
  SUCCESS: 10000,

  // 只有查看权限，无写权限
  ONLY_READ: 20001,

  // 无权限进行此操作，请联系管理员
  UNAUTHORIZED: 20002,

  // 缺少必选参数
  PARAM_REQUIRED: 40001,

  // 传入参数不合法
  PARAM_INVALID: 40002,

  // 未登录，请先登录
  NOSESSION: 40003,

  // 业务处理失败，请检查请求参数（比如服务端顾及到数据关联等，拒绝操作）
  FORBIDDEN: 40004,

  // 服务器忙，请稍后再次尝试，或者跟管理员联系
  BUSINESS: 40005,

  // 请求的资源不存在
  NORESOURCE: 40010,

  // 用户名错误
  USER_WRONG: 41001,

  // 密码错误
  PASSWORD_WRONG: 41002,

  // 账号未激活，请联系管理员
  USER_NOT_ACTIVED: 41003,

  // 新老平台账号出现错误统一状态，具体错误由具体状态码决定
  // 新老平台账号有问题
  USER_NOT_MIGRATE: 41004,

  // 支付宝授权令牌无效---暂停使用
  TOCKEN_INVALID: 41005,

  // 刷新token失效
  REFRESH_TOKEN_ERROR: 40006,

  // 微信授权令牌不存在
  NOTOKEN: 41007,

  // 微信授权令牌不存在
  NOTOKEN_ERROR: 40008

};

// 检测 CODE 是否存在
StatusCode.has = code => Object.values(StatusCode).some(item => item === code);

export default StatusCode;
