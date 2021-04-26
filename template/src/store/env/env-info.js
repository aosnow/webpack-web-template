// ------------------------------------------------------------------------------
// name: env
// author: mudas( mschool.tech )
// created: 2020/3/30 16:50
// ------------------------------------------------------------------------------

import * as Types from '@/store/types';
import EasyStore, { namespace } from '@mudas/store';

const ENV_PARAMS = namespace(Types.ENV_PARAMS);

const Config = [
  {
    type: ENV_PARAMS,
    state: {
      a: 1,
      b: 2,
      c: 3
    },
    increment: true
  }
];

export default new EasyStore(Config).output();
