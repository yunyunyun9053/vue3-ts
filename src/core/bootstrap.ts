// import store from '@/store/'

import { useStore } from '@/store'
import {
  ACCESS_TOKEN,
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR_WEAK,
  SIDEBAR_TYPE,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_TAB
} from '@/store/mutation-types'
import config from '@/config/defaultSettings'

export default function Initializer () {
	const store = useStore()
  store.commit('SET_SIDEBAR_TYPE', localStorage.getItem(SIDEBAR_TYPE) || true)
  store.commit('TOGGLE_THEME', localStorage.getItem(DEFAULT_THEME) || config.navTheme)
  store.commit('TOGGLE_LAYOUT_MODE', localStorage.getItem(DEFAULT_LAYOUT_MODE) || config.layout)
  store.commit('TOGGLE_FIXED_HEADER', localStorage.getItem(DEFAULT_FIXED_HEADER) || config.fixedHeader)
  store.commit('TOGGLE_FIXED_SIDERBAR', localStorage.getItem(DEFAULT_FIXED_SIDEMENU) || config.fixSiderbar)
  store.commit('TOGGLE_CONTENT_WIDTH', localStorage.getItem(DEFAULT_CONTENT_WIDTH_TYPE) || config.contentWidth)
  store.commit('TOGGLE_FIXED_HEADER_HIDDEN', localStorage.getItem(DEFAULT_FIXED_HEADER_HIDDEN) || config.autoHideHeader)
  store.commit('TOGGLE_WEAK', localStorage.getItem(DEFAULT_COLOR_WEAK) || config.colorWeak)
  store.commit('TOGGLE_COLOR', localStorage.getItem(DEFAULT_COLOR) || config.primaryColor)
  store.commit('TOGGLE_MULTI_TAB', localStorage.getItem(DEFAULT_MULTI_TAB) || config.multiTab)
  store.commit('SET_TOKEN', localStorage.getItem(ACCESS_TOKEN))

  // last step
}
