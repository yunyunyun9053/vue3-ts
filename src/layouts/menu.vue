<template>
	<div class="menu">
    <a-menu
      :openKeys="openKeys"
      :selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menus" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
            <!-- <PieChartOutlined /> -->
						<router-link :to="item.path">{{ item.meta.title }}</router-link>
            <!-- <span>{{ item.meta.title }}</span> -->
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.path" />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue'

import { getCurrentInstance, computed, defineComponent } from "vue"

// import { Menu } from 'ant-design-vue'
import SubMenu from './sub-menu.vue'

export default  defineComponent({
  name: 'Menu',
  components: {
		'sub-menu': SubMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
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
      default: ''
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

      if (routes.length >= 4 && this.$route.meta.hidden) {
        routes.pop()
        this.selectedKeys = [routes[2].path]
      } else {
        this.selectedKeys = [routes.pop()?.path as string]
      }

      const openKeys: string[] = []
      if (this.mode === 'inline') {
        routes.forEach(item => {
          openKeys.push(item.path)
        })
      }
      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
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
