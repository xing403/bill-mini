<script lang="ts" setup>
import { reactive, ref } from 'vue'
import TnForm from '@tuniao/tnui-vue3-uniapp/components/form/src/form.vue'
import TnFormItem from '@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'

import type { FormRules, TnFormInstance } from '@tuniao/tnui-vue3-uniapp'
import { login } from '@/api/modules/user'
const formRef = ref<TnFormInstance>()

// 表单数据
const form = reactive({
  username: '',
  password: '',
})

// 规则
const formRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
    {
      pattern: /^[\w-]{4,16}$/,
      message: '请输入4-16位英文、数字、下划线、横线',
      trigger: ['change', 'blur'],
    },
  ],
}

/* 提交表单 */
const submitForm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      login(form).then((res: any) => {
        uni.setStorageSync('token', res.data)
        uni.navigateTo({ url: '/pages/index/index' })
      })
    }
  })
}
</script>

<template>
  <view class="content">
    <TnForm ref="formRef" label-position="top" :model="form" :rules="formRules">
      <TnFormItem label="用户名" prop="username">
        <TnInput v-model="form.username" />
      </TnFormItem>
      <TnFormItem label="密码" prop="password">
        <TnInput type="password" v-model="form.password" />
      </TnFormItem>
    </TnForm>
    <view class="tn-w-full tn-flex-center">
      <TnButton size="lg" class="tn-w-full" @click="submitForm">登录</TnButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.content {
  padding-top: 150px;
}
</style>
