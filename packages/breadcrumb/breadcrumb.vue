<template>
  <div class="cozy-breadcrumb">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'

// 定义组件名称
defineOptions({
  name: "CBreadcrumb"
});

const props = withDefaults(defineProps<{
  separator?: string;
  separatorIcon?: string;
}>(), {
  separator: '/',
  separatorIcon: ''
})

const items = ref<any[]>([])

const addItem = (item: any) => {
  items.value.push(item)
}

const removeItem = (item: any) => {
  const index = items.value.indexOf(item)
  if (index !== -1) {
    items.value.splice(index, 1)
  }
}

const isLastItem = (item: any) => {
  const index = items.value.indexOf(item)
  return index === items.value.length - 1
}

provide('breadcrumbSeparator', props.separator)
provide('breadcrumbSeparatorIcon', props.separatorIcon)
provide('breadcrumbAddItem', addItem)
provide('breadcrumbRemoveItem', removeItem)
provide('breadcrumbIsLastItem', isLastItem)

// 监听分隔符的变化
watch(() => props.separator, (newVal) => {
  provide('breadcrumbSeparator', newVal)
})

watch(() => props.separatorIcon, (newVal) => {
  provide('breadcrumbSeparatorIcon', newVal)
})
</script>
