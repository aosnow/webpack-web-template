// ------------------------------------------------------------------------------
// name: transformResponse
// author: mudas( mschool.tech )
// created: 2019.08.05 上午 2:31
// ------------------------------------------------------------------------------

import StatusCode from '@/config/response.code.conf';

function genResponseData(code, data) {
  const newData = Object.create(null);
  newData.code = code;
  newData.data = data;
  return newData;
}

export default [
  function(data) {
    if (data === null) {
      return genResponseData(StatusCode.SUCCESS, null);
    }
    else if (typeof data === 'object') {
      const { data: responseData, datas, code } = data;

      // 兼容老接口数据格式（无code只有data）
      if (!code && (datas || responseData)) return genResponseData(StatusCode.SUCCESS, datas || responseData);
    }

    return data;
  }
];
