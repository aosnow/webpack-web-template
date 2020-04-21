// ------------------------------------------------------------------------------
// name: transformResponse
// author: mudas( mschool.tech )
// created: 2019.08.05 上午 2:31
// ------------------------------------------------------------------------------

import {
  isFormData,
  isArrayBuffer,
  isBuffer,
  isStream,
  isFile,
  isBlob,
  isObject,
  isArrayBufferView,
  isURLSearchParams,
  isUndefined
} from 'axios/lib/utils';
import isPlainObject from 'lodash-es/isPlainObject';
import { ContentType } from '@mudas/http';

function setContentTypeIfUnset(headers, value) {
  if (!isUndefined(headers) && isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

export default [
  // 拦截 request，处理业务逻辑错误
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
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    // 转发给 request.interceptor 进行处理
    return data;
  }
];
