<script setup lang="ts">
import { ref } from 'vue'
import userApi from '@/api/modules/user'
import useUserStore from '@/store/modules/user'
import useScanCode from '@/utils/scanCode'
import TnAvatar from '@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import CustomList from '@/components/List/index.vue'
import TnModal from '@tuniao/tnui-vue3-uniapp/components/modal/src/modal.vue'
import type { TnModalInstance } from '@tuniao/tnui-vue3-uniapp'
const userStore = useUserStore()

const userInfo = ref(userStore.information)
const scanCode = useScanCode()

const userMenu = ref([{
  title: '退出登录',
  index: 'logout',
}])

const handleMenuClick = (index: string | number, menuItem: any) => {
  console.log(index, menuItem)
}

const modalRef = ref<TnModalInstance>()
const qrcode = ref('')

const scanCodeModalRef = ref<TnModalInstance>()
const handleOpenScanCodeModel = () => {
  scanCodeModalRef.value?.showModal({
    title: '确认登录',
    content: '是否确认授权登录',
    confirmText: '确认',
    cancelText: '取消',
    showCancel: true,
    cancel: () => {
      userApi.changeQRCodeFailed(qrcode.value)
      console.log('点击了取消按钮')
    },
    confirm: () => {
      userApi.changeQRCodeSuccess(qrcode.value, userStore.token)
      console.log('点击了确认按钮')
    },
  })
}
const handleScanCode = () => {
  scanCode.scanCode().then((res: any) => {
    qrcode.value = res.result
    userApi.changeQRCodeScanned(qrcode.value).then(() => {
      handleOpenScanCodeModel()
    })
  }).catch(err => console.log(err))
}

</script>

<template>
  <view>
    <view class="user-info">
      <TnAvatar size="50px" type="primary">{{ userInfo.username[0] }}</TnAvatar>
      <view class="user-name">
        <view class="tn-text-2xl">{{ userInfo.username }} </view>
        <view>{{ userInfo.createTime }}</view>
      </view>

      <TnIcon name="scan" size="50rpx" @click="handleScanCode" />
    </view>

    <view class="user-menu">
      <CustomList v-model:list="userMenu" @click="handleMenuClick" />
    </view>

    <TnModal ref="scanCodeModalRef" />
  </view>
</template>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-radius: 15rpx;
  background-color: var(--tn-color-info-light-8);
  margin: 10rpx 0;
  gap: 30rpx;

  .user-name {
    flex: 1;
    margin-left: 20rpx;
  }
}
</style>
