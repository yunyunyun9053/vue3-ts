<template>
  <a-config-provider :locale="locale">
    <router-view/>
  </a-config-provider>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import bootstrap from '@/core/bootstrap'

import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
// import moment from 'moment'
// import 'moment/dist/locale/zh-cn'
import { defineComponent } from 'vue'

// moment.locale('zh-cn')

export default defineComponent({
  data() {
    return {
      locale: zhCN,
      enUS,
      zhCN
    }
  },
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
  },
  created() {
    bootstrap()
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
