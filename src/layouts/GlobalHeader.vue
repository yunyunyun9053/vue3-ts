<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header
        v-if="visible"
        :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
        :style="{ padding: '0' }">
        <div v-if="mode === 'sidemenu'" class="header">
          <menu-unfold-outlined
						v-if="collapsed"
						class="trigger"
						@click="toggle"
					/>
					<menu-fold-outlined v-else class="trigger" @click="toggle" />
					<user-menu></user-menu>
        </div>
        <div v-else :class="['top-nav-header-index', theme]">
          <div class="header-index-wide">
            <div class="header-index-left">
              <logo class="top-nav-header" :show-title="device !== 'mobile'"/>
              <!-- <div class="top-nav-header logo" /> -->
							<Menu :menus="menus" :mode="'horizontal'" :theme="theme"></Menu>
            </div>
            <user-menu class="header-index-right"></user-menu>
						<!-- <UserMenu></UserMenu> -->
          </div>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script>
import Menu from './menu.vue'
// import Menu from './menu'
import UserMenu from './user-menu.vue'
import Logo from '@/components/Logo'
import config from '@/config/defaultSettings'
// import { mixin } from '@/utils/mixin'

import { defineComponent } from "vue"

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    UserMenu,
		Menu,
		Logo
  },
  // mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      default: false
		},
    fixedHeader: {
      type: Boolean,
      default: false
		},
    sidebarOpened: {
      type: Boolean,
      default: false
    },
    device: {
      type: String,
      default: 'desktop'
    }
  },
  data () {
    return {
      visible: true,
      oldScrollTop: 0,
      version: config.version
    }
  },
  mounted () {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    handleScroll () {
      if (!this.autoHideHeader) {
        return
      }

      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => {
          if (this.oldScrollTop > scrollTop) {
            this.visible = true
          } else if (scrollTop > 300 && this.visible) {
            this.visible = false
          } else if (scrollTop < 300 && !this.visible) {
            this.visible = true
          }
          this.oldScrollTop = scrollTop
          this.ticking = false
        })
      }
    },
    toggle () {
      this.$emit('toggle')
    }
  },
  beforeUnmount () {
    document.body.removeEventListener('scroll', this.handleScroll, true)
  }
})
</script>

<style lang="less">

.header-animat{
  position: relative;
  z-index: 105;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter, .showHeader-leave-to {
  opacity: 0;
}
.system-title,
.system-other {
  margin-right: 20px;
  font-weight: bold;
  font-size: 18px;
  line-height: 50px;
}
.system-other{
  cursor: pointer;
}
// .sider .logo {
//   padding-left: 0!important;
//   text-align: center;
// }
.sider .logo h1 {
  margin: 0!important;
}
</style>
