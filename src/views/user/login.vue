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
import { mapActions } from 'vuex'
import { getCurrentInstance, computed, defineComponent } from "vue"
import { useStore } from '@/store'
import { User } from '@/utils/user'

export default defineComponent({
  name: 'Login',
  setup (props, context) {
    // const current = getCurrentInstance() // 获取当前组件实例
    // const store = useStore()
    // const handleFinish = () => {
    //   const loginForm = (current as any).data.ruleForm
    //   store.dispatch('Login', loginForm).then(() => {
    //     // console.log('save Login')
    //     (current as any).ctx.$router.push({
    //       path: '/home'
    //     })
    //   })
    // }
    // const handleFinishFailed = (errors: any) => {
    //   console.log(errors)
    // }
    // return {
    //   // handleFinish,
    //   handleFinishFailed
    // }
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
		})
	},
  methods: {
		...mapActions(['Login']),
		handleFinish () {
      const loginForm = this.ruleForm
      this.Login(loginForm).then(() => {
        // console.log('save Login')
        this.$router.push({
          path: '/home'
        })
      })
		},
		handleFinishFailed (errors: any) {
      console.log(errors)
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