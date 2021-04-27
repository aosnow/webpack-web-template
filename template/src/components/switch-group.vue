<!--------------------------------------------------
  name: switch-group.vue
  author: 喵大斯( mschool.tech )
  created: 2019/6/26
---------------------------------------------------->

<template>
  <div class="switch-group">
    <header>content:</header>

    <el-form>
      <el-form-item>
        <el-switch v-model="value1" active-text="按月付费" inactive-text="按年付费"/>
      </el-form-item>

      <el-form-item>
        <el-switch v-model="value2"
                   active-color="#13ce66"
                   inactive-color="#ff4949"
                   active-text="按月付费"
                   inactive-text="按年付费"/>
      </el-form-item>
    </el-form>

    <div class="switch-group__slot">
      <header>slot.default:</header>
      <slot class="switch-group__slot--body"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'switch-group',
  data() {
    return {
      value1: false,
      value2: true
    };
  }
};
</script>

<style lang="scss">
@import "~@/css/base";

.switch-group {

  &__slot {
    border: $--border-base;
    padding: $--padding-base;
    margin: $--margin-base;
  }
}
</style>
