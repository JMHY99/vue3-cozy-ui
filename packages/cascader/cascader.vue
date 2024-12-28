<!-- 
  级联选择组件
  基于下拉菜单实现,支持多选、搜索、动态加载等功能
-->
<template>
  <div 
    class="cozy-cascader"
    :class="{
      'cozy-cascader-disabled': disabled,
      'cozy-cascader-focused': focused,
      'cozy-cascader-open': visible,
      'cozy-cascader-multiple': multiple,
      [`cozy-cascader-${size}`]: size
    }"
    ref="cascaderRef"
  >
    <!-- 选择框 -->
    <div 
      class="cozy-cascader-selector"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- 选择项展示区域 -->
      <div class="cozy-cascader-selection">
        <!-- 单选模式 -->
        <template v-if="!multiple">
          <span 
            v-if="selectedLabels.length"
            class="cozy-cascader-selection-item"
          >
            {{ selectedLabels.join(' / ') }}
          </span>
          <span 
            v-else 
            class="cozy-cascader-selection-placeholder"
          >
            {{ placeholder }}
          </span>
        </template>

        <!-- 多选模式 -->
        <template v-else>
          <template v-if="selectedOptions.length">
            <span
              v-for="(option, index) in displayOptions"
              :key="option[valueField]"
              class="cozy-cascader-selection-item"
            >
              <span class="cozy-cascader-selection-item-content">
                {{ getOptionLabel(option) }}
              </span>
              <span
                class="cozy-cascader-selection-item-remove"
                @click.stop="removeOption(option)"
              >
                <c-icon name="c-close-outlined" :size="18"/>
              </span>
            </span>
            <span 
              v-if="selectedOptions.length > maxTagCount"
              class="cozy-cascader-selection-overflow"
            >
              + {{ selectedOptions.length - maxTagCount }} ...
            </span>
          </template>
          <span 
            v-else 
            class="cozy-cascader-selection-placeholder"
          >
            {{ placeholder }}
          </span>
        </template>
      </div>

      <!-- 清除按钮 -->
      <span
        v-if="allowClear && !disabled && (multiple ? selectedOptions.length : modelValue)"
        class="cozy-cascader-clear"
        @click.stop="handleClear"
      >
        <c-icon name="c-circle-close-filled" :size="18"/>
      </span>

      <!-- 箭头图标 -->
      <span class="cozy-cascader-arrow">
        <c-icon :name="visible ? 'c-down-outlined' : 'c-down-outlined'" :size="18" />
      </span>
    </div>

    <!-- 下拉面板 -->
    <div
      v-show="visible"
      class="cozy-cascader-dropdown"
    >
      <!-- 搜索框 -->
      <div 
        v-if="showSearch"
        class="cozy-cascader-dropdown-search"
      >
        <c-input
          v-model="searchValue"
          :placeholder="searchPlaceholder"
          :prefix-icon="'c-search'"
        />
      </div>

      <!-- 选项面板 -->
      <div class="cozy-cascader-menus">
        <ul
          v-for="(menu, index) in activePanels"
          :key="index"
          class="cozy-cascader-menu"
        >
          <li
            v-for="option in menu"
            :key="option[valueField]"
            class="cozy-cascader-menu-item"
            :class="{
              'cozy-cascader-menu-item-active': isOptionSelected(option, index),
              'cozy-cascader-menu-item-disabled': option.disabled,
              'cozy-cascader-menu-item-loading': option.loading
            }"
            @click="handleOptionClick(option, index)"
          >
            <span class="cozy-cascader-menu-item-content">
              {{ getOptionLabel(option) }}
            </span>
            <c-icon
              v-if="option[childrenField] && option[childrenField].length"
              name="c-right"
              class="cozy-cascader-menu-item-expand-icon"
            />
            <c-icon
              v-else-if="option.loading"
              name="c-loading"
              class="cozy-cascader-menu-item-loading-icon"
              spin
              :size="18"
            />
          </li>
        </ul>
      </div>

      <!-- 空状态 -->
      <div
        v-if="showEmpty"
        class="cozy-cascader-empty"
      >
        {{ emptyText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, PropType, onMounted, onBeforeUnmount } from 'vue'
import CIcon from '../icon/icon.vue'
import CInput from '../input/input.vue'

// 选项数据类型
export interface CascaderOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  children?: CascaderOption[];
  loading?: boolean;
  [key: string]: any;
}

export default defineComponent({
  name: 'CCascader',
  components: {
    CIcon,
    CInput
  },
  props: {
    // 选中的值
    modelValue: {
      type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
      default: undefined
    },
    // 可选项数据源
    options: {
      type: Array as PropType<CascaderOption[]>,
      default: () => []
    },
    // 自定义字段名
    fieldNames: {
      type: Object as PropType<{
        label?: string;
        value?: string;
        children?: string;
      }>,
      default: () => ({
        label: 'label',
        value: 'value',
        children: 'children'
      })
    },
    // 输入框占位文本
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否支持清除
    allowClear: {
      type: Boolean,
      default: true
    },
    // 是否支持搜索
    showSearch: {
      type: Boolean,
      default: false
    },
    // 搜索框占位文本
    searchPlaceholder: {
      type: String,
      default: '请输入搜索内容'
    },
    // 是否支持多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 多选时最多显示多少个 tag
    maxTagCount: {
      type: Number,
      default: 3
    },
    // 尺寸
    size: {
      type: String as PropType<'large' | 'small'>,
      default: undefined
    },
    // 空状态显示文本
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 异步加载数据
    loadData: {
      type: Function as PropType<(selectedOptions: CascaderOption[]) => Promise<void>>,
      default: undefined
    }
  },
  emits: [
    'update:modelValue',
    'change',
    'search',
    'blur',
    'focus',
    'visibleChange'
  ],
  setup(props, { emit }) {
    // 内部状态
    const visible = ref(false)
    const focused = ref(false)
    const searchValue = ref('')
    const selectedOptions = ref<CascaderOption[]>([])
    const activePanels = ref<CascaderOption[][]>([props.options])
    const cascaderRef = ref<HTMLElement | null>(null)

    // 字段别名
    const labelField = computed(() => props.fieldNames.label || 'label')
    const valueField = computed(() => props.fieldNames.value || 'value')
    const childrenField = computed(() => props.fieldNames.children || 'children')

    // 选中值对应的文本
    const selectedLabels = computed(() => {
      return selectedOptions.value.map(option => option[labelField.value])
    })

    // 多选时要显示的选项
    const displayOptions = computed(() => {
      if (props.maxTagCount && selectedOptions.value.length > props.maxTagCount) {
        return selectedOptions.value.slice(0, props.maxTagCount)
      }
      return selectedOptions.value
    })

    // 是否显示空状态
    const showEmpty = computed(() => {
      return !activePanels.value[0]?.length
    })

    // 获取选项的标签文本
    const getOptionLabel = (option: CascaderOption) => {
      return option[labelField.value]
    }

    // 判断选项是否被选中
    const isOptionSelected = (option: CascaderOption, level: number) => {
      return selectedOptions.value[level]?.[valueField.value] === option[valueField.value]
    }

    // 处理选项点击
    const handleOptionClick = async (option: CascaderOption, level: number) => {
      if (option.disabled) return

      // 更新选中项
      selectedOptions.value = selectedOptions.value.slice(0, level)
      selectedOptions.value.push(option)

      // 处理子选项
      if (option[childrenField.value]?.length) {
        activePanels.value = activePanels.value.slice(0, level + 1)
        activePanels.value.push(option[childrenField.value])
      } else if (props.loadData && !option.loading) {
        // 异步加载子选项
        option.loading = true
        try {
          await props.loadData([...selectedOptions.value])
          if (option[childrenField.value]?.length) {
            activePanels.value = activePanels.value.slice(0, level + 1)
            activePanels.value.push(option[childrenField.value])
          }
        } finally {
          option.loading = false
        }
      } else {
        // 叶子节点,触发选中事件
        const value = props.multiple
          ? [...(props.modelValue as (string | number)[]) || [], option[valueField.value]]
          : option[valueField.value]
        emit('update:modelValue', value)
        emit('change', value, [...selectedOptions.value])
        if (!props.multiple) {
          visible.value = false
        }
      }
    }

    // 移除选中项
    const removeOption = (option: CascaderOption) => {
      if (props.multiple) {
        const value = (props.modelValue as (string | number)[]).filter(
          v => v !== option[valueField.value]
        )
        emit('update:modelValue', value)
        emit('change', value)
      }
    }

    // 清空选择
    const handleClear = () => {
      const value = props.multiple ? [] : undefined
      emit('update:modelValue', value)
      emit('change', value)
      selectedOptions.value = []
      activePanels.value = [props.options]
    }

    // 处理点击事件
    const handleClick = () => {
      if (!props.disabled) {
        visible.value = !visible.value
        emit('visibleChange', visible.value)
      }
    }

    // 处理鼠标事件
    const handleMouseEnter = () => {
      if (!props.disabled) {
        focused.value = true
        emit('focus')
      }
    }

    const handleMouseLeave = () => {
      if (!props.disabled) {
        focused.value = false
        emit('blur')
      }
    }

    // 处理点击外部
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (cascaderRef.value && !cascaderRef.value.contains(target)) {
        visible.value = false
        emit('visibleChange', false)
      }
    }

    // 监听搜索值变化
    watch(searchValue, (value) => {
      emit('search', value)
    })

    // 监听选项数据变化
    watch(() => props.options, (options) => {
      activePanels.value = [options]
    })

    // 添加和移除点击外部事件监听
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      visible,
      focused,
      searchValue,
      selectedOptions,
      activePanels,
      cascaderRef,
      labelField,
      valueField,
      childrenField,
      selectedLabels,
      displayOptions,
      showEmpty,
      getOptionLabel,
      isOptionSelected,
      handleOptionClick,
      removeOption,
      handleClear,
      handleClick,
      handleMouseEnter,
      handleMouseLeave
    }
  }
})
</script> 