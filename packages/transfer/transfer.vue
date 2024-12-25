<template>
  <div class="cozy-transfer">
    <!-- 源列表 -->
    <div class="cozy-transfer-list">
      <div class="cozy-transfer-list-header">
        <div class="cozy-transfer-list-header-title">
          <c-checkbox 
            :model-value="sourceCheckedAll"
            :indeterminate="sourceIndeterminate"
            @update:model-value="onSourceCheckAllChange"
          />
          <span>{{ titles[0] }}</span>
          <span class="cozy-transfer-list-header-selected">{{ sourceCheckedCount }}/{{ filteredSourceData.length }}</span>
        </div>
        <div v-if="showSearch" class="cozy-transfer-list-header-search">
          <c-input 
            v-model="sourceSearchText"
            placeholder="请输入搜索内容"
            size="small"
          />
        </div>
      </div>
      <div class="cozy-transfer-list-body">
        <c-empty v-if="filteredSourceData.length === 0" />
        <ul v-else>
          <li 
            v-for="item in filteredSourceData" 
            :key="item[rowKey]"
            class="cozy-transfer-list-item"
          >
            <c-checkbox 
              :model-value="sourceChecked.includes(item[rowKey] as string | number)"
              @update:model-value="(val) => onItemCheck(val, item[rowKey] as string | number, 'source')"
            >
              {{ item[renderProp] }}
            </c-checkbox>
          </li>
        </ul>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="cozy-transfer-operation">
      <c-button 
        type="primary"
        size="small"
        :disabled="sourceChecked.length === 0"
        @click="moveToTarget"
      >
        <c-icon name="c-right-outlined" />
      </c-button>
      <c-button 
        type="primary"
        size="small"
        :disabled="targetChecked.length === 0"
        @click="moveToSource"
      >
        <c-icon name="c-left-outlined" />
      </c-button>
    </div>

    <!-- 目标列表 -->
    <div class="cozy-transfer-list">
      <div class="cozy-transfer-list-header">
        <div class="cozy-transfer-list-header-title">
          <c-checkbox 
            :model-value="targetCheckedAll"
            :indeterminate="targetIndeterminate"
            @update:model-value="onTargetCheckAllChange"
          />
          <span>{{ titles[1] }}</span>
          <span class="cozy-transfer-list-header-selected">{{ targetCheckedCount }}/{{ filteredTargetData.length }}</span>
        </div>
        <div v-if="showSearch" class="cozy-transfer-list-header-search">
          <c-input 
            v-model="targetSearchText"
            placeholder="请输入搜索内容"
            size="small"
          />
        </div>
      </div>
      <div class="cozy-transfer-list-body">
        <c-empty v-if="filteredTargetData.length === 0" />
        <ul v-else>
          <li 
            v-for="item in filteredTargetData" 
            :key="item[rowKey]"
            class="cozy-transfer-list-item"
          >
            <c-checkbox 
              :model-value="targetChecked.includes(item[rowKey] as string | number)"
              @update:model-value="(val) => onItemCheck(val, item[rowKey] as string | number, 'target')"
            >
              {{ item[renderProp] }}
            </c-checkbox>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import CCheckbox from '../checkbox/checkbox.vue'
import CInput from '../input/input.vue'
import CButton from '../button/button.vue'
import CIcon from '../icon/icon.vue'
import CEmpty from '../empty/empty.vue'

interface TransferItem {
  [key: string]: string | number;
}

export default defineComponent({
  name: 'CTransfer',
  components: {
    CCheckbox,
    CInput,
    CButton,
    CIcon,
    CEmpty
  },
  props: {
    // 数据源
    dataSource: {
      type: Array as PropType<TransferItem[]>,
      default: () => []
    },
    // 显示在右侧框数据的key集合
    modelValue: {
      type: Array as PropType<(string | number)[]>,
      default: () => []
    },
    // 标题集合
    titles: {
      type: Array as PropType<string[]>,
      default: () => ['源列表', '目标列表']
    },
    // 数据key
    rowKey: {
      type: String,
      default: 'key'
    },
    // 渲染属性
    renderProp: {
      type: String,
      default: 'title'
    },
    // 是否显示搜索框
    showSearch: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    // 源数据选中项
    const sourceChecked = ref<(string | number)[]>([])
    // 目标数据选中项
    const targetChecked = ref<(string | number)[]>([])
    // 源搜索文本
    const sourceSearchText = ref('')
    // 目标搜索文本
    const targetSearchText = ref('')

    // 过滤后的源数据
    const filteredSourceData = computed(() => {
      return props.dataSource.filter(item => {
        const key = item[props.rowKey]
        const isInTarget = props.modelValue.includes(key as string | number)
        const matchSearch = sourceSearchText.value ? 
          String(item[props.renderProp]).toLowerCase().includes(sourceSearchText.value.toLowerCase()) : 
          true
        return !isInTarget && matchSearch
      })
    })

    // 过滤后的目标数据
    const filteredTargetData = computed(() => {
      return props.dataSource.filter(item => {
        const key = item[props.rowKey]
        const isInTarget = props.modelValue.includes(key as string | number)
        const matchSearch = targetSearchText.value ?
          String(item[props.renderProp]).toLowerCase().includes(targetSearchText.value.toLowerCase()) :
          true
        return isInTarget && matchSearch
      })
    })

    // 源列表选中数量
    const sourceCheckedCount = computed(() => sourceChecked.value.length)
    // 目标列表选中数量
    const targetCheckedCount = computed(() => targetChecked.value.length)

    // 源列表全选状态
    const sourceCheckedAll = computed(() => {
      return filteredSourceData.value.length > 0 && 
        sourceChecked.value.length === filteredSourceData.value.length
    })

    // 目标列表全选状态
    const targetCheckedAll = computed(() => {
      return filteredTargetData.value.length > 0 &&
        targetChecked.value.length === filteredTargetData.value.length
    })

    // 源列表半选状态
    const sourceIndeterminate = computed(() => {
      return sourceChecked.value.length > 0 && 
        sourceChecked.value.length < filteredSourceData.value.length
    })

    // 目标列表半选状态
    const targetIndeterminate = computed(() => {
      return targetChecked.value.length > 0 &&
        targetChecked.value.length < filteredTargetData.value.length
    })

    // 源列表全选变化
    const onSourceCheckAllChange = (val: boolean) => {
      sourceChecked.value = val ?
        filteredSourceData.value.map(item => item[props.rowKey] as string | number) :
        []
    }

    // 目标列表全选变化
    const onTargetCheckAllChange = (val: boolean) => {
      targetChecked.value = val ?
        filteredTargetData.value.map(item => item[props.rowKey] as string | number) :
        []
    }

    // 单项选择变化
    const onItemCheck = (checked: boolean, key: string | number, type: 'source' | 'target') => {
      const targetRef = type === 'source' ? sourceChecked : targetChecked
      if (checked) {
        targetRef.value.push(key)
      } else {
        const index = targetRef.value.indexOf(key)
        if (index > -1) {
          targetRef.value.splice(index, 1)
        }
      }
    }

    // 移动到目标列表
    const moveToTarget = () => {
      const newTargetKeys = [...props.modelValue, ...sourceChecked.value]
      emit('update:modelValue', newTargetKeys)
      emit('change', newTargetKeys, 'right', sourceChecked.value)
      sourceChecked.value = []
    }

    // 移动到源列表
    const moveToSource = () => {
      const newTargetKeys = props.modelValue.filter(key => !targetChecked.value.includes(key))
      emit('update:modelValue', newTargetKeys)
      emit('change', newTargetKeys, 'left', targetChecked.value)
      targetChecked.value = []
    }

    return {
      sourceChecked,
      targetChecked,
      sourceSearchText,
      targetSearchText,
      filteredSourceData,
      filteredTargetData,
      sourceCheckedCount,
      targetCheckedCount,
      sourceCheckedAll,
      targetCheckedAll,
      sourceIndeterminate,
      targetIndeterminate,
      onSourceCheckAllChange,
      onTargetCheckAllChange,
      onItemCheck,
      moveToTarget,
      moveToSource
    }
  }
})
</script> 