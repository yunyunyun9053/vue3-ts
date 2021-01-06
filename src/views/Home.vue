<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import HelloWorld from '@/components/HelloWorld.vue'// @ is an alias to /src

// @Options({
//   components: {
//     HelloWorld
//   }
// })
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup () {
	},
	created() {
		console.log('in home')
	}
}
</script>
<style lang="less" scoped>
</style>
