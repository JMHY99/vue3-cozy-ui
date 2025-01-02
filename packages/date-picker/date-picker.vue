<template>
  <div class="cozy-date-picker" ref="pickerRef">
    <div class="cozy-date-picker-input" @click="togglePanel">
      <input
        ref="inputRef"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
      />
      <span class="cozy-date-picker-suffix">
        <i class="cozy-icon c-riqi"></i>
      </span>
    </div>

    <div v-show="panelVisible" class="cozy-date-picker-panel">
      <!-- 面板头部 -->
      <div class="cozy-date-picker-header">
        <button class="cozy-date-picker-prev-btn" @click="prevMonth">
          <i class="cozy-icon-left"></i>
        </button>
        <span class="cozy-date-picker-header-label">
          {{ currentYear }}年 {{ currentMonth + 1 }}月
        </span>
        <button class="cozy-date-picker-next-btn" @click="nextMonth">
          <i class="cozy-icon-right"></i>
        </button>
      </div>

      <!-- 星期表头 -->
      <div class="cozy-date-picker-body">
        <div class="cozy-date-picker-week-list">
          <span v-for="week in weeks" :key="week">{{ week }}</span>
        </div>

        <!-- 日期单元格 -->
        <div class="cozy-date-picker-dates">
          <span
            v-for="(date, index) in dates"
            :key="index"
            class="cozy-date-picker-cell"
            :class="{
              'is-today': isToday(date),
              'is-selected': isSelected(date),
              'is-disabled': isDisabled(date),
              'not-current-month': !isCurrentMonth(date),
            }"
            @click="selectDate(date)"
          >
            {{ date.getDate() }}
          </span>
        </div>
      </div>

      <!-- 底部操作栏 -->
      <div class="cozy-date-picker-footer">
        <button class="cozy-date-picker-btn" @click="selectToday">今天</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// 定义组件名称
defineOptions({
  name: "CDatePicker",
});

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
  placeholder: {
    type: String,
    default: "请选择日期",
  },
  format: {
    type: String,
    default: "YYYY-MM-DD",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledDate: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const pickerRef = ref<HTMLElement>();
const inputRef = ref<HTMLInputElement>();
const panelVisible = ref(false);
const currentDate = ref(props.modelValue || new Date());

// 星期表头
const weeks = ["日", "一", "二", "三", "四", "五", "六"];

// 当前年月
const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth());

// 格式化显示值
const displayValue = computed(() => {
  if (!props.modelValue) return "";
  return formatDate(props.modelValue, props.format);
});

// 生成日历数据
const dates = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const dates: Date[] = [];

  // 上个月的日期
  const firstDayWeek = firstDay.getDay();
  for (let i = firstDayWeek - 1; i >= 0; i--) {
    dates.push(new Date(year, month, -i));
  }

  // 当前月的日期
  for (let i = 1; i <= lastDay.getDate(); i++) {
    dates.push(new Date(year, month, i));
  }

  // 下个月的日期
  const remaining = 42 - dates.length;
  for (let i = 1; i <= remaining; i++) {
    dates.push(new Date(year, month + 1, i));
  }

  return dates;
});

// 切换月份
const prevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1);
};

// 选择日期
const selectDate = (date: Date) => {
  if (isDisabled(date)) return;
  emit("update:modelValue", date);
  emit("change", date);
  panelVisible.value = false;
};

// 选择今天
const selectToday = () => {
  const today = new Date();
  selectDate(today);
};

// 日期状态判断
const isToday = (date: Date) => {
  const today = new Date();
  return isSameDay(date, today);
};

const isSelected = (date: Date) => {
  return props.modelValue && isSameDay(date, props.modelValue);
};

const isCurrentMonth = (date: Date) => {
  return date.getMonth() === currentMonth.value;
};

const isDisabled = (date: Date) => {
  return props.disabledDate ? props.disabledDate(date) : false;
};

// 工具函数
const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const formatDate = (date: Date, format: string) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day);
};

// 面板显示控制
const togglePanel = () => {
  if (props.disabled) return;
  panelVisible.value = !panelVisible.value;
};

// 处理点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (pickerRef.value && !pickerRef.value.contains(target)) {
    panelVisible.value = false;
  }
};

// 添加和移除点击事件监听
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
