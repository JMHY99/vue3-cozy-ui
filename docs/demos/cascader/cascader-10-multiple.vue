<template>
  <div>
    <c-cascader
      v-model="value"
      :options="options"
      :max-tag-count="2"
      multiple
      placeholder="请选择"
      style="width: 300px"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string[]>([])

const options = [
  {
    value: 'food',
    label: '食物',
    children: [
      {
        value: 'fruits',
        label: '水果',
        children: [
          {
            value: 'apple',
            label: '苹果'
          },
          {
            value: 'banana',
            label: '香蕉'
          },
          {
            value: 'orange',
            label: '橙子'
          }
        ]
      },
      {
        value: 'vegetables',
        label: '蔬菜',
        children: [
          {
            value: 'tomato',
            label: '番茄'
          },
          {
            value: 'potato',
            label: '土豆'
          },
          {
            value: 'carrot',
            label: '胡萝卜'
          }
        ]
      }
    ]
  },
  {
    value: 'electronics',
    label: '电子产品',
    children: [
      {
        value: 'phones',
        label: '手机',
        children: [
          {
            value: 'iphone',
            label: 'iPhone'
          },
          {
            value: 'huawei',
            label: '华为'
          },
          {
            value: 'xiaomi',
            label: '小米'
          }
        ]
      },
      {
        value: 'computers',
        label: '电脑',
        children: [
          {
            value: 'macbook',
            label: 'MacBook'
          },
          {
            value: 'surface',
            label: 'Surface'
          },
          {
            value: 'thinkpad',
            label: 'ThinkPad'
          }
        ]
      }
    ]
  }
]
</script> 