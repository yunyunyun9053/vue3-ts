import { Module } from 'vuex'
import { State } from '@/store'

import {
  SIDEBAR_TYPE,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR,
  DEFAULT_COLOR_WEAK,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_TAB
} from '@/store/mutation-types'

export interface AppState {
	sidebar: Boolean;
	device: string;
	theme: string;
	layout: string;
	contentWidth: string;
	fixedHeader: Boolean;
	fixSiderbar: Boolean;
	autoHideHeader: Boolean;
	color: string;
	weak: Boolean;
	multiTab: Boolean;
}
const app: Module<AppState, State> = {
	state: {
		sidebar: true,
    device: 'desktop',
    theme: 'dark',
    layout: 'inline',
    contentWidth: '',
    fixedHeader: false,
    fixSiderbar: false,
    autoHideHeader: false,
    color: '',
    weak: false,
    multiTab: true
	},
	mutations: {
		SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type
      localStorage.setItem(SIDEBAR_TYPE, type)
    },
    CLOSE_SIDEBAR: (state) => {
      localStorage.setItem(SIDEBAR_TYPE, 'true')
      state.sidebar = false
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_THEME: (state, theme) => {
      // setStore('_DEFAULT_THEME', theme)
      localStorage.setItem(DEFAULT_THEME, theme)
      state.theme = theme
    },
    TOGGLE_LAYOUT_MODE: (state, layout) => {
      localStorage.setItem(DEFAULT_LAYOUT_MODE, layout)
      state.layout = layout
    },
    TOGGLE_FIXED_HEADER: (state, fixed) => {
      localStorage.setItem(DEFAULT_FIXED_HEADER, fixed)
      state.fixedHeader = fixed
    },
    TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
      localStorage.setItem(DEFAULT_FIXED_SIDEMENU, fixed)
      state.fixSiderbar = fixed
    },
    TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
      localStorage.setItem(DEFAULT_FIXED_HEADER_HIDDEN, show)
      state.autoHideHeader = show
    },
    TOGGLE_CONTENT_WIDTH: (state, type) => {
      localStorage.setItem(DEFAULT_CONTENT_WIDTH_TYPE, type)
      state.contentWidth = type
    },
    TOGGLE_COLOR: (state, color) => {
      localStorage.setItem(DEFAULT_COLOR, color)
      state.color = color
    },
    TOGGLE_WEAK: (state, flag) => {
      localStorage.setItem(DEFAULT_COLOR_WEAK, flag)
      state.weak = flag
    },
    TOGGLE_MULTI_TAB: (state, bool) => {
      localStorage.setItem(DEFAULT_MULTI_TAB, bool)
      state.multiTab = bool
    }
  },
  actions: {
		setSidebar ({ commit }, type) {
      commit('SET_SIDEBAR_TYPE', type)
    },
    CloseSidebar ({ commit }) {
      commit('CLOSE_SIDEBAR')
    },
    ToggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleTheme ({ commit }, theme) {
      commit('TOGGLE_THEME', theme)
    },
    ToggleLayoutMode ({ commit }, mode) {
      commit('TOGGLE_LAYOUT_MODE', mode)
    },
    ToggleFixedHeader ({ commit }, fixedHeader) {
      if (!fixedHeader) {
        commit('TOGGLE_FIXED_HEADER_HIDDEN', false)
      }
      commit('TOGGLE_FIXED_HEADER', fixedHeader)
    },
    ToggleFixSiderbar ({ commit }, fixSiderbar) {
      commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar)
    },
    ToggleFixedHeaderHidden ({ commit }, show) {
      commit('TOGGLE_FIXED_HEADER_HIDDEN', show)
    },
    ToggleContentWidth ({ commit }, type) {
      commit('TOGGLE_CONTENT_WIDTH', type)
    },
    ToggleColor ({ commit }, color) {
      commit('TOGGLE_COLOR', color)
    },
    ToggleWeak ({ commit }, weakFlag) {
      commit('TOGGLE_WEAK', weakFlag)
    },
    ToggleMultiTab ({ commit }, bool) {
      commit('TOGGLE_MULTI_TAB', bool)
    }
  },
  getters: {
  }
}
export default app

