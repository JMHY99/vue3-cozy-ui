<template>
  <div>
    <c-cascader
      v-model="value"
      :options="options"
      placeholder="请选择"
      allow-clear
      style="width: 300px"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(['zhejiang', 'hangzhou', 'xihu'])

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          {
            value: 'xihu',
            label: '西湖'
          },
          {
            value: 'xiasha',
            label: '下沙'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          {
            value: 'xuanwu',
            label: '玄武'
          }
        ]
      }
    ]
  }
]
</script> 