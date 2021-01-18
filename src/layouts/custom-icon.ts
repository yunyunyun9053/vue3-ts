
import { getCurrentInstance, computed, defineComponent, h } from "vue"

// import { Menu } from 'ant-design-vue'
import {
  HeartTwoTone,
} from '@ant-design/icons-vue';
export default  defineComponent({
  name: 'CustomIcon',
  props: {
		component: {
      type: String,
      default: ''
		}
  },
	data() {
    return {
    }
  },
  setup () {
	},
	render() {
		const iconComponent = require('@ant-design/icons-vue')[this.component]
		// return h(HeartTwoTone, {
		// 	twoToneColor: 'rgb(0,0,0)'
		// }, 'test ')
		return h(iconComponent)
  },
})
