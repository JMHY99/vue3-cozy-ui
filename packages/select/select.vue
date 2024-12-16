<template>
  <div
    ref="selectRef"
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
    @mousedown.stop="handleClick"
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
      @mousedown.stop
    >
      <div v-if="loading" class="cozy-select-dropdown-loading">
        加载中...
      </div>
      <div v-else-if="!$slots.default" class="cozy-select-dropdown-empty">
        {{ emptyText }}
      </div>
      <div v-else class="cozy-select-dropdown-list" ref="dropdownRef">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 引入必要的 Vue 组合式 API
import { ref, computed, provide, nextTick, onMounted, onUnmounted, watch } from 'vue'

// 定义选项类型接口
interface OptionType {
  value: string | number | boolean  // 选项值
  label: string                     // 选项标签
  disabled: boolean                 // 是否禁用
  group?: string                    // 所属分组
}

// 组件名称
defineOptions({
  name: 'CSelect'
})

// 组件属性定义
const props = withDefaults(defineProps<{
  modelValue?: string | number | boolean | (string | number | boolean)[]  // 选中值，支持单选和多选
  disabled?: boolean    // 是否禁用
  multiple?: boolean    // 是否多选模式
  placeholder?: string  // 占位文本
  clearable?: boolean   // 是否可清空
  size?: 'large' | 'small'  // 组件大小
  loading?: boolean     // 加载状态
  showSearch?: boolean  // 是否显示搜索框
  filterOption?: boolean | ((inputValue: string, option: OptionType) => boolean)  // 搜索过滤函数
  maxTagCount?: number  // 多选模式下最多显示的标签数
  emptyText?: string    // 无数据时显示的文本
}>(), {
  // 属性默认值
})

// 组件事件
const emit = defineEmits(['update:modelValue', 'change', 'search', 'clear', 'focus', 'blur'])

// DOM 引用
const selectRef = ref<HTMLElement>()      // 选择器根元素
const selectorRef = ref<HTMLElement>()    // 选择框元素
const inputRef = ref<HTMLInputElement>()  // 输入框元素
const dropdownRef = ref<HTMLElement>()    // 下拉菜单元素

// 组件状态
const dropdownVisible = ref(false)        // 下拉菜单是否可见
const searchValue = ref('')               // 搜索输入值
const searchFocused = ref(false)          // 搜索框是否聚焦
const activeValue = ref<string | number | boolean>('')  // 当前激活的选项值
const options = ref<OptionType[]>([])     // 所有选项列表

// 计算属性：选中值（多选模式）
const selectedValues = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue
  }
  return []
})

// 计算属性：显示的标签（多选模式）
const displayTags = computed(() => {
  if (props.maxTagCount && props.maxTagCount > 0) {
    return selectedValues.value.slice(0, props.maxTagCount)
  }
  return selectedValues.value
})

// 计算属性：下拉框样式
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

// 获取选项标签文本
const getOptionLabel = (value: string | number | boolean) => {
  const option = options.value.find(opt => opt.value === value)
  return option ? option.label : String(value)
}

// 注册选项到选择器
const registerOption = (option: OptionType) => {
  const index = options.value.findIndex(opt => opt.value === option.value)
  if (index === -1) {
    options.value.push(option)
  }
}

// 从选择器中注销选项
const unregisterOption = (option: OptionType) => {
  const index = options.value.findIndex(opt => opt.value === option.value)
  if (index > -1) {
    options.value.splice(index, 1)
  }
}

// 处理选择器点击事件
const handleClick = (event: MouseEvent) => {
  if (props.disabled) return
  event.stopPropagation()
  dropdownVisible.value = !dropdownVisible.value
  if (dropdownVisible.value && props.showSearch) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
}

// 处理失去焦点事件
const handleBlur = (e: FocusEvent) => {
  // 检查相关目标是否在选择器内部
  const target = e.relatedTarget as HTMLElement
  if (target && (selectorRef.value?.contains(target) || dropdownRef.value?.contains(target))) {
    return
  }
  dropdownVisible.value = false
  searchValue.value = ''
}

// 处理清空选择
const handleClear = () => {
  if (props.multiple) {
    emit('update:modelValue', [])
  } else {
    emit('update:modelValue', undefined)
  }
  emit('clear')
  dropdownVisible.value = false
}

// 处理搜索框聚焦
const handleSearchFocus = () => {
  searchFocused.value = true
  emit('focus')
}

// 处理搜索框失焦
const handleSearchBlur = () => {
  searchFocused.value = false
  emit('blur')
}

// 处理搜索输入
const handleSearch = () => {
  emit('search', searchValue.value)
}

// 移除选中标签（多选模式）
const removeTag = (value: string | number | boolean) => {
  const newValue = selectedValues.value.filter(v => v !== value)
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// 处理点击外部关闭下拉框
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (selectRef.value && !selectRef.value.contains(target)) {
    dropdownVisible.value = false
    searchValue.value = ''
  }
}

// 在 onMounted 中添加事件监听
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

// 在 onUnmounted 中移除事件监听
onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  options.value = []
})

// 处理选项点击
const handleOptionClick = (value: string | number | boolean) => {
  if (props.disabled) return

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
    // 多选模式下不关闭下拉框
  } else {
    emit('update:modelValue', value)
    emit('change', value)
    // 单选模式下选择后关闭下拉框
    dropdownVisible.value = false
    searchValue.value = ''
  }
}

// 提供上下文给子组件
provide('select', {
  value: computed(() => props.modelValue),
  multiple: computed(() => props.multiple),
  selectedValues,
  activeValue,
  handleOptionClick,
  handleOptionMouseEnter: (value: string | number | boolean) => {
    activeValue.value = value
  },
  registerOption,
  unregisterOption
})
</script>
