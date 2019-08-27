<!--------------------------------------------------
  name: index.vue
  author: 喵大斯( mschool.tech )
  created: 2019/8/26
---------------------------------------------------->

<template>
  <div class="homepage">
    <h2>示例主页：</h2>
    <yh-button>{{content}}</yh-button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      content: 'Template page: index.vue'
    };
  }
};
</script>

<style>
.homepage {}
</style>
