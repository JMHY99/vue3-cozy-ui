<template>
  <div class="cozy-pagination">
    <!-- 总数显示 -->
    <span v-if="showTotal" class="cozy-pagination-total">
      {{
        showTotal(total, [
          (current - 1) * pageSize + 1,
          Math.min(current * pageSize, total),
        ])
      }}
    </span>

    <!-- 上一页 -->
    <button
      class="cozy-pagination-prev"
      :disabled="current <= 1"
      @click="handlePrev"
    >
      <i class="cozy-icon c-left-outlined"></i>
    </button>

    <!-- 页码 -->
    <ul class="cozy-pagination-pager">
      <template v-for="(page, index) in pageList" :key="index">
        <li
          v-if="page !== '...'"
          :class="[
            'cozy-pagination-item',
            { 'cozy-pagination-item-active': page === current },
          ]"
          @click="handlePageClick(page)"
        >
          {{ page }}
        </li>
        <li v-else class="cozy-pagination-item cozy-pagination-item-ellipsis">
          <!-- <i class="cozy-icon c-more-outlined"></i> -->
          <!-- 省略号 -->
          <span>...</span>
        </li>
      </template>
    </ul>

    <!-- 下一页 -->
    <button
      class="cozy-pagination-next"
      :disabled="current >= totalPages"
      @click="handleNext"
    >
      <i class="cozy-icon c-right-outlined"></i>
    </button>

    <!-- 跳转 -->
    <div v-if="showQuickJumper" class="cozy-pagination-jumper">
      跳至
      <input
        type="text"
        :value="jumpPage"
        @change="handleJumpChange"
        @keyup.enter="handleJumpEnter"
      />
      页
    </div>

    <!-- 每页条数选择器 -->
    <div v-if="showSizeChanger" class="cozy-pagination-sizer">
      <!-- <c-select
        v-model:value="innerPageSize"
        :options="pageSizeOptions.map(size => ({
          value: size,
          label: `${size} 条/页`
        }))"
        @change="handleSizeChange"
      /> -->
      <c-select v-model="innerPageSize" @change="handleSizeChange">
        <c-option
          v-for="item in pageSizeOptions"
          :key="item"
          :value="item"
          :label="`${item} 条/页`"
        ></c-option>
      </c-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, type PropType } from "vue";

defineOptions({
  name: "CPagination",
});

const props = defineProps({
  current: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  showQuickJumper: {
    type: Boolean,
    default: false,
  },
  showSizeChanger: {
    type: Boolean,
    default: false,
  },
  showTotal: {
    type: Function,
    default: undefined,
  },
  pageSizeOptions: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 50, 100],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:current", "update:pageSize", "change"]);

// 内部状态
const innerPageSize = ref(props.pageSize);
const jumpPage = ref("");

// 计算总页数
const totalPages = computed(() => Math.ceil(props.total / innerPageSize.value));

// 生成页码列表
const pageList = computed(() => {
  const result: (number | string)[] = [];
  const current = props.current;
  const total = totalPages.value;

  // 当总页数小于等于7时，显示所有页码
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      result.push(i);
    }
    return result;
  }

  // 当总页数大于7时，使用省略号
  result.push(1);
  if (current - 3 > 1) {
    result.push("...");
  }

  const start = Math.max(2, current - 2);
  const end = Math.min(total - 1, current + 2);

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  if (current + 3 < total) {
    result.push("...");
  }
  if (end < total) {
    result.push(total);
  }

  return result;
});

// 处理页码点击
const handlePageClick = (page: number) => {
  if (props.disabled || page === props.current) return;
  emit("update:current", page);
  emit("change", page, innerPageSize.value);
};

// 处理上一页
const handlePrev = () => {
  if (props.disabled || props.current <= 1) return;
  const newPage = props.current - 1;
  emit("update:current", newPage);
  emit("change", newPage, innerPageSize.value);
};

// 处理下一页
const handleNext = () => {
  if (props.disabled || props.current >= totalPages.value) return;
  const newPage = props.current + 1;
  emit("update:current", newPage);
  emit("change", newPage, innerPageSize.value);
};

// 处理每页条数变化
const handleSizeChange = (size: number) => {
  innerPageSize.value = size;
  emit("update:pageSize", size);
  // 重新计算当前页，确保不超出范围
  const newCurrent = Math.min(props.current, Math.ceil(props.total / size));
  emit("update:current", newCurrent);
  emit("change", newCurrent, size);
};

// 处理跳转页码输入
const handleJumpChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  jumpPage.value = value.replace(/[^\d]/g, "");
};

// 处理跳转页码确认
const handleJumpEnter = () => {
  if (!jumpPage.value) return;
  let page = parseInt(jumpPage.value);
  if (page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  emit("update:current", page);
  emit("change", page, innerPageSize.value);
  jumpPage.value = "";
};

// 监听 pageSize 变化
watch(
  () => props.pageSize,
  (newSize) => {
    innerPageSize.value = newSize;
  }
);
</script>
