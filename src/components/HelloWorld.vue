<template>
  <div class="hello">
		<p>{{ msg }}</p>
    <a-button type="primary" @click="changeName('hello cora')">
			button
		</a-button>
		<p>{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import { useStore } from '@/store'
import { getCurrentInstance, computed, defineComponent } from "vue"
// @Options({
//   props: {
//     msg: String
//   }
// })
export default defineComponent({
	name: 'HelloWorld',
	props:{
		msg: { type: String }
	},
	setup (props, context) {
		const store = useStore()
		console.log('props ', props, 'context ', context)
		console.log(store.state.user.name, 'store')
		// const current = getCurrentInstance() // 获取当前组件实例
   	// console.log(current.ctx.$router.currentRoute.value)
   	// console.log(current)
		const name = computed( () => {
			console.log(store, 'store')
			return store.state.user.name
		})
		const changeName = (name: string) => {
			store.commit('getUserInfo', name)
		} 
		return {
			name,
			changeName
		}
	}
})

// @Options({
//   props: {
//     msg: String
//   }
// })
// export default class HelloWorld extends Vue {
// 	msg!: string
// 	setup () {
// 		const store = useStore()
// 		console.log(store, 'store')
// 		// const current = getCurrentInstance() // 获取当前组件实例
//    	// console.log(current.ctx.$router.currentRoute.value)
//    	// console.log(current)
// 		const name = computed( () => {
// 			console.log(store, 'store')
// 			return store.state.user.name
// 		})
// 		const changeName = (name: string) => {
// 			store.commit('user/getUserInfo', name)
// 		} 
// 		return { name, changeName }
// 	}
// 	created() {
// 		// console.log('store', this.$store)
// 	}
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
