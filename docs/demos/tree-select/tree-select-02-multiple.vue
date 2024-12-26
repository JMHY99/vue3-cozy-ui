::: demo 多选：多选的树选择，可以选择多个节点。

```vue
<template>
  <div>
    <c-tree-select
      v-model="value"
      :tree-data="treeData"
      multiple
      placeholder="请选择多个选项"
      style="width: 300px"
      allow-clear
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string[]>([])

const treeData = [
  {
    title: '水果',
    key: 'fruits',
    children: [
      {
        title: '柑橘类',
        key: 'citrus',
        children: [
          { title: '橙子', key: 'orange' },
          { title: '柠檬', key: 'lemon' },
          { title: '柚子', key: 'grapefruit' }
        ]
      },
      {
        title: '浆果类',
        key: 'berries',
        children: [
          { title: '草莓', key: 'strawberry' },
          { title: '蓝莓', key: 'blueberry' },
          { title: '树莓', key: 'raspberry' }
        ]
      }
    ]
  },
  {
    title: '蔬菜',
    key: 'vegetables',
    children: [
      {
        title: '叶菜类',
        key: 'leafy',
        children: [
          { title: '生菜', key: 'lettuce' },
          { title: '菠菜', key: 'spinach' },
          { title: '白菜', key: 'cabbage' }
        ]
      },
      {
        title: '根茎类',
        key: 'root',
        children: [
          { title: '胡萝卜', key: 'carrot' },
          { title: '土豆', key: 'potato' },
          { title: '萝卜', key: 'radish' }
        ]
      }
    ]
  }
]
</script>
```

::: 