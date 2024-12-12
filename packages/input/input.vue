<template>
  <div class="cozy-input" :class="inputClass">
    <!-- 前缀图标 -->
    <span v-if="prefixIcon" class="cozy-input-prefix">
      <i :class="prefixIcon"></i>
    </span>

    <!-- 输入框 -->
    <input
      ref="inputRef"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="cozy-input-inner"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    >

    <!-- 后缀图标 -->
    <span v-if="suffixIcon || clearable" class="cozy-input-suffix">
      <i
        v-if="clearable && modelValue"
        class="cozy-input-clear"
        @click="handleClear"
      ></i>
      <i v-else-if="suffixIcon" :class="suffixIcon"></i>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

defineOptions({
  name: 'CInput'
})

// 定义组件属性
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: String,
    default: ''
  },
  suffixIcon: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'default'
  }
})

// 定义事件
const emit = defineEmits([
  'update:modelValue',
  'input',
  'change',
  'focus',
  'blur',
  'clear'
])

// input ref
const inputRef = ref<HTMLInputElement>()

// 计算 class
const inputClass = computed(() => ({
  'cozy-input-disabled': props.disabled,
  [`cozy-input-${props.size}`]: props.size,
  'cozy-input-with-prefix': props.prefixIcon,
  'cozy-input-with-suffix': props.suffixIcon || props.clearable
}))

// 处理输入
const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', event)
}

// 处理聚焦
const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// 处理失焦
const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// 处理变化
const handleChange = (event: Event) => {
  emit('change', event)
}

// 处理清空
const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>
