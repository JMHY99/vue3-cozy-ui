<template>
  <div
    class="cozy-select"
    :class="[
      {
        'cozy-select-disabled': disabled,
        'cozy-select-open': dropdownVisible,
        'cozy-select-multiple': multiple,
        'cozy-select-single': !multiple
      },
      size ? `cozy-select-${size}` : ''
    ]"
    @click="handleClick"
    @blur.capture="handleBlur"
    tabindex="0"
  >
    <!-- 选择框 -->
    <div class="cozy-select-selector" ref="selectorRef">
      <!-- 单选 -->
      <template v-if="!multiple">
        <span v-if="!modelValue && !searchValue" class="cozy-select-selection-placeholder">{{ placeholder }}</span>
        <span v-else class="cozy-select-selection-single">
          {{ getOptionLabel(modelValue as string | number | boolean) }}
        </span>
        <input
          v-if="showSearch"
          ref="inputRef"
          v-model="searchValue"
          class="cozy-select-selection-search-input"
          :placeholder="searchValue || modelValue ? '' : placeholder"
          @focus="handleSearchFocus"
          @blur="handleSearchBlur"
          @input="handleSearch"
        >
      </template>

      <!-- 多选 -->
      <template v-else>
        <template v-if="selectedValues.length || searchValue">
          <span
            v-for="value in displayTags"
            :key="value"
            class="cozy-select-selection-item"
          >
            <span class="cozy-select-selection-item-content">
              {{ getOptionLabel(value) }}
            </span>
            <span
              class="cozy-select-selection-item-remove"
              @click.stop="removeTag(value)"
            >
              ×
            </span>
          </span>
          <span
            v-if="selectedValues.length > maxTagCount && maxTagCount > 0"
            class="cozy-select-selection-item"
          >
            +{{ selectedValues.length - maxTagCount }} ...
          </span>
        </template>
        <span v-else class="cozy-select-selection-placeholder">{{ placeholder }}</span>
        <input
          v-if="showSearch"
          ref="inputRef"
          v-model="searchValue"
          class="cozy-select-selection-search-input"
          :placeholder="searchValue || selectedValues.length ? '' : placeholder"
          @focus="handleSearchFocus"
          @blur="handleSearchBlur"
          @input="handleSearch"
        >
      </template>

      <!-- 清除按钮 -->
      <span
        v-if="clearable && (modelValue || selectedValues.length) && !disabled"
        class="cozy-select-clear"
        @click.stop="handleClear"
      >
        ×
      </span>

      <!-- 箭头图标 -->
      <span class="cozy-select-arrow">
        <i class="cozy-icon c-down-outlined"></i>
      </span>
    </div>

    <!-- 下拉菜单 -->
    <div
      v-show="dropdownVisible"
      class="cozy-select-dropdown"
      :style="dropdownStyle"
      @mousedown.prevent
    >
      <div v-if="loading" class="cozy-select-dropdown-loading">
        加载中...
      </div>
      <div v-else class="cozy-select-dropdown-list" ref="dropdownRef">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, provide, nextTick, onMounted, onUnmounted, watch } from 'vue'

interface OptionType {
  value: string | number | boolean
  label: string
  disabled: boolean
  group?: string
}

defineOptions({
  name: 'CSelect'
})

const props = withDefaults(defineProps<{
  modelValue?: string | number | boolean | (string | number | boolean)[]
  disabled?: boolean
  multiple?: boolean
  placeholder?: string
  clearable?: boolean
  size?: 'large' | 'small'
  loading?: boolean
  showSearch?: boolean
  filterOption?: boolean | ((inputValue: string, option: OptionType) => boolean)
  maxTagCount?: number
  emptyText?: string
}>(), {
  disabled: false,
  multiple: false,
  placeholder: '请选择',
  clearable: false,
  loading: false,
  showSearch: false,
  filterOption: true,
  maxTagCount: 0,
  emptyText: '暂无数据'
})

const emit = defineEmits(['update:modelValue', 'change', 'search', 'clear', 'focus', 'blur'])

// refs
const selectorRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const dropdownRef = ref<HTMLElement>()

// 状态
const dropdownVisible = ref(false)
const searchValue = ref('')
const searchFocused = ref(false)
const activeValue = ref<string | number | boolean>('')
const options = ref<OptionType[]>([])

// 选中值(多选模式)
const selectedValues = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue
  }
  return []
})

// 显示的标签(多选模式)
const displayTags = computed(() => {
  if (props.maxTagCount && props.maxTagCount > 0) {
    return selectedValues.value.slice(0, props.maxTagCount)
  }
  return selectedValues.value
})

// 下拉框样式
const dropdownStyle = computed(() => {
  if (!selectorRef.value) return {}
  const rect = selectorRef.value.getBoundingClientRect()
  return {
    minWidth: `${rect.width}px`,
    maxHeight: '256px',
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: 1000,
    marginTop: '4px'
  }
})

// 获取选项标签
const getOptionLabel = (value: string | number | boolean) => {
  const option = options.value.find(opt => opt.value === value)
  return option ? option.label : String(value)
}

// 注册选项
const registerOption = (option: OptionType) => {
  const index = options.value.findIndex(opt => opt.value === option.value)
  if (index === -1) {
    options.value.push(option)
  }
}

// 注销选项
const unregisterOption = (option: OptionType) => {
  const index = options.value.findIndex(opt => opt.value === option.value)
  if (index > -1) {
    options.value.splice(index, 1)
  }
}

// 点击选择器
const handleClick = () => {
  if (props.disabled) return
  dropdownVisible.value = !dropdownVisible.value
  if (dropdownVisible.value && props.showSearch) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
}

// 失去焦点
const handleBlur = (e: FocusEvent) => {
  // 检查相关目标是否在选择器内部
  const target = e.relatedTarget as HTMLElement
  if (target && (selectorRef.value?.contains(target) || dropdownRef.value?.contains(target))) {
    return
  }
  dropdownVisible.value = false
  searchValue.value = ''
}

// 清除选择
const handleClear = () => {
  if (props.multiple) {
    emit('update:modelValue', [])
  } else {
    emit('update:modelValue', undefined)
  }
  emit('clear')
  dropdownVisible.value = false
}

// 搜索相关
const handleSearchFocus = () => {
  searchFocused.value = true
  emit('focus')
}

const handleSearchBlur = () => {
  searchFocused.value = false
  emit('blur')
}

const handleSearch = () => {
  emit('search', searchValue.value)
}

// 移除标签
const removeTag = (value: string | number | boolean) => {
  const newValue = selectedValues.value.filter(v => v !== value)
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// 提供上下文
provide('select', {
  value: computed(() => props.modelValue),
  multiple: computed(() => props.multiple),
  selectedValues,
  activeValue,
  handleOptionClick: (value: string | number | boolean) => {
    if (props.multiple) {
      const newValue = [...selectedValues.value]
      const index = newValue.indexOf(value)
      if (index === -1) {
        newValue.push(value)
      } else {
        newValue.splice(index, 1)
      }
      emit('update:modelValue', newValue)
      emit('change', newValue)
    } else {
      emit('update:modelValue', value)
      emit('change', value)
      dropdownVisible.value = false
      searchValue.value = ''
    }
  },
  handleOptionMouseEnter: (value: string | number | boolean) => {
    activeValue.value = value
  },
  registerOption,
  unregisterOption
})

// 组件卸载时清理选项
onUnmounted(() => {
  options.value = []
})
</script>
