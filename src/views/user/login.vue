<template>
  <div class="user">
		<div class="user-form">
			<a-form
				name="custom-validation"
				ref="formRef"
				:model="ruleForm"
				:rules="rules"
				v-bind="{ labelCol: { span: 6 }, wrapperCol: { span: 18 } }"
				@finish="handleFinish"
				@finishFailed="handleFinishFailed"
				class="login-form"
			>
				<h1>vue3 +ts</h1>
				<a-form-item has-feedback label="Name" name="name">
					<a-input v-model:value="ruleForm.name" size="large" autocomplete="off" />
				</a-form-item>
				<a-form-item has-feedback label="Password" name="password">
					<a-input v-model:value="ruleForm.password" type="password" size="large" autocomplete="off" />
				</a-form-item>
				<a-form-item :wrapper-col="{ span: 24 }">
					<a-button type="primary" html-type="submit" size="large" style="width: 100%;">
						登录
					</a-button>
				</a-form-item>
			</a-form>
		</div>
  </div>
</template>

<script lang="ts">

import { useRouter } from 'vue-router'
import { defineComponent, reactive, UnwrapRef, ref } from 'vue'
import { mapActions } from 'vuex'
import { useStore } from '@/store'
import { User } from '@/utils/user'

export default defineComponent({
  name: 'Login',
  setup (props, context) {
		console.log('props: ', props, 'context', context)
		const formRef = ref()
		const ruleForm: UnwrapRef<User> = reactive({ name: 'input name', password: '' })
		const rules = {
      name: [
        { required: true, message: 'Please input name', trigger: 'blur' },
        { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'blur' }
			],
			password: [
        { required: true, message: 'Please input password', trigger: 'blur' }
			]
		}
		const store = useStore()
		const router = useRouter()
    const handleFinish = () => {
      store.dispatch('Login', { ...ruleForm }).then(() => {
        router.push({ path: '/home' })
      })
		}
		const handleFinishFailed = (errors: any) => {
			console.log(errors)
		}
    return {
			formRef,
			ruleForm,
			rules,
			handleFinish,
			handleFinishFailed
    }
	},
	...mapActions(['Login']),
  data() {
    return {
    }
	},
  methods: {
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
