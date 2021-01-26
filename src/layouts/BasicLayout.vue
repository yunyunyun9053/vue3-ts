<template>
  <div class="layouts">
		<a-layout id="components-layout-demo-custom-trigger">
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
					@menuSelect="menuSelect"
				></side-menu>
			</a-drawer>
			<SideMenu
				v-else-if="isSideMenu()"
				:collapsed="collapsed"
				:menus="menus"
				:mode="layoutMode"
				:theme="navTheme"
			></SideMenu>

			<a-layout>
				<a-layout-header style="background: #fff; padding: 0">
					<menu-unfold-outlined
						v-if="collapsed"
						class="trigger"
						@click="toggle"
					/>
					<menu-fold-outlined v-else class="trigger" @click="toggle" />
					<UserMenu></UserMenu>
				</a-layout-header>
				<a-layout-content
					:style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
				>
					<div id="nav">
						<router-link to="/home">Home</router-link> |
						<router-link to="/about/about1">About</router-link>
					</div>
					<!-- <router-view /> -->
					<router-view v-slot="{ Component }">
						<transition name="fade" mode="out-in">
							<component :is="Component" />
						</transition>
					</router-view>
				</a-layout-content>
			</a-layout>
		</a-layout>
  </div>
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

export default defineComponent({
  name: 'BasicLayout',
  // mixins: [mixin, mixinDevice],
  components: {
		Menu,
		UserMenu,
		SideMenu
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
		const current = getCurrentInstance() as any // 获取当前组件实例
		const store = useStore()
		const routes = convertRoutes(store.getters.addRouters.find((item: RouteRecordRaw) => item.path === '/'))
		const menus = markRaw((routes && routes.children) || [])
		const collapsed = ref(false)

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
			console.log('menuSelect ', collapsed.value)
    }
    function drawerClose () {
      collapsed.value = false
    }
		return {
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
			isSideMenu,
			collapsed,
			toggle,
			menuSelect,
			drawerClose,
			device,
			isMobile,
			isDesktop,
			isTablet
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

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
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
