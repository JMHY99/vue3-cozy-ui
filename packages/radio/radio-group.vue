<template>
  <div
    class="cozy-radio-group"
    :class="[
      size ? `cozy-radio-group-${size}` : '',
      `cozy-radio-group-${buttonStyle}`
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, computed } from 'vue'
import { radioGroupKey } from './types'

// 定义组件名称
defineOptions({
  name: 'CRadioGroup'
})

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  size: {
    type: String,
    values: ['large', 'default', 'small'],
    default: 'default'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  buttonStyle: {
    type: String,
    values: ['outline', 'solid'],
    default: 'outline'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const radioGroupValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

provide(radioGroupKey, {
  name: 'CRadioGroup',
  modelValue: radioGroupValue,
  disabled: computed(() => props.disabled),
  size: computed(() => props.size)
})
</script>
