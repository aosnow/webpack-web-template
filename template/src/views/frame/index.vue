<!--------------------------------------------------
  name: index.vue
  author: 喵大斯( mschool.tech )
  created: 2019/8/26
---------------------------------------------------->

<template>
  <div class="homepage">
    <h2>示例主页：</h2>
    <yh-button>
      <img src="~@/assets/logo.png" alt="none" width="30" height="30">
      {{content}}
      <img :src="ImgLogo" alt="none" width="30" height="30">
    </yh-button>

    <switch-group>
      switch-group 的包含内容：
      <div class="homepage__logo"></div>
    </switch-group>

  </div>
</template>

<script>
import { SwitchGroup } from '@/components';
import ImgLogo from '@/assets/logo.png';

export default {
  name: 'index',
  components: { SwitchGroup },
  data() {
    return {
      content: 'Template page: index.vue',
      ImgLogo
    };
  }
};
</script>

<style lang="scss">
@import "~@/css/common/var";

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
