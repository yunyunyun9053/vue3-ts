<template>
  <div class="hello">
    <a-tabs v-model:activeKey="layoutMode" @change="handleLayout">
			<a-tab-pane key="sidemenu" tab="sidemenu">
				sidemenu
			</a-tab-pane>
			<a-tab-pane key="topmenu" tab="topmenu">
				topmenu
			</a-tab-pane>
		</a-tabs>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'ChangeLayout',
	setup () {
		const store = useStore()
		const layoutMode = ref(store.state.app.layout)
		function handleFixSiderbar (fixed: boolean) {
      if (layoutMode.value === 'topmenu') {
        store.dispatch('ToggleFixSiderbar', false)
        return
      }
      store.dispatch('ToggleFixSiderbar', fixed)
    }
		function handleLayout (mode: string) {
			store.dispatch('ToggleLayoutMode', mode)
			store.dispatch('ToggleTheme', mode === 'topmenu' ? 'light' : 'dark')
      // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
      handleFixSiderbar(false)
		}
		return {
			layoutMode,
			handleFixSiderbar,
			handleLayout
		}
	}
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
