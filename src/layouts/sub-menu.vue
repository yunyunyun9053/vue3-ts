<template>
	<a-sub-menu :key="menuInfo.path" v-bind="$attrs" @titleClick="$emit('titleClick', $event)">
		<template #title>
			<span>
				<!-- <MailOutlined /> -->
				<span>{{ menuInfo.meta.title }}</span>
			</span>
		</template>
		<template v-for="item in menuInfo.children" :key="item.path">
			<template v-if="!item.children">
				<a-menu-item :key="item.path">
					<!-- <PieChartOutlined /> -->
					<!-- <span>{{ item.meta.title }}</span> -->
					<router-link :to="item.path">{{ item.meta.title }}</router-link>
				</a-menu-item>
			</template>
			<template v-else>
				<sub-menu :menu-info="item" :key="item.path" />
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

export default defineComponent({
  name: 'SubMenu',
  components: {
    PieChartOutlined,
    MailOutlined,
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
		titleClick (e: any) {
			console.log('titleClick', e)
		}
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
