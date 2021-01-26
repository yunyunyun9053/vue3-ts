<template>
	<!-- <div class="menu"> -->
    <a-menu
      :openKeys="openKeys"
      :selectedKeys="selectedKeys"
      :mode="mode"
      :theme="theme"
      :inline-collapsed="collapsed"
			@openChange="onOpenChange"
			@click="onClick"
    >
      <template v-for="item in menus" :key="item.path">
        <template v-if="item.children && item.children.length > 0 && !item.meta.hideChildrenInMenu">
          <!-- <sub-menu :menu-info="item" :key="item.path" @titleClick="titleClick" /> -->
          <sub-menu :menu-info="item" :key="item.path" />
        </template>
        <template v-else>
          <a-menu-item :key="item.path">
						<router-link :to="item.path">
							<component :is='item.meta.icon'></component>
							<!-- <AppstoreOutlined /> -->
							<span>{{ item.meta.title }}</span>
						</router-link>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  <!-- </div> -->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import { getCurrentInstance, computed, defineComponent, unref } from "vue"
// import { Menu } from 'ant-design-vue'
import SubMenu from './sub-menu.vue'

export default  defineComponent({
  name: 'Menu',
  components: {
		'sub-menu': SubMenu
	},
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
		}
  },
	beforeEnter: (to: any, from: any, next: any) => {
		// ...
	},
	data() {
    return {
      // collapsed: false,
			selectedKeys: [] as string[],
			openKeys: [] as string[],
      cachedOpenKeys: [] as string[]
    }
	},
	computed: {
		rootSubmenuKeys (): Array<string>{
			const keys: Array<string> = []
			this.menus.forEach((item: any) => keys.push(item.path))
			return keys
		}
	},
  setup () {
	},
  watch: {
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat()
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    $route: function () {
      this.updateMenu()
    }
  },
	created() {
		console.log('in menu ', this.$route)
		this.updateMenu()
	},
	methods: {
    updateMenu () {
			const routes = this.$route.matched.concat()
      const { hidden, activeMenu } = this.$route.meta
      if (activeMenu) {
        this.selectedKeys = [activeMenu]
      } else {
        if (routes.length >= 3 && hidden) {
          routes.pop()
          this.selectedKeys = [routes[routes.length - 1].path]
        } else {
          this.selectedKeys = [routes.pop()?.path as string]
        }
      }
      const openKeys: string[] = []
      if (this.mode === 'inline') {
        routes.forEach(item => {
          openKeys.push(item.path)
        })
      }

			this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
			console.log('this.openKeys ', this.openKeys, this.cachedOpenKeys)
		},
    onOpenChange (openChangeKeys: Array<string>) {
			console.log('onOpenChange: ', openChangeKeys)
      // 在水平模式下时执行，并且不再执行后续
      if (this.mode === 'horizontal') {
        this.openKeys = openChangeKeys
        return
			}
			const rootSubKeys = unref(this.rootSubmenuKeys)
			console.log('rootSubKeys', rootSubKeys)
      // 非水平模式时
      const latestOpenKey =  openChangeKeys.find(key => !this.openKeys.includes(key))
      if (!(rootSubKeys.includes(latestOpenKey as string))) {
        this.openKeys = openChangeKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
		onClick (e: any) {
			console.log('select ', e)
			this.$emit('onSelect', e)
		}
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.ant-menu {
	.ant-menu-item, .ant-menu-submenu {
		text-align: left;
	}
}
</style>
