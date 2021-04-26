// ------------------------------------------------------------------------------
// name: transformResponse
// author: mudas( mschool.tech )
// created: 2019.08.05 上午 2:31
// ------------------------------------------------------------------------------

import {
  isUndefined,
  isObject,
  isFormData,
  isArrayBuffer, isArrayBufferView, isBuffer, isStream,
  isFile, isBlob,
  isURLSearchParams
} from 'axios/lib/utils';
import { isPlainObject } from '@mudas/util';
import { ContentType } from '@mudas/http';

function setContentTypeIfUnset(headers, value) {
  if (!isUndefined(headers) && isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

export default [
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  function(data, headers) {

    const contentType = headers['Content-Type'];

    if ((contentType === ContentType.form || contentType === ContentType.formData) && isPlainObject(data)) {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      return formData;
    }

    // 已具备相关数据结构的不做二次处理
    if (isFormData(data) || isArrayBuffer(data) || isBuffer(data) || isStream(data) || isFile(data) || isBlob(data)) {
      return data;
    }

    if (isArrayBufferView(data)) {
      return data.buffer;
    }

    if (isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, `${ContentType.form};charset=utf-8`);
      return data.toString();
    }

    if (isObject(data)) {
      setContentTypeIfUnset(headers, `${ContentType.json};charset=utf-8`);
      return JSON.stringify(data);
    }

    // 转发给 request.interceptor 进行处理
    return data;
  }
];
