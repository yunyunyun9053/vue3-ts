// import Vue from 'vue'
import { DEVICE_TYPE } from '@/utils/device'
import { computed } from 'vue'
import { useStore } from '@/store'

function mixin () {
  const store = useStore()
  const navTheme = computed(() => {
    return store.state.app.theme
  })
  const primaryColor = computed(() => {
    return store.state.app.color
  })
  const layoutMode = computed(() => {
    return store.state.app.layout
  })
  const colorWeak = computed(() => {
    return store.state.app.weak
  })
  const fixedHeader = computed(() => {
    return store.state.app.fixedHeader
  })
  const fixSiderbar = computed(() => {
    return store.state.app.fixSiderbar
  })
  const fixSidebar = computed(() => {
    return store.state.app.fixSiderbar
  })
  const contentWidth = computed(() => {
    return store.state.app.contentWidth
  })
  const autoHideHeader = computed(() => {
    return store.state.app.autoHideHeader
  })
  const sidebarOpened = computed(() => {
    return store.state.app.sidebar
  })
  const multiTab = computed(() => {
    return store.state.app.multiTab
  })
  function isTopMenu () {
    return store.state.app.layout === 'topmenu'
  }
  function isSideMenu () {
    return !isTopMenu()
  }

  return {
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
  }
}
function mixinDevice () {
  const store = useStore()
  const device = computed(() => {
    return store.state.app.device
  })
  function isMobile () {
    return store.state.app.device === DEVICE_TYPE.MOBILE
  }
  function isDesktop () {
    return store.state.app.device === DEVICE_TYPE.DESKTOP
  }
  function isTablet () {
    return store.state.app.device === DEVICE_TYPE.TABLET
  }
  return {
    device,
    isMobile,
    isDesktop,
    isTablet
  }
}

export { mixin, mixinDevice }
