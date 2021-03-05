<template>
	<div class="user-menu">
		<span>{{ userName }}</span>
		<a-button type="link" @click="changeLang">
			{{ $t('changeLang') }}
		</a-button>
		<a-button type="link" @click="handleLogout">
			登出
		</a-button>
	</div>
</template>

<script lang="ts">

import { defineComponent, computed } from 'vue'
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
		const store = useStore()
    const userName = computed(() => {
			return store.getters.userName
		})
		const lang = computed(() => {
			return store.getters.lang
		})
    const handleLogout = () => {
      store.dispatch('Logout').then(() => {
				setTimeout(() => {
					window.location.reload()
				}, 16)
			})
		}
		const changeLang = () => {
			store.dispatch('ChangeLang', lang.value === 'en' ? 'zh-cn' : 'en')
		}
    return {
			lang,
			userName,
			changeLang,
			handleLogout
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
