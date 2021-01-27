<template>
  <div class="logo">
    <router-link :to="'/'">
      <img src="@/assets/logo.png" alt="">
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'Logo',
  components: {
  },
  props: {
    title: {
      type: String,
      default: 'title'
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.sider .logo img, .sider .logo svg {
  height: 28px;
  width: 28px;
  margin-right: 10px;
}
</style>
