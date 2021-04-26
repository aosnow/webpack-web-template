<template>
  <div id="app">
    <keep-alive>
      <!--只要显式设置成 true，则页面将被缓存-->
      <router-view v-if="$route.meta.cache&&ready"></router-view>
    </keep-alive>
    <!--默认不进行缓存-->
    <router-view v-if="!$route.meta.cache&&ready"></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import * as Types from '@/store/types';
import StatusCode from '@/config/response.code.conf';
import { parsingURLParams } from '@mudas/env';

export default {
  data() {
    return {
      ready: false
    };
  },

  created() {
    this.parseParams();
  },

  handler: {
    // 由 `http/interceptor/response` 触发该全局事件
    [StatusCode.NOSESSION](option) {
      // 登录失效
      // this.$router.replace({ path: '/login' });
    }
  },

  methods: {
    // 分析环境参数，并存入缓存和 store
    // 保障在其它页面刷新也能保留环境级的参数信息
    parseParams() {
      // 分析和存储环境参数
      const envInfo = { query: { ...parsingURLParams() }, env: { ...this.$env } };

      // 缓存环境参数
      this.$store.commit(Types.ENV_PARAMS, envInfo);
      Vue.storage.cache(Types.ENV_PARAMS, envInfo);

      // 标记环境分析完成
      this.ready = true;
    }
  }
};
</script>
