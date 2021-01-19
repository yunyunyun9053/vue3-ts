<template>
  <div class="layouts">
		<a-layout id="components-layout-demo-custom-trigger">
			<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible width="256px">
				<div class="logo" />
				<Menu :collapsed="collapsed" :menus="menus" :mode="mode" :theme="'dark'"></Menu>
			</a-layout-sider>
			<a-layout>
				<a-layout-header style="background: #fff; padding: 0">
					<menu-unfold-outlined
						v-if="collapsed"
						class="trigger"
						@click="() => (collapsed = !collapsed)"
					/>
					<menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
					<UserMenu></UserMenu>
				</a-layout-header>
				<a-layout-content
					:style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
				>
					<div id="nav">
						<router-link to="/home">Home</router-link> |
						<router-link to="/about">About</router-link>
					</div>
					<router-view />
				</a-layout-content>
			</a-layout>
		</a-layout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { useStore } from '@/store'
import { convertRoutes } from '@/utils/routeConvert'
import { getCurrentInstance, computed, defineComponent, markRaw } from "vue"
import { RouteRecordRaw } from 'vue-router'

// import Menu from './menu.vue'
import Menu from './menu'
import UserMenu from './user-menu.vue'

export default defineComponent({
  name: 'BasicLayout',
  components: {
		Menu,
		UserOutlined,
		VideoCameraOutlined,
		UploadOutlined,
		MenuUnfoldOutlined,
		MenuFoldOutlined,
		UserMenu
	},
	data() {
		return {
			selectedKeys: ['1'],
			collapsed: false,
			mode: 'inline'
		}
	},
	beforeEnter: (to: any, from: any, next: any) => {
		// ...
		console.log('beforeEnter')
	},
  setup () {
		const store = useStore()
		console.log(store.getters.addRouters, 'addRouters')
		// const menus = computed( () => {
		// 	const routes = convertRoutes(store.getters.addRouters.find((item: RouteRecordRaw) => item.path === '/'))
		// 	console.log('store', store.getters.addRouters, 'routes: ', routes)
		// 	return (routes && routes.children) || []
		// })
		const routes = convertRoutes(store.getters.addRouters.find((item: RouteRecordRaw) => item.path === '/'))
		const menus = markRaw((routes && routes.children) || [])
		console.log('menus ', menus)
		return {
			menus
		}
	},
	created() {
		console.log('in BasicLayout')
	}
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
