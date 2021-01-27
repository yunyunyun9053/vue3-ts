<template>
	<a-layout id="components-layout-demo-custom-trigger" :class="['layout', device]">
		<a-drawer
			v-if="isMobile()"
			placement="left"
			:wrapClassName="`drawer-sider ${navTheme}`"
			:closable="false"
			:visible="collapsed"
			@close="drawerClose"
		>
			<side-menu
				mode="inline"
				:menus="menus"
				:theme="navTheme"
				:collapsed="false"
				:collapsible="true"
				:isDesktop="isDesktop()"
				:fixSiderbar="fixSiderbar"
				@menuSelect="menuSelect"
			></side-menu>
		</a-drawer>
		<side-menu
			v-else-if="isSideMenu()"
			:collapsed="collapsed"
			:menus="menus"
			:mode="'inline'"
			:theme="navTheme"
			:collapsible="true"
			:isDesktop="isDesktop()"
			:fixSiderbar="fixSiderbar"
		></side-menu>

		<a-layout :class="[layoutMode, `content-width-${contentWidth}`]" :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">

			<global-header
				:mode="layoutMode"
				:menus="menus"
				:theme="navTheme"
				:collapsed="collapsed"
				:device="device"
				@toggle="toggle"
			/>

			<a-layout-content
				:style="{ height: '100%', margin: '24px 24px 0', paddingTop: fixedHeader ? '64px' : '0' }"
			>
				<div id="nav">
					<router-link to="/home">Home</router-link> |
					<router-link to="/about/about1">About</router-link>
				</div>
				<ChangeLayout></ChangeLayout>
				<!-- <router-view /> -->
				<router-view v-slot="{ Component }">
					<transition name="fade" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { convertRoutes } from '@/utils/routeConvert'
import { mixin, mixinDevice } from '@/utils/mixin'
import { triggerWindowResizeEvent } from '@/utils/util'

import { Options, Vue } from 'vue-class-component'
import { getCurrentInstance, computed, defineComponent, markRaw, shallowRef, watch, reactive, ref } from "vue"
import { RouteRecordRaw } from 'vue-router'

import Menu from './menu.vue'
// import Menu from './menu'
import UserMenu from './user-menu.vue'
import SideMenu from './side-menu.vue'
import GlobalHeader from './GlobalHeader.vue'
import ChangeLayout from './change-layout.vue'

export default defineComponent({
  name: 'BasicLayout',
  // mixins: [mixin, mixinDevice],
  components: {
		Menu,
		UserMenu,
		SideMenu,
		GlobalHeader,
		ChangeLayout
	},
	data() {
		return {
			selectedKeys: ['1'],
			// collapsed: true,
			mode: 'inline'
		}
	},
	beforeEnter: (to: any, from: any, next: any) => {
		// ...
		console.log('beforeEnter')
	},
  setup (props, context) {
		const collapsed = ref(false)
		const current = getCurrentInstance() as any // 获取当前组件实例
		const store = useStore()
		const routes = convertRoutes(store.getters.addRouters.find((item: RouteRecordRaw) => item.path === '/'))
		const menus = markRaw((routes && routes.children) || [])

		const {
			layoutMode,
			navTheme,
			primaryColor,
			colorWeak,
			fixedHeader,
			fixSiderbar,
			fixSidebar,
			contentWidth,
			autoHideHeader,
			sidebarOpened,
			multiTab,
			isTopMenu,
			isSideMenu
		} = mixin()
		const {
			device,
			isMobile,
			isDesktop,
			isTablet
		} = mixinDevice()
		
		// computed
		const contentPaddingLeft = computed( () => {
			if (!fixSidebar.value || isMobile()) {
        return '0'
			}
      if (sidebarOpened.value) {
        return '256px'
      }
      return '80px'
		})
		// watch
		watch(sidebarOpened, value => {
			collapsed.value = !value
		})
		
		// methods
		function toggle () {
			collapsed.value = !collapsed.value
			store.dispatch('setSidebar', !collapsed.value)
      triggerWindowResizeEvent()
    }
    function menuSelect () {
      collapsed.value = !collapsed.value
			store.dispatch('setSidebar', !collapsed.value)
      triggerWindowResizeEvent()
    }
    function drawerClose () {
      collapsed.value = false
    }
		return {
			collapsed,
			menus,
			layoutMode,
			navTheme,
			primaryColor,
			colorWeak,
			fixedHeader,
			fixSiderbar,
			fixSidebar,
			contentWidth,
			autoHideHeader,
			sidebarOpened,
			multiTab,
			device,
			contentPaddingLeft,

			// methods
			isTopMenu,
			isSideMenu,
			isMobile,
			isDesktop,
			isTablet,
			toggle,
			menuSelect,
			drawerClose,
		}
	},
	watch: {
	},
	created() {
		console.log('in BasicLayout')
	}
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.layouts, .ant-layout-has-sider, .ant-layout-sider{
	height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

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
