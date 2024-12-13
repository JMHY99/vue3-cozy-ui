<template>
  <div
    class="cozy-input-number"
    :class="{
      'cozy-input-number-disabled': disabled,
      [`cozy-input-number-${size}`]: size
    }"
  >
    <span
      class="cozy-input-number-decrease"
      role="button"
      :class="{ 'is-disabled': minDisabled }"
      @click="handleDecrease"
    >
      <i class="cozy-icon c-down-outlined"></i>
    </span>
    <span
      class="cozy-input-number-increase"
      role="button"
      :class="{ 'is-disabled': maxDisabled }"
      @click="handleIncrease"
    >
      <i class="cozy-icon c-up-outlined"></i>
    </span>
    <div class="cozy-input-number-wrapper">
      <input
        ref="input"
        :value="displayValue"
        :name="name"
        :disabled="disabled"
        :readonly="readonly"
        :max="max"
        :min="min"
        :step="step"
        class="cozy-input-number-input"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown.up.prevent="handleIncrease"
        @keydown.down.prevent="handleDecrease"
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

defineOptions({
  name: 'CInputNumber'
})

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: -Infinity
  },
  max: {
    type: Number,
    default: Infinity
  },
  step: {
    type: Number,
    default: 1
  },
  precision: {
    type: Number,
    validator: (val: number) => val >= 0,
    default: 0
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
  readonly: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  controls: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

const input = ref<HTMLInputElement>()
const userInput = ref<string | null>(null)

const displayValue = computed(() => {
  if (userInput.value !== null) {
    return userInput.value
  }
  let val = props.modelValue
  if (typeof val === 'number') {
    if (props.precision !== undefined) {
      val = val.toFixed(props.precision)
    }
  }
  return val
})

const minDisabled = computed(() =>
  props.modelValue <= props.min || props.disabled
)

const maxDisabled = computed(() =>
  props.modelValue >= props.max || props.disabled
)

const numPrecision = computed(() => {
  const stepPrecision = getPrecision(props.step)
  if (props.precision !== undefined) {
    return props.precision
  } else {
    return Math.max(getPrecision(props.modelValue), stepPrecision)
  }
})

function getPrecision(value: number) {
  if (value === undefined) return 0
  const valueString = value.toString()
  const dotPosition = valueString.indexOf('.')
  let precision = 0
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1
  }
  return precision
}

function toPrecision(num: number, precision: number) {
  if (precision === undefined) precision = numPrecision.value
  return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision))
}

function setCurrentValue(value: number) {
  let newVal = value
  if (props.precision !== undefined) {
    newVal = toPrecision(newVal, props.precision)
  }
  if (newVal >= props.max) newVal = props.max
  if (newVal <= props.min) newVal = props.min
  emit('update:modelValue', newVal)
  userInput.value = null
}

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  userInput.value = value
  const newVal = value === '' ? undefined : Number(value)
  if (value === '' || Number.isNaN(newVal)) {
    return
  }
  setCurrentValue(newVal)
}

function handleChange(event: Event) {
  const value = (event.target as HTMLInputElement).value
  const newVal = value === '' ? undefined : Number(value)
  if (value === '' || Number.isNaN(newVal)) {
    userInput.value = null
    return
  }
  setCurrentValue(newVal)
  emit('change', newVal)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
  userInput.value = null
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleIncrease() {
  if (props.readonly || maxDisabled.value) return
  const value = props.modelValue || 0
  const newVal = toPrecision(value + props.step, numPrecision.value)
  setCurrentValue(newVal)
}

function handleDecrease() {
  if (props.readonly || minDisabled.value) return
  const value = props.modelValue || 0
  const newVal = toPrecision(value - props.step, numPrecision.value)
  setCurrentValue(newVal)
}

defineExpose({
  focus: () => input.value?.focus(),
  blur: () => input.value?.blur()
})
</script>
