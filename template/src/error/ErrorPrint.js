// ------------------------------------------------------------------------------
// name: ErrorPrint
// author: mudas( mschool.tech )
// created: 2021/4/27 11:57
// ------------------------------------------------------------------------------

import { merge } from '@mudas/util';

export default function(reason) {
  document.write(`<div class="error-block">
<div><span class="error-block__title">Error:</span>${reason.message}</div>
<div><span class="error-block__title">Source:</span>${JSON.stringify(merge({}, reason))}</div>
</div>
`);
}
