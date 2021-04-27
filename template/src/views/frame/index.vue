<!--------------------------------------------------
  name: index.vue
  author: 喵大斯( mschool.tech )
  created: 2019/8/26
---------------------------------------------------->

<template>
  <div class="homepage" v-loading.fullscreen="loading">
    <header>示例主页：</header>
    <el-button type="primary" icon="el-icon-search" @click="iconClickHandler">图标按钮</el-button>

    <el-button @click="imgClickHandler">
      <img src="~@/assets/logo.png" alt="none" width="12" height="12">
      <span v-text="content"/>
      <img :src="ImgLogo" alt="none" width="12" height="12">
    </el-button>

    <switch-group>
      switch-group 的包含内容：
      <div class="homepage__logo"/>
    </switch-group>

  </div>
</template>

<script>
import ImgLogo from '@/assets/logo.png';

export default {
  name: 'index',
  data() {
    return {
      loading: false,
      content: '图片按钮',
      ImgLogo
    };
  },

  methods: {
    iconClickHandler() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },

    imgClickHandler() {
      const h = this.$createElement;
      this.$message({
        message: h('div', null, [
          h('el-button', { attrs: { type: 'primary' } }, 'create button'),
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ])
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@/css/base";

.homepage {
  padding: $--padding-base;

  .homepage__logo {
    // 按普通 px 单位处理 PC 端排版
    width: 200px;

    // 同样可以使用以 rem 为单位来启用通用于移动和PC的单位方案，1rem=100px
    height: 2rem;

    // 背景图片打包测试
    background-image: url("#{$--assets-path}/logo.png");
  }

}
</style>
