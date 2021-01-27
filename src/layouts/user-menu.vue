<template>
	<div class="user-menu">
		<span>{{ userName }}</span>
		<a-button type="link" @click="handleLogout">
			登出
		</a-button>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { getCurrentInstance, computed, defineComponent } from "vue"
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
      const loginForm = (current as any).data.ruleForm
      store.dispatch('Logout').then(() => {
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
	created() {
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
