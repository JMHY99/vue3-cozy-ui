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
import { computed, inject, ref, onMounted, onBeforeUnmount, useSlots } from 'vue'

defineOptions({
  name: 'COption'
})

const props = withDefaults(defineProps<{
  value?: string | number | boolean
  label?: string
  disabled?: boolean
}>(), {
  value: '',
  label: '',
  disabled: false
})

interface SelectContext {
  value: any
  multiple: any
  selectedValues: any
  activeValue: any
  handleOptionClick: (value: string | number | boolean) => void
  handleOptionMouseEnter: (value: string | number | boolean) => void
  registerOption?: (option: OptionType) => void
  unregisterOption?: (option: OptionType) => void
}

interface OptionGroupContext {
  label?: string
}

interface OptionType {
  value: string | number | boolean
  label: string
  disabled: boolean
  group?: string
}

const slots = useSlots()

// 注入select上下文
const select = inject<SelectContext>('select', {
  value: ref(''),
  multiple: ref(false),
  selectedValues: ref<(string | number | boolean)[]>([]),
  activeValue: ref(''),
  handleOptionClick: (value: string | number | boolean) => {},
  handleOptionMouseEnter: (value: string | number | boolean) => {}
})

// 计算是否被选中
const isSelected = computed(() => {
  if (select.multiple.value) {
    return select.selectedValues.value.includes(props.value)
  }
  return select.value.value === props.value
})

// 计算是否激活
const isActive = computed(() => select.activeValue.value === props.value)

// 点击选项
const handleClick = () => {
  if (props.disabled) return
  select.handleOptionClick(props.value)
}

// 鼠标移入选项
const handleMouseEnter = () => {
  if (props.disabled) return
  select.handleOptionMouseEnter(props.value)
}

// 注册选项到select
const optionGroup = inject<OptionGroupContext>('optionGroup', null)
const option: OptionType = {
  value: props.value,
  label: props.label || (slots.default ? slots.default()[0].children : String(props.value)),
  disabled: props.disabled,
  group: optionGroup?.label
}

onMounted(() => {
  select.registerOption?.(option)
})

onBeforeUnmount(() => {
  select.unregisterOption?.(option)
})
</script>
