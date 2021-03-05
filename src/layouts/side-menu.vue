<template>
	<a-layout-sider
		:collapsed="collapsed"
		:trigger="null"
		:collapsible="collapsible"
		width="256px"
		:class="['sider', isDesktop ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]">
		<Logo :title="'title'" />
		<Menu :collapsed="collapsed" :menus="menus" :mode="mode" :theme="theme" @onSelect="onSelect"></Menu>
	</a-layout-sider>
</template>
<script>
import { defineComponent } from 'vue'

import Menu from './menu.vue'
import Logo from '@/components/Logo'

export default defineComponent({
  name: 'SideMenu',
  components: { Menu, Logo },
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
    },
    isDesktop: {
      type: Boolean,
      default: false
    },
    fixSiderbar: {
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
</style>
