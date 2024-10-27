<script setup lang="ts">
import listItem from '@tuniao/tnui-vue3-uniapp/components/list/src/list-item.vue';

import { defineEmits } from 'vue'
const emit = defineEmits(['click'])
interface ListProps {
  list: Array<{
    title: string
    index: number | string
    type?: string
    leftIcon?: string
    rightIcon?: string
    desc?: string
    disabled?: boolean
  }>
  [key: string]: any
}
const props = defineProps<ListProps>()

const handleClick = (index: number | string, listItem: ListProps) => {
  emit('click', index, listItem)
}
</script>

<template>
  <view class="custom-list">
    <listItem v-for="(item, index) in props.list" :key="item.index" :right-icon="item.rightIcon"
      @click="handleClick(index, item)">
      {{ item.title }}
    </listItem>
  </view>
</template>
<style lang="scss" scoped>
.custom-list {
  margin: 20rpx 10rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;

}
</style>
