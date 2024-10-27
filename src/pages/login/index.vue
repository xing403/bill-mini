<script lang="ts" setup>
import { reactive, ref } from 'vue'
import TnForm from '@tuniao/tnui-vue3-uniapp/components/form/src/form.vue'
import TnFormItem from '@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'

import type { FormRules, TnFormInstance } from '@tuniao/tnui-vue3-uniapp'

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
      uni.showToast({
        title: '提交成功',
      })
    } else {
      uni.showToast({
        title: '表单校验失败',
        icon: 'none',
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
      <TnButton size="lg" @click="submitForm"> 提交 </TnButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
</style>
