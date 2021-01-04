<template>
  <div>
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
          path: '/'
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
  methods: {
  }
})
</script>
<style lang="less" scoped>
  .login-form {
    width: 460px;
    margin: 200px auto;
    border: 1px solid #ccc;
    padding: 48px;
    box-shadow: 3px 3px 30px #ccc;
  }	
</style>