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

import { loginR } from '@/api/user'

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
		const name = computed( () => {
			console.log(store, 'store')
			return store.state.user.name
		})
		const changeName = (name: string) => {

			store.dispatch('changeName', name)

			loginR({ name: 'kkk', password: 'aaa' }).then((res: any) => {
				console.log('res ', res)
			})
		} 
		return {
			name,
			changeName
		}
	}
})

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
