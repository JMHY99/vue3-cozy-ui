<template>
  <div>
    <c-cascader
      v-model="value1"
      :options="options"
      size="large"
      placeholder="大尺寸"
      style="width: 300px; margin-bottom: 15px"
    />
    <br />
    <c-cascader
      v-model="value2"
      :options="options"
      placeholder="默认尺寸"
      style="width: 300px; margin-bottom: 15px"
    />
    <br />
    <c-cascader
      v-model="value3"
      :options="options"
      size="small"
      placeholder="小尺寸"
      style="width: 300px"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<string>()
const value2 = ref<string>()
const value3 = ref<string>()

const options = [
  {
    value: 'guide',
    label: '指南',
    children: [
      {
        value: 'disciplines',
        label: '规范',
        children: [
          {
            value: 'consistency',
            label: '一致性'
          },
          {
            value: 'feedback',
            label: '反馈'
          }
        ]
      },
      {
        value: 'navigation',
        label: '导航',
        children: [
          {
            value: 'side nav',
            label: '侧边导航'
          },
          {
            value: 'top nav',
            label: '顶部导航'
          }
        ]
      }
    ]
  },
  {
    value: 'component',
    label: '组件',
    children: [
      {
        value: 'basic',
        label: '基础组件',
        children: [
          {
            value: 'layout',
            label: '布局'
          },
          {
            value: 'color',
            label: '颜色'
          }
        ]
      },
      {
        value: 'form',
        label: '表单组件',
        children: [
          {
            value: 'input',
            label: '输入框'
          },
          {
            value: 'select',
            label: '选择器'
          }
        ]
      }
    ]
  }
]
</script> 