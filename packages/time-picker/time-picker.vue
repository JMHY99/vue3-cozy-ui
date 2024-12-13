<template>
  <div 
    class="cozy-time-picker"
    ref="pickerRef"
  >
    <div 
      class="cozy-time-picker-input"
      @click="togglePanel"
    >
      <input
        ref="inputRef"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
      />
      <span class="cozy-time-picker-suffix">
        <i class="cozy-icon-clock"></i>
      </span>
    </div>

    <div 
      v-show="panelVisible"
      class="cozy-time-picker-panel"
    >
      <div class="cozy-time-picker-content">
        <!-- 小时列 -->
        <ul class="cozy-time-picker-column">
          <li
            v-for="hour in 24"
            :key="`hour-${hour-1}`"
            class="cozy-time-picker-cell"
            :class="{
              'is-selected': selectedHour === hour - 1,
              'is-disabled': isDisabledHour(hour - 1)
            }"
            @click="selectHour(hour - 1)"
          >
            {{ String(hour - 1).padStart(2, '0') }}
          </li>
        </ul>

        <!-- 分钟列 -->
        <ul class="cozy-time-picker-column">
          <li
            v-for="minute in 60"
            :key="`minute-${minute-1}`"
            class="cozy-time-picker-cell"
            :class="{
              'is-selected': selectedMinute === minute - 1,
              'is-disabled': isDisabledMinute(minute - 1)
            }"
            @click="selectMinute(minute - 1)"
          >
            {{ String(minute - 1).padStart(2, '0') }}
          </li>
        </ul>

        <!-- 秒钟列 -->
        <ul v-if="showSecond" class="cozy-time-picker-column">
          <li
            v-for="second in 60"
            :key="`second-${second-1}`"
            class="cozy-time-picker-cell"
            :class="{
              'is-selected': selectedSecond === second - 1,
              'is-disabled': isDisabledSecond(second - 1)
            }"
            @click="selectSecond(second - 1)"
          >
            {{ String(second - 1).padStart(2, '0') }}
          </li>
        </ul>
      </div>

      <!-- 底部操作栏 -->
      <div class="cozy-time-picker-footer">
        <button 
          class="cozy-time-picker-btn"
          @click="selectNow"
        >
          此刻
        </button>
        <button 
          class="cozy-time-picker-btn cozy-time-picker-ok-btn"
          @click="confirmSelection"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Date,
    default: null
  },
  placeholder: {
    type: String,
    default: '请选择时间'
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  showSecond: {
    type: Boolean,
    default: true
  },
  disabledHours: {
    type: Function,
    default: null
  },
  disabledMinutes: {
    type: Function,
    default: null
  },
  disabledSeconds: {
    type: Function,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const pickerRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const panelVisible = ref(false)

const selectedHour = ref(props.modelValue ? props.modelValue.getHours() : 0)
const selectedMinute = ref(props.modelValue ? props.modelValue.getMinutes() : 0)
const selectedSecond = ref(props.modelValue ? props.modelValue.getSeconds() : 0)

// 格式化显示值
const displayValue = computed(() => {
  if (!props.modelValue) return ''
  return formatTime(props.modelValue, props.format)
})

// 处理点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (pickerRef.value && !pickerRef.value.contains(target)) {
    panelVisible.value = false
  }
}

// 添加和移除点击事件监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 面板显示控制
const togglePanel = () => {
  if (props.disabled) return
  panelVisible.value = !panelVisible.value
}

// 选择时间
const selectHour = (hour: number) => {
  if (isDisabledHour(hour)) return
  selectedHour.value = hour
}

const selectMinute = (minute: number) => {
  if (isDisabledMinute(minute)) return
  selectedMinute.value = minute
}

const selectSecond = (second: number) => {
  if (isDisabledSecond(second)) return
  selectedSecond.value = second
}

// 确认选择
const confirmSelection = () => {
  const date = new Date()
  date.setHours(selectedHour.value)
  date.setMinutes(selectedMinute.value)
  date.setSeconds(selectedSecond.value)
  
  emit('update:modelValue', date)
  emit('change', date)
  panelVisible.value = false
}

// 选择当前时间
const selectNow = () => {
  const now = new Date()
  selectedHour.value = now.getHours()
  selectedMinute.value = now.getMinutes()
  selectedSecond.value = now.getSeconds()
  confirmSelection()
}

// 禁用判断
const isDisabledHour = (hour: number) => {
  return props.disabledHours ? props.disabledHours(hour) : false
}

const isDisabledMinute = (minute: number) => {
  return props.disabledMinutes ? props.disabledMinutes(minute, selectedHour.value) : false
}

const isDisabledSecond = (second: number) => {
  return props.disabledSeconds ? props.disabledSeconds(second, selectedHour.value, selectedMinute.value) : false
}

// 格式化时间
const formatTime = (date: Date, format: string) => {
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')
  
  return format
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

defineOptions({
  name: 'CTimePicker'
})
</script> 