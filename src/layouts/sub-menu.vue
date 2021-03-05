<template>
	<a-sub-menu :key="menuInfo.path" v-bind="$attrs">
	<!-- <a-sub-menu :key="menuInfo.path" v-bind="$attrs" @titleClick="$emit('titleClick', $event)"> -->
		<template #title>
			<span>
				<component :is='menuInfo.meta.icon'></component>
				<span>{{ menuInfo.meta.title }}</span>
			</span>
		</template>
		<template v-for="item in menuInfo.children" :key="item.path">
			<template v-if="item.children && item.children.length > 0 && !item.meta.hideChildrenInMenu">
				<sub-menu :menu-info="item" :key="item.path" />
			</template>
			<template v-else>
				<a-menu-item :key="item.path">
					<component :is='item.meta.icon'></component>
					<router-link :to="item.path">{{ item.meta.title }}</router-link>
				</a-menu-item>
			</template>
		</template>
	</a-sub-menu>
</template>

<script lang="ts">

import { getCurrentInstance, computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SubMenu',
  components: {
	},
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
	data() {
    return {}
  },
	methods: {
		// titleClick (e: any) {
		// 	console.log('titleClick', e)
		// }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
