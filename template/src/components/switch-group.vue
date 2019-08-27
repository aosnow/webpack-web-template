<!--------------------------------------------------
  name: switch-group.vue
  author: 喵大斯( mschool.tech )
  created: 2019/6/26
---------------------------------------------------->

<template>
  <div class="specified-scope">
    <h2>content:</h2>
    <el-switch
      v-model="value1"
      active-text="按月付费"
      inactive-text="按年付费">
    </el-switch>
    <el-switch
      style="display: block"
      v-model="value2"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="按月付费"
      inactive-text="按年付费">
    </el-switch>

    <h2>slot.default:</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'switch-group',
  data() {
    return {
      value1: true,
      value2: true
    };
  }
};
</script>

<style>
.specified-scope{}
</style>
