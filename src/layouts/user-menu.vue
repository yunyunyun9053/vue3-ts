<template>
	<div class="user-menu">
		<span>{{ userName }}</span>
		<a-button type="link" @click="handleLogout">
			登出
		</a-button>
	</div>
</template>

<script lang="ts">

import { getCurrentInstance, defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'UserMenu',
  components: {
	},
  props: {
  },
	data() {
    return {}
  },
  setup () {
		const current = getCurrentInstance() // 获取当前组件实例
    const store = useStore()
    const handleLogout = () => {
      store.dispatch('Logout').then(() => {
				console.log('Logout store:', store)
				setTimeout(() => {
					window.location.reload()
				}, 16)
			})
    }
    const userName = store.getters.userName
    return {
			handleLogout,
			userName
    }
	},
	methods: {
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.user-menu {
	float: right;
}
</style>
