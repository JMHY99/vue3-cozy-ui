<template>
  <label
    class="cozy-radio-button"
    :class="[
      size ? `cozy-radio-button-${size}` : '',
      {
        'cozy-radio-button-checked': isChecked,
        'cozy-radio-button-disabled': isDisabled
      }
    ]"
  >
    <input
      type="radio"
      :value="label"
      :name="name"
      :disabled="isDisabled"
      :checked="isChecked"
      class="cozy-radio-button-original"
      @change="handleChange"
    >
    <span class="cozy-radio-button-inner">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { radioGroupKey } from './types'

defineOptions({
  name: 'CRadioButton'
})

const props = defineProps({
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  }
})

const radioGroup = inject(radioGroupKey, null)

const isChecked = computed(() => {
  return radioGroup
    ? radioGroup.modelValue.value === props.label
    : false
})

const size = computed(() => radioGroup?.size.value)

const isDisabled = computed(() => {
  return radioGroup
    ? radioGroup.disabled.value || props.disabled
    : props.disabled
})

const handleChange = (event: Event) => {
  if (isDisabled.value) return
  if (radioGroup) {
    radioGroup.modelValue.value = props.label
  }
}
</script>
