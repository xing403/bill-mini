<script setup lang="ts">
import { ref, computed } from 'vue'

import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
import TnTabbar from '@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar.vue'
import TnTabbarItem from '@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar-item.vue'
import my from './my.vue'
import home from './home.vue'

// 导航栏数据
const tabbarData = ref([
  {
    name: '首页',
    key: 'home',
    icon: 'home',
    activeIcon: 'home-fill',
  },
  {
    name: '我的',
    key: 'my',
    icon: 'my-circle',
    activeIcon: 'my-circle-fill',
  },
])
const currentTabbarIndex = ref(1)
const currentTabbarKey = computed(() => tabbarData.value[currentTabbarIndex.value].key)


</script>

<template>
  <view class="layout">
    <TnNavbar height="35px" :safe-area-inset-right="false" backIcon="" homeIcon="">Bill-MINI</TnNavbar>
    <view class="content">

      <home v-if="currentTabbarKey === 'home'" />
      <my v-if="currentTabbarKey === 'my'" />
    </view>
    <TnTabbar v-model="currentTabbarIndex" fixed>
      <TnTabbarItem v-for="item in tabbarData" :key="item.key" :icon="item.icon" :active-icon="item.activeIcon"
        :text="item.name" />
    </TnTabbar>
  </view>
</template>


<style>
</style>
