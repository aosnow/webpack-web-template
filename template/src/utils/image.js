// ------------------------------------------------------------------------------
// name: image
// author: mudas( mschool.tech )
// created: 2021/4/25 16:32
// ------------------------------------------------------------------------------

import { isAbsoluteURL, mergeURL } from '@mudas/util';

export function prefixURL(url) {
  if (isAbsoluteURL(url)) return url;
  return mergeURL('//img.blibao.com/', url);
}
