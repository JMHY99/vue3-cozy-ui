<template>
  <div>
    <c-space direction="vertical">
      <c-cascader
        v-model="value1"
        :options="options"
        size="large"
        placeholder="大尺寸"
        style="width: 300px"
      />
      <c-cascader
        v-model="value2"
        :options="options"
        placeholder="默认尺寸"
        style="width: 300px"
      />
      <c-cascader
        v-model="value3"
        :options="options"
        size="small"
        placeholder="小尺寸"
        style="width: 300px"
      />
    </c-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<string>()
const value2 = ref<string>()
const value3 = ref<string>()

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