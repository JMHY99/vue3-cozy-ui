<template>
  <button
    :class="[
      'cozy-switch',
      checked ? 'cozy-switch-checked' : '',
      disabled ? 'cozy-switch-disabled' : '',
      loading ? 'cozy-switch-loading' : '',
      `cozy-switch-${size}`
    ]"
    type="button"
    role="switch"
    :aria-checked="checked"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <div class="cozy-switch-handle">
      <i v-if="loading" class="cozy-icon c-refresh-outlined"></i>
    </div>
    <span v-if="checkedText || unCheckedText" class="cozy-switch-inner">
      {{ checked ? checkedText : unCheckedText }}
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
  name: 'CSwitch'
})

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    values: ['default', 'small'],
    default: 'default'
  },
  checkedText: {
    type: String,
    default: ''
  },
  unCheckedText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const checked = computed(() => props.modelValue)

const handleClick = () => {
  if (props.disabled || props.loading) return
  const newValue = !checked.value
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>
