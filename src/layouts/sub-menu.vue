<template>
	<a-sub-menu :key="menuInfo.path" v-bind="$attrs">
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
import {
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons-vue'

export default {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
