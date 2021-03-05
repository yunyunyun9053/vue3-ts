<template>
	<a-config-provider :locale="lang === 'en' ? enUS : zhCN">
    <router-view/>
  </a-config-provider>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from '@/store'
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import bootstrap from '@/core/bootstrap'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

export default defineComponent({
  data() {
    return {
    }
  },
  setup () {
		const store = useStore()
		const lang = computed(() => {
			return store.getters.lang
		})
    onMounted(() => {
			dayjs.locale(lang.value)
			deviceEnquire((deviceType: string) => {
				switch (deviceType) {
					case DEVICE_TYPE.DESKTOP:
						store.commit('TOGGLE_DEVICE', 'desktop')
						store.dispatch('setSidebar', true)
						break
					case DEVICE_TYPE.TABLET:
						store.commit('TOGGLE_DEVICE', 'tablet')
						store.dispatch('setSidebar', false)
						break
					case DEVICE_TYPE.MOBILE:
					default:
						store.commit('TOGGLE_DEVICE', 'mobile')
						store.dispatch('setSidebar', true)
						break
				}
			})
			bootstrap()
		})
    return {
			lang,
      enUS,
      zhCN
    }
  }
})
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

</style>
