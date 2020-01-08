<template>
  <el-button v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'YhButton',
  props: {}
};
</script>

<style lang="scss">
</style>
