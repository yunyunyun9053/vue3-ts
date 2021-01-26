<template>
	<a-layout-sider v-model:collapsed="collapsed" :trigger="null" :collapsible="collapsible" width="256px">
		<div class="logo" />
		<Menu :collapsed="collapsed" :menus="menus" :mode="mode" :theme="theme" @onSelect="onSelect"></Menu>
	</a-layout-sider>
</template>
<script>
import { defineComponent } from "vue"

import Menu from './menu.vue'

export default defineComponent({
  name: 'SideMenu',
  components: { Menu },
  props: {
		collapsed: {
      type: Boolean,
      default: false
		},
		menus: {
      type: Array,
      default: () => {
				return []
			}
		},
		mode: {
      type: String,
      default: 'inline'
		},
		theme: {
      type: String,
      default: 'dark'
		},
    collapsible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSelect (obj) {
			console.log('onSelect ', obj)
      this.$emit('menuSelect', obj)
    }
  }
})
</script>
<style lang="less">
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>