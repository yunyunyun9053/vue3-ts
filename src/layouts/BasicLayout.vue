<template>
  <div class="layouts">
		<div>layouts</div>
		<div>
			<router-view />
		</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
  }
})
export default class BasicLayout extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
