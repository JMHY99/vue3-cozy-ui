<template>
  <div>
    <c-cascader
      v-model="value"
      :options="options"
      placeholder="请选择"
      style="width: 300px"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string>()

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
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    disabled: true,
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
  },
  {
    value: 'fujian',
    label: '福建',
    children: [
      {
        value: 'fuzhou',
        label: '福州',
        disabled: true,
        children: [
          {
            value: 'gulou',
            label: '鼓楼'
          }
        ]
      }
    ]
  }
]
</script> 