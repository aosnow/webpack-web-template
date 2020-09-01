<template>
  <div id="app">
    <keep-alive>
      <!--只要未显式设置成 fasle，则页面将被缓存（包含未设置 cache 值，即默认 true）-->
      <router-view v-if="$route.meta.cache!==false&&ready"></router-view>
    </keep-alive>
    <!--强制显式设置成 false，则不进行缓存-->
    <router-view v-if="$route.meta.cache===false&&ready"></router-view>
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
    this.parsingParams();
  },

  handler: {
    [StatusCode.NOSESSION](option) {
      // 登录失效
      // this.$router.replace({ path: '/login' });
    }
  },

  methods: {
    // 分析环境参数，并存入缓存和 store
    // 保障在其它页面刷新也能保留环境级的参数信息
    parsingParams() {
      // 分析和存储环境参数
      const envInfo = { query: { ...parsingURLParams() } };

      // 缓存环境参数
      this.$store.commit(Types.ENV_INFO, envInfo);
      Vue.storage.cache(Types.ENV_INFO, envInfo);

      // 标记环境分析完成
      this.ready = true;
    }
  }
};
</script>
