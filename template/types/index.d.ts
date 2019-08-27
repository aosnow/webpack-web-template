// ------------------------------------------------------------------------------
// name: index.d
// author: 喵大斯( mschool.tech )
// created: 2019/8/22
// ------------------------------------------------------------------------------

import { EasyHttpInstance } from '@mudas/http/types/EasyHttp';
import Storage from '@mudas/storage/types/Storage';
import { Config } from './config';

declare module 'vue/types/vue' {
  interface VueConstructor {
    conf:typeof Config;
    http:EasyHttpInstance;
    storage:Storage;
  }
}
