<template>
  <div>
    <c-cascader
      v-model="value"
      :options="options"
      :load-data="loadData"
      placeholder="请选择"
      style="width: 300px"
      change-on-select
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { CascaderOption } from '../../../packages/cascader/cascader.vue'

const value = ref<string>()

interface Option extends CascaderOption {
  isLeaf?: boolean;
}

const options = ref<Option[]>([
  {
    value: 'zhejiang',
    label: '浙江',
    isLeaf: false
  },
  {
    value: 'jiangsu',
    label: '江苏',
    isLeaf: false
  }
])

const loadData = (selectedOptions: Option[]) => {
  const targetOption = selectedOptions[selectedOptions.length - 1]
  targetOption.loading = true

  // 模拟异步请求
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      targetOption.loading = false
      if (targetOption.value === 'zhejiang') {
        targetOption.children = [
          {
            label: '杭州',
            value: 'hangzhou',
            isLeaf: false
          },
          {
            label: '宁波',
            value: 'ningbo',
            isLeaf: false
          }
        ]
      } else if (targetOption.value === 'jiangsu') {
        targetOption.children = [
          {
            label: '南京',
            value: 'nanjing',
            isLeaf: false
          },
          {
            label: '苏州',
            value: 'suzhou',
            isLeaf: false
          }
        ]
      } else if (targetOption.value === 'hangzhou') {
        targetOption.children = [
          {
            label: '西湖区',
            value: 'xihu',
            isLeaf: true
          }
        ]
      } else if (targetOption.value === 'nanjing') {
        targetOption.children = [
          {
            label: '中华门',
            value: 'zhonghuamen',
            isLeaf: true
          }
        ]
      }
      resolve()
    }, 1000)
  })
}
</script> 