// ------------------------------------------------------------------------------
// name: config
// author: 喵大斯( mschool.tech )
// created: 2019/8/7 18:00
// ------------------------------------------------------------------------------

import { StorageType } from '@mudas/storage';
import * as Types from '@/store/types';

export default [
  // 环境信息
  {
    type: Types.ENV_PARAMS,
    storage: StorageType.sessionStorage,
    expire: 0,
    restore: (store, cacheData, conf) => store.commit(Types.ENV_PARAMS, cacheData.payload)
  },
  {
    type: Types.USER_LOGIN,
    storage: StorageType.sessionStorage,
    expire: 0,
    restore: (store, cacheData, conf) => store.commit(Types.USER_LOGIN, cacheData.payload)
  }
];
