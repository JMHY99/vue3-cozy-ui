<template>
  <div
    class="cozy-select-option"
    :class="{
      'cozy-select-option-disabled': disabled,
      'cozy-select-option-selected': isSelected,
      'cozy-select-option-active': isActive
    }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'COption'
})

const props = withDefaults(defineProps<{
  value: string | number | boolean
  label?: string
  disabled?: boolean
  group?: string
}>(), {
  disabled: false
})

const select = inject('select', {
  value: computed(() => ''),
  multiple: computed(() => false),
  selectedValues: computed(() => []),
  activeValue: computed(() => ''),
  handleOptionClick: (value: string | number | boolean) => {},
  handleOptionMouseEnter: (value: string | number | boolean) => {},
  registerOption: (option: any) => {},
  unregisterOption: (option: any) => {}
})

const isSelected = computed(() => {
  if (select.multiple.value) {
    return select.selectedValues.value.includes(props.value)
  }
  return select.value.value === props.value
})

const isActive = computed(() => {
  return select.activeValue.value === props.value
})

const classes = computed(() => {
  return {
    'cozy-select-option': true,
    'cozy-select-option-selected': isSelected.value,
    'cozy-select-option-active': isActive.value,
    'cozy-select-option-disabled': props.disabled
  }
})

const handleClick = () => {
  if (props.disabled) return
  select.handleOptionClick(props.value)
}

const handleMouseEnter = () => {
  if (props.disabled) return
  select.handleOptionMouseEnter(props.value)
}

onMounted(() => {
  select.registerOption({
    value: props.value,
    label: props.label || String(props.value),
    disabled: props.disabled,
    group: props.group
  })
})

onUnmounted(() => {
  select.unregisterOption({
    value: props.value,
    label: props.label || String(props.value),
    disabled: props.disabled,
    group: props.group
  })
})
</script>
