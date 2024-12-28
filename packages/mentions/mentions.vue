<!-- 
  Mentions 提及组件
  基于输入框实现,支持通过 @ 触发提及其他用户或内容
-->
<template>
  <div 
    class="cozy-mentions"
    :class="{
      'cozy-mentions-disabled': disabled,
      'cozy-mentions-focused': focused,
      [`cozy-mentions-${size}`]: size
    }"
  >
    <!-- 输入框 -->
    <textarea
      ref="textareaRef"
      v-model="innerValue"
      class="cozy-mentions-textarea"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxLength"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @keydown="handleKeyDown"
    />

    <!-- 下拉面板 -->
    <div
      v-show="visible"
      class="cozy-mentions-dropdown"
      :style="dropdownStyle"
    >
      <ul class="cozy-mentions-dropdown-menu">
        <li
          v-for="option in filteredOptions"
          :key="option[valueField]"
          class="cozy-mentions-dropdown-menu-item"
          :class="{
            'cozy-mentions-dropdown-menu-item-active': option[valueField] === activeValue,
            'cozy-mentions-dropdown-menu-item-disabled': option.disabled
          }"
          @click="handleSelect(option)"
          @mouseenter="handleMouseEnter(option)"
        >
          <slot name="option" :option="option">
            {{ option[labelField] }}
          </slot>
        </li>
      </ul>
      <!-- 空状态 -->
      <div
        v-if="showEmpty"
        class="cozy-mentions-dropdown-empty"
      >
        {{ notFoundContent }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, nextTick } from 'vue'

// 选项数据类型
export interface MentionsOption {
  value: string;
  label: string;
  disabled?: boolean;
  [key: string]: any;
}

export default defineComponent({
  name: 'CMentions',
  props: {
    // v-model 绑定值
    modelValue: {
      type: String,
      default: ''
    },
    // 建议选项数据源
    options: {
      type: Array as PropType<MentionsOption[]>,
      default: () => []
    },
    // 自定义触发字符
    prefix: {
      type: [String, Array] as PropType<string | string[]>,
      default: '@'
    },
    // 自定义建议选项的键名
    fieldNames: {
      type: Object as PropType<{
        label?: string;
        value?: string;
      }>,
      default: () => ({
        label: 'label',
        value: 'value'
      })
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
    // 输入框行数
    rows: {
      type: Number,
      default: 1
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
    // 无匹配时的内容
    notFoundContent: {
      type: String,
      default: '无匹配结果'
    },
    // 下拉框的样式
    dropdownStyle: {
      type: Object,
      default: () => ({})
    },
    // 选项筛选方法
    filterOption: {
      type: Function as PropType<(input: string, option: MentionsOption) => boolean>,
      default: undefined
    },
    // 自定义触发搜索的字符串长度
    validateSearch: {
      type: Function as PropType<(text: string, props: Record<string, any>) => boolean>,
      default: undefined
    }
  },
  emits: [
    'update:modelValue',
    'change',
    'select',
    'search',
    'focus',
    'blur'
  ],
  setup(props, { emit }) {
    // 内部状态
    const innerValue = ref(props.modelValue)
    const visible = ref(false)
    const focused = ref(false)
    const activeValue = ref('')
    const searchValue = ref('')
    const textareaRef = ref<HTMLTextAreaElement | null>(null)
    const measureRef = ref<HTMLDivElement | null>(null)

    // 字段别名
    const labelField = computed(() => props.fieldNames.label || 'label')
    const valueField = computed(() => props.fieldNames.value || 'value')

    // 当前触发字符的位置
    const measurePosition = ref({
      start: 0,
      end: 0
    })

    // 过滤后的选项
    const filteredOptions = computed(() => {
      if (!searchValue.value) return props.options
      const filterFunc = props.filterOption || defaultFilterOption
      return props.options.filter(option => filterFunc(searchValue.value, option))
    })

    // 是否显示空状态
    const showEmpty = computed(() => {
      return visible.value && !filteredOptions.value.length
    })

    // 默认的选项筛选方法
    const defaultFilterOption = (input: string, option: MentionsOption) => {
      const label = option[labelField.value]
      return label.toLowerCase().includes(input.toLowerCase())
    }

    // 处理输入事件
    const handleInput = (e: Event) => {
      const target = e.target as HTMLTextAreaElement
      const value = target.value
      innerValue.value = value
      emit('update:modelValue', value)

      // 检查是否触发搜索
      const lastChar = value.charAt(target.selectionStart - 1)
      const prefixArray = Array.isArray(props.prefix) ? props.prefix : [props.prefix]
      
      if (prefixArray.includes(lastChar)) {
        visible.value = true
        searchValue.value = ''
        measurePosition.value = {
          start: target.selectionStart,
          end: target.selectionStart
        }
        activeValue.value = filteredOptions.value[0]?.[valueField.value] || ''
      } else if (visible.value) {
        const text = value.slice(measurePosition.value.start, target.selectionStart)
        if (props.validateSearch ? props.validateSearch(text, props) : true) {
          searchValue.value = text
          emit('search', text)
        }
      }
    }

    // 处理选择事件
    const handleSelect = (option: MentionsOption) => {
      if (option.disabled) return

      const value = option[valueField.value]
      const prefix = Array.isArray(props.prefix) ? props.prefix[0] : props.prefix
      const start = measurePosition.value.start - 1
      const end = textareaRef.value?.selectionStart || 0
      
      const newValue = 
        innerValue.value.slice(0, start) +
        prefix + value +
        ' ' +
        innerValue.value.slice(end)

      innerValue.value = newValue
      emit('update:modelValue', newValue)
      emit('select', option)
      emit('change', newValue)

      visible.value = false
      searchValue.value = ''

      nextTick(() => {
        if (textareaRef.value) {
          const newEnd = start + value.length + 2
          textareaRef.value.selectionStart = newEnd
          textareaRef.value.selectionEnd = newEnd
          textareaRef.value.focus()
        }
      })
    }

    // 处理键盘事件
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!visible.value) return

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          moveActiveOption(-1)
          break
        case 'ArrowDown':
          e.preventDefault()
          moveActiveOption(1)
          break
        case 'Enter':
          e.preventDefault()
          if (activeValue.value) {
            const option = filteredOptions.value.find(
              opt => opt[valueField.value] === activeValue.value
            )
            if (option) {
              handleSelect(option)
            }
          }
          break
        case 'Escape':
          visible.value = false
          break
      }
    }

    // 移动选中项
    const moveActiveOption = (step: number) => {
      const options = filteredOptions.value
      if (!options.length) return

      const activeIndex = options.findIndex(
        opt => opt[valueField.value] === activeValue.value
      )
      
      let nextIndex = activeIndex + step
      if (nextIndex < 0) {
        nextIndex = options.length - 1
      } else if (nextIndex >= options.length) {
        nextIndex = 0
      }

      activeValue.value = options[nextIndex][valueField.value]
    }

    // 处理鼠标事件
    const handleMouseEnter = (option: MentionsOption) => {
      if (!option.disabled) {
        activeValue.value = option[valueField.value]
      }
    }

    const handleFocus = (e: FocusEvent) => {
      focused.value = true
      emit('focus', e)
    }

    const handleBlur = (e: FocusEvent) => {
      focused.value = false
      emit('blur', e)
      // 延迟关闭下拉框,以便能够处理选择事件
      setTimeout(() => {
        visible.value = false
      }, 100)
    }

    return {
      innerValue,
      visible,
      focused,
      activeValue,
      textareaRef,
      measureRef,
      labelField,
      valueField,
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