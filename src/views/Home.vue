<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome"/>
  </div>
</template>

<script lang="ts">

import HelloWorld from '@/components/HelloWorld.vue'// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
	created() {
		console.log('in home')
	}
}
</script>
<style lang="less" scoped>
</style>
