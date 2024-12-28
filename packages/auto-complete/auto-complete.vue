<!-- 
  AutoComplete 自动完成组件
  输入框自动完成功能,支持自定义输入建议
-->
<template>
  <div 
    class="cozy-auto-complete"
    :class="{
      'cozy-auto-complete-disabled': disabled,
      'cozy-auto-complete-focused': focused,
      [`cozy-auto-complete-${size}`]: size
    }"
  >
    <!-- 输入框 -->
    <slot>
      <c-input
        ref="inputRef"
        v-model="innerValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :size="size"
        :maxlength="maxLength"
        :allow-clear="allowClear"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keydown="handleKeyDown"
      />
    </slot>

    <!-- 下拉面板 -->
    <div
      v-show="visible"
      class="cozy-auto-complete-dropdown"
      :style="dropdownStyle"
    >
      <ul class="cozy-auto-complete-dropdown-menu">
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          class="cozy-auto-complete-dropdown-menu-item"
          :class="{
            'cozy-auto-complete-dropdown-menu-item-active': index === activeIndex,
            'cozy-auto-complete-dropdown-menu-item-disabled': option.disabled
          }"
          @click="handleSelect(option)"
          @mouseenter="handleMouseEnter(index)"
        >
          <slot name="option" :option="option">
            {{ option.value }}
          </slot>
        </li>
      </ul>
      <!-- 空状态 -->
      <div
        v-if="showEmpty"
        class="cozy-auto-complete-dropdown-empty"
      >
        {{ notFoundContent }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, nextTick, watch } from 'vue'

// 选项数据类型
export interface AutoCompleteOption {
  value: string;
  disabled?: boolean;
  [key: string]: any;
}

export default defineComponent({
  name: 'CAutoComplete',
  props: {
    // v-model 绑定值
    modelValue: {
      type: String,
      default: ''
    },
    // 自动完成的数据源
    options: {
      type: Array as PropType<AutoCompleteOption[]>,
      default: () => []
    },
    // 输入框占位文本
    placeholder: {
      type: String,
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 输入框尺寸
    size: {
      type: String as PropType<'large' | 'small'>,
      default: undefined
    },
    // 最大长度
    maxLength: {
      type: Number,
      default: undefined
    },
    // 是否可以清空选项
    allowClear: {
      type: Boolean,
      default: false
    },
    // 是否默认高亮第一个选项
    defaultActiveFirstOption: {
      type: Boolean,
      default: true
    },
    // 是否在输入框获得焦点时显示下拉框
    defaultOpen: {
      type: Boolean,
      default: false
    },
    // 下拉框的样式
    dropdownStyle: {
      type: Object,
      default: () => ({})
    },
    // 无匹配时的内容
    notFoundContent: {
      type: String,
      default: '无匹配结果'
    },
    // 是否回填选中项
    backfill: {
      type: Boolean,
      default: false
    },
    // 自定义过滤逻辑
    filterOption: {
      type: [Boolean, Function] as PropType<boolean | ((input: string, option: AutoCompleteOption) => boolean)>,
      default: true
    }
  },
  emits: [
    'update:modelValue',
    'change',
    'select',
    'search',
    'focus',
    'blur',
    'dropdownVisibleChange'
  ],
  setup(props, { emit }) {
    // 内部状态
    const innerValue = ref(props.modelValue)
    const visible = ref(false)
    const focused = ref(false)
    const activeIndex = ref(-1)
    const inputRef = ref<HTMLInputElement | null>(null)

    // 过滤后的选项
    const filteredOptions = computed(() => {
      if (props.filterOption === false) {
        return props.options
      }
      
      if (!innerValue.value) {
        return props.defaultOpen ? props.options : []
      }
      
      const filterFunc = typeof props.filterOption === 'function' 
        ? props.filterOption 
        : (input: string, option: AutoCompleteOption) => {
            const optionValue = String(option.value || '').toLowerCase()
            const inputValue = String(input || '').toLowerCase()
            return optionValue.includes(inputValue)
          }
      
      return props.options.filter(option => filterFunc(innerValue.value, option))
    })

    // 是否显示空状态
    const showEmpty = computed(() => {
      return visible.value && !filteredOptions.value.length
    })

    // 处理输入事件
    const handleInput = (e: string | Event) => {
      // 如果是事件对象，则获取目标值
      const inputValue = e instanceof Event 
        ? (e.target as HTMLInputElement).value 
        : e

      innerValue.value = inputValue
      emit('update:modelValue', inputValue)
      emit('search', inputValue)

      // 显示下拉框
      visible.value = true
      
      // 默认选中第一个选项
      if (props.defaultActiveFirstOption && filteredOptions.value.length) {
        activeIndex.value = 0
      } else {
        activeIndex.value = -1
      }
    }

    // 处理选择事件
    const handleSelect = (option: AutoCompleteOption) => {
      if (option.disabled) return

      const value = option.value
      innerValue.value = value
      emit('update:modelValue', value)
      emit('select', option)
      emit('change', value)

      // 关闭下拉框
      visible.value = false
      emit('dropdownVisibleChange', false)

      // 聚焦输入框
      nextTick(() => {
        inputRef.value?.focus()
      })
    }

    // 处理键盘事件
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!visible.value) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          visible.value = true
          emit('dropdownVisibleChange', true)
          e.preventDefault()
        }
        return
      }

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          moveActiveIndex(-1)
          break
        case 'ArrowDown':
          e.preventDefault()
          moveActiveIndex(1)
          break
        case 'Enter':
          e.preventDefault()
          if (activeIndex.value >= 0) {
            const option = filteredOptions.value[activeIndex.value]
            if (option) {
              handleSelect(option)
            }
          }
          break
        case 'Escape':
          visible.value = false
          emit('dropdownVisibleChange', false)
          break
      }
    }

    // 移动选中项
    const moveActiveIndex = (step: number) => {
      const options = filteredOptions.value
      if (!options.length) return

      let nextIndex = activeIndex.value + step
      if (nextIndex < 0) {
        nextIndex = options.length - 1
      } else if (nextIndex >= options.length) {
        nextIndex = 0
      }

      activeIndex.value = nextIndex

      // 回填选中项
      if (props.backfill && options[nextIndex]) {
        innerValue.value = options[nextIndex].value
        emit('update:modelValue', options[nextIndex].value)
      }
    }

    // 处理鼠标事件
    const handleMouseEnter = (index: number) => {
      activeIndex.value = index
    }

    const handleFocus = (e: FocusEvent) => {
      focused.value = true
      emit('focus', e)
      
      if (props.defaultOpen) {
        visible.value = true
        emit('dropdownVisibleChange', true)
      }
    }

    const handleBlur = (e: FocusEvent) => {
      focused.value = false
      emit('blur', e)
      // 延迟关闭下拉框,以便能够处理选择事件
      setTimeout(() => {
        visible.value = false
        emit('dropdownVisibleChange', false)
      }, 150)
    }

    // 监听 modelValue 的变化
    watch(
      () => props.modelValue,
      (newValue) => {
        innerValue.value = newValue
      }
    )

    return {
      innerValue,
      visible,
      focused,
      activeIndex,
      inputRef,
      filteredOptions,
      showEmpty,
      handleInput,
      handleSelect,
      handleKeyDown,
      handleMouseEnter,
      handleFocus,
      handleBlur
    }
  }
})
</script> 