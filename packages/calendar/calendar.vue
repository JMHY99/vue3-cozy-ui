<template>
  <div
    class="cozy-calendar"
    :class="{
      'cozy-calendar-fullscreen': fullscreen,
    }"
  >
    <!-- 日历头部 -->
    <div class="cozy-calendar-header">
      <div class="cozy-calendar-header-left">
        <div class="cozy-calendar-picker">
          <button class="cozy-calendar-prev-btn" @click="handlePrevMonth">
            <i class="cozy-icon c-left-outlined"></i>
          </button>
          <span class="cozy-calendar-current-month">{{
            currentMonthLabel
          }}</span>
          <button class="cozy-calendar-next-btn" @click="handleNextMonth">
            <i class="cozy-icon c-right-outlined"></i>
          </button>
        </div>
      </div>
      <div class="cozy-calendar-header-right">
        <div class="cozy-calendar-mode-switch">
          <button
            :class="[
              'cozy-calendar-mode-btn',
              mode === 'month' ? 'cozy-calendar-mode-btn-active' : '',
            ]"
            @click="handleModeChange('month')"
          >
            月
          </button>
          <button
            :class="[
              'cozy-calendar-mode-btn',
              mode === 'year' ? 'cozy-calendar-mode-btn-active' : '',
            ]"
            @click="handleModeChange('year')"
          >
            年
          </button>
        </div>
      </div>
    </div>

    <!-- 日历主体 -->
    <div class="cozy-calendar-body">
      <!-- 月视图 -->
      <div v-if="mode === 'month'" class="cozy-calendar-month-view">
        <!-- 星期头 -->
        <div class="cozy-calendar-weekdays">
          <div v-for="day in weekDays" :key="day" class="cozy-calendar-weekday">
            {{ day }}
          </div>
        </div>
        <!-- 日期网格 -->
        <div class="cozy-calendar-days">
          <div
            v-for="(date, index) in monthDays"
            :key="index"
            :class="[
              'cozy-calendar-cell',
              {
                'cozy-calendar-cell-today': isToday(date),
                'cozy-calendar-cell-selected': isSelected(date),
                'cozy-calendar-cell-disabled': isDisabled(date),
                'cozy-calendar-cell-prev-month': date.isPrevMonth,
                'cozy-calendar-cell-next-month': date.isNextMonth,
              },
            ]"
            @click="handleDateSelect(date)"
          >
            <div class="cozy-calendar-date">{{ date.day }}</div>
            <div class="cozy-calendar-content-wrapper">
              <div v-if="$slots.dateCell" class="cozy-calendar-content">
                <slot name="dateCell" :date="date.raw"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 年视图 -->
      <div v-else class="cozy-calendar-year-view">
        <div class="cozy-calendar-months">
          <div
            v-for="(month, index) in months"
            :key="index"
            :class="[
              'cozy-calendar-month-cell',
              {
                'cozy-calendar-month-cell-selected': isCurrentMonth(index),
              },
            ]"
            @click="handleMonthSelect(index)"
          >
            {{ month }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import dayjs from "dayjs";

// 组件名称
defineOptions({
  name: "CCalendar",
});

// 定义组件属性
const props = withDefaults(
  defineProps<{
    modelValue?: Date;
    mode?: "month" | "year";
    fullscreen?: boolean;
    disabledDate?: (date: Date) => boolean;
  }>(),
  {
    mode: "month",
    fullscreen: true,
  }
);

// 组件事件
const emit = defineEmits(["update:modelValue", "select", "panelChange"]);

// 组件状态
const currentDate = ref(props.modelValue || new Date());
const mode = ref(props.mode);

// 星期数组
const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
const months = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

// 计算当前月份标签
const currentMonthLabel = computed(() => {
  const date = dayjs(currentDate.value);
  return `${date.year()}年 ${months[date.month()]}`;
});

// 计算当前月份的所有日期
const monthDays = computed(() => {
  const date = dayjs(currentDate.value);
  const daysInMonth = date.daysInMonth();
  const firstDayOfMonth = date.startOf("month");
  const lastDayOfMonth = date.endOf("month");
  const firstDayWeekday = firstDayOfMonth.day();

  const days: {
    day: number;
    raw: Date;
    isPrevMonth?: boolean;
    isCurrentMonth?: boolean;
    isNextMonth?: boolean;
  }[] = [];

  // 上个月的日期

  // 上个月的日期
  const prevMonthDays = firstDayWeekday;
  const prevMonth = date.subtract(1, "month");
  const prevMonthDaysCount = prevMonth.daysInMonth();

  for (
    let i = prevMonthDaysCount - prevMonthDays + 1;
    i <= prevMonthDaysCount;
    i++
  ) {
    days.push({
      day: i,
      raw: prevMonth.date(i).toDate(),
      isPrevMonth: true,
    });
  }

  // 当前月的日期
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      raw: date.date(i).toDate(),
      isCurrentMonth: true,
    });
  }

  // 下个月的日期
  const nextMonthDays = 42 - days.length; // 6行7列 = 42
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push({
      day: i,
      raw: date.add(1, "month").date(i).toDate(),
      isNextMonth: true,
    });
  }

  return days;
});

// 判断是否为今天
const isToday = (date: { raw: Date }) => {
  return dayjs(date.raw).isSame(dayjs(), "day");
};

// 判断是否为选中日期
const isSelected = (date: { raw: Date }) => {
  return (
    props.modelValue && dayjs(date.raw).isSame(dayjs(props.modelValue), "day")
  );
};

// 判断日期是否禁用
const isDisabled = (date: { raw: Date }) => {
  return props.disabledDate ? props.disabledDate(date.raw) : false;
};

// 判断是否为当前月份
const isCurrentMonth = (month: number) => {
  return dayjs(currentDate.value).month() === month;
};

// 处理日期选择
const handleDateSelect = (date: { raw: Date }) => {
  if (isDisabled(date)) return;
  emit("update:modelValue", date.raw);
  emit("select", date.raw);
};

// 处理月份选择
const handleMonthSelect = (month: number) => {
  const newDate = dayjs(currentDate.value).month(month).toDate();
  currentDate.value = newDate;
  mode.value = "month";
  emit("panelChange", newDate, "month");
};

// 处理模式切换
const handleModeChange = (newMode: "month" | "year") => {
  mode.value = newMode;
  emit("panelChange", currentDate.value, newMode);
};

// 处理上个月
const handlePrevMonth = () => {
  if (mode.value === "month") {
    currentDate.value = dayjs(currentDate.value).subtract(1, "month").toDate();
  } else {
    currentDate.value = dayjs(currentDate.value).subtract(1, "year").toDate();
  }
  emit("panelChange", currentDate.value, mode.value);
};

// 处理下个月
const handleNextMonth = () => {
  if (mode.value === "month") {
    currentDate.value = dayjs(currentDate.value).add(1, "month").toDate();
  } else {
    currentDate.value = dayjs(currentDate.value).add(1, "year").toDate();
  }
  emit("panelChange", currentDate.value, mode.value);
};

// 监听属性变化
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      currentDate.value = newValue;
    }
  }
);

watch(
  () => props.mode,
  (newValue) => {
    mode.value = newValue;
  }
);
</script>
