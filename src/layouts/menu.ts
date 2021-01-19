
import { defineComponent, h, reactive, getCurrentInstance, computed, watch, toRaw, unref  } from "vue"
import { createRouter, createWebHistory, RouteRecordRaw  } from 'vue-router'
import Menu from 'ant-design-vue/es/menu'

export default {
  name: 'menu',
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
	data() {
    return {
    }
  },
	setup(props: any, context: any) {
		const current = getCurrentInstance() // 获取当前组件实例
		const $slots = (current as any).ctx.$slots
		console.log('current: ', current)
		let selectedKeys: Array<string> =  reactive([])
		let openKeys: Array<string> =  reactive([])
		let cachedOpenKeys: Array<string> =  reactive([])
		const $route = (current as any).ctx.$route

		const rootSubmenuKeys = computed(() => {
			const keys: Array<string> = []
			props.menus.forEach((item: any) => keys.push(item.path))
			return keys
		})

		watch(() => props.collapsed, (oldVlaue, newValue) => {
      if (newValue) {
        cachedOpenKeys = openKeys.concat()
        openKeys = []
      } else {
        openKeys = cachedOpenKeys
      }
		})
		watch(() => $route, (oldVlaue, newValue) => {
      updateMenu()
    })
		const updateMenu = () => {
			
      const routes = $route.matched.concat()

      if (routes.length >= 4 && $route.meta.hidden) {
        routes.pop()
        selectedKeys = [routes[2].path]
      } else {
        selectedKeys = [(routes.pop()?.path) as string]
      }

      let openKeys: string[] = []
      if (props.mode === 'inline') {
        routes.forEach((item: any) => {
          openKeys.push(item.path)
        })
			}
			console.log('openKeys ', props.collapsed, openKeys, cachedOpenKeys)
			props.collapsed ? (cachedOpenKeys = openKeys) : (openKeys = openKeys)
			console.log('openKeys ', openKeys, cachedOpenKeys)
		}
		const titleClick = (e: any) => {
			console.log('titleClick ', e, openKeys)
			const { key } = e
			if (openKeys.includes(key)) {
				const index = openKeys.findIndex(item => item === key)
				openKeys.splice(index, 1)
			} else {
				openKeys.push(e.key)
			}
			console.log('titleClick push', e, openKeys)
		}
		const onOpenChange = (openChangeKeys: Array<string>) => {
      // 在水平模式下时执行，并且不再执行后续
      if (props.mode === 'horizontal') {
        openKeys = openChangeKeys
        return
			}
			const rootSubKeys = unref(rootSubmenuKeys)
      // 非水平模式时
      const latestOpenKey = openChangeKeys.find(key => !openKeys.includes(key))
      if (!(rootSubKeys.includes(latestOpenKey as string))) {
        openKeys = openChangeKeys
      } else {
        openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
    const onSelect = (selected: any) => {
			console.log()
			let { item, key, selectedKeys } = selected
      selectedKeys = selectedKeys || [ key ]
      context.emit('select', { item, key, selectedKeys })
    }
		const renderIcon = (icon: string) => {
			console.log('in icon')
			const iconComponent = require('@ant-design/icons-vue')[icon]
			// return h('span', {}, 'test ')
			// return h(this.component, {}, '')
			return h(iconComponent, {}, '')
		}
		const renderItem = (menu: any) => {
			if (!menu.hidden) {
				return menu.children && !menu.hideChildrenInMenu ? renderSubMenu(menu) : renderMenuItem(menu)
			}
			return null
		}
		const renderSubMenu = (menu: any) => {
			const itemArr:any[] = []
			if (!menu.hideChildrenInMenu) {
				menu.children.forEach((item: any) => {
					const itemRender = renderItem(item)
					itemArr.push(itemRender)
				})
			}
			console.log('itemArr: ', itemArr)
			return h(Menu.SubMenu,
				{ key: menu.path },
				// [$slots.default(h('span', {}, [renderIcon(menu.meta.icon), menu.meta.title]))]
				{ title: () => (h('span', { ...context.attrs }, [renderIcon(menu.meta.icon),  h('span', {}, menu.meta.title)])),
					default: () => (h('template', {}, itemArr))
			 }
				)
		}
		const renderMenuItem = (menu: any) => {
			const target = menu.meta.target || null
			const CustomTag = target && 'a' || 'router-link'
			const props = { to: menu.path }
			const attrs = { href: menu.path, target: menu.meta.target }
	
			if (menu.children && menu.hideChildrenInMenu) {
				// 把有子菜单的 并且 父菜单是要隐藏子菜单的
				// 都给子菜单增加一个 hidden 属性
				// 用来给刷新页面时， selectedKeys 做控制用
				menu.children.forEach((item: any) => {
					item.meta = Object.assign(item.meta, { hidden: true })
				})
			}
			// <Menu.Item {...{ key: menu.path }}>
					// <CustomTag {...{ props, attrs }}>
			// 		{this.renderIcon(menu.meta.icon)}
			// 		<span>{this.$t(menu.meta.title)}</span>
			// 	</CustomTag>
			// </Menu.Item>
			return h(Menu.Item,
				{ key: menu.path },
				h(CustomTag, { ...props, ...attrs }, [renderIcon(menu.meta.icon), h('span', {}, menu.meta.title)])
				)
			// return () => (<Menu.item {...{ key: menu.path }}></Menu.item>)
		}
		const dynamicProps = {
			mode: props.mode,
			theme: props.theme,
			openKeys: openKeys,
			selectedKeys: selectedKeys,
			onClick: (...args: any) => {
				console.log('onClick')
				onSelect(args)
			},
			onOpenChange: (...args: Array<string>) => {
				console.log('onOpenChange')
				onOpenChange(args)
			}
			// on: {
			// 	openChange: (...args: Array<string>) => {
			// 		onOpenChange(args)
			// 	},
			// 	click: (...args: any) => {
			// 		onSelect(args)
			// 	}
			// }
		}
		const menuTree = props.menus.map((item: any) => {
			if (item.hidden) {
				return null
			}
			return renderItem(item)
		})
		console.log('Menu.SubMenu: ', menuTree)
		return () => h(Menu,
			{ ...dynamicProps },
			menuTree
			)
	},
  watch: {
	},
	methods: {
	}
}
