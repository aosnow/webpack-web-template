// ------------------------------------------------------------------------------
// name: config
// author: 喵大斯( mschool.tech )
// created: 2019/8/7 18:00
// ------------------------------------------------------------------------------

import { StorageType } from '@mudas/storage';
import * as Types from '@/store/types/action';

export default [
  { type: Types.LOGIN, storage: StorageType.cookie, expire: 1800 }
];
