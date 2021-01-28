<template>
  <div class="user">
		<div class="user-form">
			<a-form
				name="custom-validation"
				ref="ruleForm"
				:model="ruleForm"
				:rules="rules"
				v-bind="{ labelCol: { span: 6 }, wrapperCol: { span: 18 } }"
				@finish="handleFinish"
				@finishFailed="handleFinishFailed"
				class="login-form"
			>
				<h1>vue3 +ts</h1>
				<a-form-item required has-feedback label="Name" name="name">
					<a-input v-model:value="ruleForm.name" size="large" autocomplete="off" />
				</a-form-item>
				<a-form-item required has-feedback label="Password" name="password">
					<a-input v-model:value="ruleForm.password" type="password" size="large" autocomplete="off" />
				</a-form-item>
				<a-form-item :wrapper-col="{ span: 24 }">
					<a-button type="primary" html-type="submit" size="large" style="width: 100%;">
						登录
					</a-button>
				</a-form-item>
			</a-form>
		</div>
		<canvas id="canvas">
			抱歉，您的浏览器不支持canvas元素
		</canvas>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component'
import { getCurrentInstance, computed, defineComponent } from "vue"
import { useStore } from '@/store'
import { User } from '@/utils/user'

export default defineComponent({
  name: 'Login',
  setup (props, context) {
    const current = getCurrentInstance() // 获取当前组件实例
    console.log(current)
    const store = useStore()
    console.log('store: ', store)
    const handleFinish = () => {
      const loginForm = (current as any).data.ruleForm
      console.log('form: ', loginForm)
      store.dispatch('Login', loginForm).then(() => {
        // console.log('save Login')
        (current as any).ctx.$router.push({
          path: '/home'
        })
      })
    }
    const handleFinishFailed = (errors: any) => {
      console.log(errors)
    }
    return {
      handleFinish,
      handleFinishFailed
    }
  },
  data() {
    return {
      ruleForm: {
        name: 'input name',
        password: ''
      } as User,
      rules: {}
    }
	},
	created() {
		this.$nextTick(() => {
			// this.initCanvas()
		})
	},
  methods: {
		initCanvas () {
			const canvas = document.createElement('canvas') as any
			const postctx = (document.getElementById('canvas') as any).getContext('2d')
			const ctx = canvas.getContext('2d')
			const ctxCanvas = ctx.canvas
			console.log('ctxCanvas:　', canvas.height, canvas.width, ctxCanvas.width)
			ctx.fillStyle = 'hsl(200deg, 100%, 2%)'
			ctx.fillRect(0, 0, canvas.width, canvas.height)
			ctx.save()
			ctx.translate(canvas.width, canvas.height) // 重新开始绘制
			ctx.beginPath() // 重新开始一条路径
			ctx.restore() // 返回之前保存过的路径状态和属性

			postctx.drawImage(ctxCanvas, 0, 0)
		}
  }
})
</script>
<style lang="less" scoped>
.user{
	height: 100%;
	width: 100%;
	position: relative;
	.user-form {
		padding-top: 200px;
	}
  .login-form {
		width: 460px;
    margin: auto;
    border: 1px solid #ccc;
    padding: 48px;
		box-shadow: 3px 3px 30px #ccc;
		background-color: #fff;
	}
	#canvas {
		position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
	}
}
</style>