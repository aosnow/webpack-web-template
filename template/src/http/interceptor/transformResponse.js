// ------------------------------------------------------------------------------
// name: transformResponse
// author: mudas( mschool.tech )
// created: 2019.08.05 上午 2:31
// ------------------------------------------------------------------------------

import { isNil, isPlainObject } from '@/utils';
import StatusCode from '@/config/response.code.conf';

function genResponseData(code, data) {
  const newData = Object.create(null);
  newData.code = code;
  newData.data = data;
  return newData;
}

export default [
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  function(data) {
    // 当返回数据仅为 null/undefined/'' 时，强制返回 null 结果
    if (data === '' || isNil(data)) {
      return genResponseData(StatusCode.SUCCESS, null);
    }

    // 当 data 解析为 object 时，进行数据解析
    else if (isPlainObject(data)) {
      const { data: responseData, datas, code } = data;

      // 兼容老接口数据格式（无code只有data）
      if (!code && (datas || responseData)) return genResponseData(StatusCode.SUCCESS, datas || responseData);
    }

    // 保障输出结果结构为：
    // { data: { data, code } }
    return data;
  }
];
