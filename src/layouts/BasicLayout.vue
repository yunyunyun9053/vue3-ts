<template>
  <div class="layouts">
		<div>layouts</div>
		<div id="nav">
			<router-link to="/home">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div>
		<div>
			<router-view />
		</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

// @Options({
//   props: {
//   }
// })
// export default class BasicLayout extends Vue {
// }
export default {
  name: 'BasicLayout',
  components: {
	},
	beforeEnter: (to: any, from: any, next: any) => {
		// ...
		console.log('beforeEnter')
	},
  setup () {
	},
	created() {
		console.log('in BasicLayout')
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	#nav {
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>
