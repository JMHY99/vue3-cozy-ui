<template>
  <div>
    <c-cascader
      v-model="value"
      :options="options"
      :field-names="fieldNames"
      placeholder="请选择"
      style="width: 300px"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string>()

const fieldNames = {
  label: 'name',
  value: 'code',
  children: 'items'
}

const options = [
  {
    code: 'fruits',
    name: '水果',
    items: [
      {
        code: 'citrus',
        name: '柑橘类',
        items: [
          {
            code: 'orange',
            name: '橙子'
          },
          {
            code: 'lemon',
            name: '柠檬'
          }
        ]
      },
      {
        code: 'berries',
        name: '浆果类',
        items: [
          {
            code: 'strawberry',
            name: '草莓'
          },
          {
            code: 'blueberry',
            name: '蓝莓'
          }
        ]
      }
    ]
  },
  {
    code: 'vegetables',
    name: '蔬菜',
    items: [
      {
        code: 'leafy',
        name: '叶菜类',
        items: [
          {
            code: 'spinach',
            name: '菠菜'
          },
          {
            code: 'lettuce',
            name: '生菜'
          }
        ]
      }
    ]
  }
]
</script> 