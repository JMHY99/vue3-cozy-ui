<template>
  <div class="demo-size">
    <c-tree-select
      v-model="value1"
      :tree-data="treeData"
      size="large"
      placeholder="大尺寸"
      style="width: 300px; margin-bottom: 16px"
    />
    <br />
    <c-tree-select
      v-model="value2"
      :tree-data="treeData"
      placeholder="默认尺寸"
      style="width: 300px; margin-bottom: 16px"
    />
    <br />
    <c-tree-select
      v-model="value3"
      :tree-data="treeData"
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

const treeData = [
  {
    title: '选项1',
    key: '1',
    children: [
      {
        title: '选项1-1',
        key: '1-1',
        children: [
          { title: '选项1-1-1', key: '1-1-1' },
          { title: '选项1-1-2', key: '1-1-2' }
        ]
      },
      { title: '选项1-2', key: '1-2' }
    ]
  },
  {
    title: '选项2',
    key: '2',
    children: [
      { title: '选项2-1', key: '2-1' },
      { title: '选项2-2', key: '2-2' }
    ]
  }
]
</script>

<style scoped>
.demo-size {
  width: 100%;
}
</style> 