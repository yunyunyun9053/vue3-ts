<template>
	<a-sub-menu :key="menuInfo.path" v-bind="$attrs">
	<!-- <a-sub-menu :key="menuInfo.path" v-bind="$attrs" @titleClick="$emit('titleClick', $event)"> -->
		<template #title>
			<span>
				<CustomIcon v-if="menuInfo.meta && menuInfo.meta.icon" :component="menuInfo.meta.icon" />
				<!-- <PieChartOutlined /> -->
				<span>{{ menuInfo.meta.title }}</span>
			</span>
		</template>
		<template v-for="item in menuInfo.children" :key="item.path">
			<template v-if="item.children && item.children.length > 0 && !item.meta.hideChildrenInMenu">
				<sub-menu :menu-info="item" :key="item.path" />
			</template>
			<template v-else>
				<a-menu-item :key="item.path">
					<!-- <CustomIcon v-if="item.meta && item.meta.icon" :component="item.meta.icon" /> -->
					<component :is='item.meta.icon'></component>
					<!-- <PieChartOutlined /> -->
					<router-link :to="item.path">{{ item.meta.title }}</router-link>
				</a-menu-item>
			</template>
		</template>
	</a-sub-menu>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { getCurrentInstance, computed, defineComponent } from "vue"
import {
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons-vue'
import CustomIcon from './custom-icon'

export default defineComponent({
  name: 'SubMenu',
  components: {
    PieChartOutlined,
		MailOutlined,
		CustomIcon
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
  setup () {
	},
	created() {
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
