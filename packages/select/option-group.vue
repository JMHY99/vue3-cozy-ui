<template>
  <div class="cozy-select-option-group">
    <div class="cozy-select-option-group-label">{{ label }}</div>
    <div class="cozy-select-option-group-list">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'

defineOptions({
  name: 'COptionGroup'
})

const props = defineProps<{
  label?: string
}>()

provide('optionGroup', {
  label: props.label
})
</script>
