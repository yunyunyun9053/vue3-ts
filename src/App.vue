<template>
  <router-view/>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'

import { defineComponent } from "vue"
export default defineComponent({
	setup () {
		const store = useStore()
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
		return {
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
