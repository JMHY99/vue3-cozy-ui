<template>
  <div
    ref="containerRef"
    class="cozy-v-table"
  >
    <!-- 表头区域 -->
    <div class="cozy-v-table-header" ref="headerRef">
      <div 
        class="cozy-v-table-header-inner"
        :style="{ transform: `translateX(${-scrollLeft}px)` }"
      >
        <table>
          <colgroup>
            <col 
              v-for="column in allColumns" 
              :key="column.key"
              :style="{ width: column.width || '200px', minWidth: column.width || '200px' }"
            >
          </colgroup>
          <thead>
            <tr>
              <th 
                v-for="column in allColumns" 
                :key="column.key"
                :class="[
                  'cozy-v-table-cell',
                  column.align ? `cozy-v-table-cell-${column.align}` : '',
                  column.fixed ? `cozy-v-table-cell-fixed-${column.fixed}` : ''
                ]"
                :style="getFixedStyle(column)"
              >
                <slot :name="'header-' + column.key" :column="column">
                  {{ column.title }}
                </slot>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      
      <!-- 固定列阴影 -->
      <div 
        v-if="hasFixedLeft && scrollLeft > 0" 
        class="cozy-v-table-fixed-left-shadow"
      ></div>
      <div 
        v-if="hasFixedRight && scrollLeft < maxScrollLeft" 
        class="cozy-v-table-fixed-right-shadow"
      ></div>
    </div>

    <!-- 表格内容区域 -->
    <div 
      ref="bodyRef"
      class="cozy-v-table-body"
      :style="{ height: height + 'px' }"
      @scroll="handleScroll"
    >
      <!-- 用于撑开滚动区域 -->
      <div 
        class="cozy-v-table-phantom" 
        :style="{ 
          height: totalHeight + 'px',
          width: totalWidth + 'px'
        }"
      ></div>
      
      <!-- 实际渲染的表格内容 -->
      <div
        class="cozy-v-table-content"
        :style="{ 
          transform: `translate3d(${-scrollLeft}px, ${offset}px, 0)`,
          width: totalWidth + 'px'
        }"
      >
        <table>
          <colgroup>
            <col 
              v-for="column in allColumns" 
              :key="column.key"
              :style="{ width: column.width || '200px', minWidth: column.width || '200px' }"
            >
          </colgroup>
          <tbody>
            <tr
              v-for="(row, index) in visibleData"
              :key="rowKey ? row[rowKey] : index"
              :class="[
                'cozy-v-table-row',
                { 'cozy-v-table-row-striped': stripe && (startIndex + index) % 2 === 1 }
              ]"
              @click="handleRowClick(row, startIndex + index)"
            >
              <td
                v-for="column in allColumns"
                :key="column.key"
                :class="[
                  'cozy-v-table-cell',
                  column.align ? `cozy-v-table-cell-${column.align}` : '',
                  column.fixed ? `cozy-v-table-cell-fixed-${column.fixed}` : ''
                ]"
                :style="getFixedStyle(column)"
              >
                <slot 
                  :name="column.key" 
                  :row="row" 
                  :column="column" 
                  :index="startIndex + index"
                >
                  {{ row[column.key] }}
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 固定列阴影 -->
      <div 
        v-if="hasFixedLeft && scrollLeft > 0" 
        class="cozy-v-table-fixed-left-shadow"
      ></div>
      <div 
        v-if="hasFixedRight && scrollLeft < maxScrollLeft" 
        class="cozy-v-table-fixed-right-shadow"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

// 定义组件名称
defineOptions({
  name: 'CVTable'
});

// 定义列接口
interface Column {
  key: string;
  title: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

// 定义Props接口
interface Props {
  // 表格数据
  data: any[];
  // 表格列配置
  columns: Column[];
  // 行高
  rowHeight?: number;
  // 容器高度
  height?: number;
  // 纵向缓冲区大小
  bufferSize?: number;
  // 行数据的key
  rowKey?: string;
  // 是否显示斑马纹
  stripe?: boolean;
}

// 定义Props默认值
const props = withDefaults(defineProps<Props>(), {
  rowHeight: 48,
  height: 400,
  bufferSize: 20,
  stripe: false
});

// 定义事件
const emit = defineEmits<{
  'row-click': [row: any, index: number];
  'scroll': [{ scrollLeft: number, scrollTop: number }];
}>();

// DOM引用
const containerRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const bodyRef = ref<HTMLElement | null>(null);

// 滚动位置
const scrollTop = ref(0);
const scrollLeft = ref(0);

// 处理固定列
const leftFixedColumns = computed(() => 
  props.columns.filter(col => col.fixed === 'left')
);

const rightFixedColumns = computed(() => 
  props.columns.filter(col => col.fixed === 'right')
);

const normalColumns = computed(() => 
  props.columns.filter(col => !col.fixed)
);

const allColumns = computed(() => [
  ...leftFixedColumns.value,
  ...normalColumns.value,
  ...rightFixedColumns.value
]);

const hasFixedLeft = computed(() => leftFixedColumns.value.length > 0);
const hasFixedRight = computed(() => rightFixedColumns.value.length > 0);

// 计算列宽度
const getColumnWidth = (column: Column) => {
  if (typeof column.width === 'number') {
    return column.width;
  }
  if (typeof column.width === 'string') {
    if (column.width.endsWith('px')) {
      return parseInt(column.width);
    }
  }
  return 200; // 默认宽度
};

// 计算总宽度
const totalWidth = computed(() => {
  return allColumns.value.reduce((width, column) => {
    return width + getColumnWidth(column);
  }, 0);
});

// 计算最大滚动距离
const maxScrollLeft = computed(() => {
  if (!bodyRef.value) return 0;
  return Math.max(0, totalWidth.value - bodyRef.value.clientWidth);
});

// 计算固定列样式
const getFixedStyle = (column: Column) => {
  if (!column.fixed) return {};

  const style: Record<string, string> = {
    position: 'sticky'
  };

  if (column.fixed === 'left') {
    let left = 0;
    for (const col of leftFixedColumns.value) {
      if (col.key === column.key) break;
      left += getColumnWidth(col);
    }
    style.left = `${left}px`;
  }

  if (column.fixed === 'right') {
    let right = 0;
    for (const col of rightFixedColumns.value.slice().reverse()) {
      if (col.key === column.key) break;
      right += getColumnWidth(col);
    }
    style.right = `${right}px`;
  }

  return style;
};

// 计算总高度
const totalHeight = computed(() => props.data.length * props.rowHeight);

// 计算可视区域能显示的行数
const visibleCount = computed(() => {
  if (!bodyRef.value) return 0;
  return Math.ceil(bodyRef.value.clientHeight / props.rowHeight);
});

// 计算起始索引
const startIndex = computed(() => {
  const start = Math.floor(scrollTop.value / props.rowHeight);
  return Math.max(0, start - props.bufferSize);
});

// 计算结束索引
const endIndex = computed(() => {
  const end = startIndex.value + visibleCount.value + props.bufferSize * 2;
  return Math.min(props.data.length, end);
});

// 计算偏移量
const offset = computed(() => startIndex.value * props.rowHeight);

// 计算可视区域数据
const visibleData = computed(() => {
  return props.data.slice(startIndex.value, endIndex.value);
});

// 处理滚动事件
const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  scrollTop.value = target.scrollTop;
  scrollLeft.value = target.scrollLeft;

  // 同步表头滚动
  if (headerRef.value) {
    headerRef.value.scrollLeft = target.scrollLeft;
  }

  emit('scroll', {
    scrollLeft: target.scrollLeft,
    scrollTop: target.scrollTop
  });
};

// 处理行点击事件
const handleRowClick = (row: any, index: number) => {
  emit('row-click', row, index);
};

// 监听数据变化
watch(
  () => props.data,
  () => {
    scrollTop.value = 0;
    scrollLeft.value = 0;
    if (bodyRef.value) {
      bodyRef.value.scrollTop = 0;
      bodyRef.value.scrollLeft = 0;
    }
  }
);

// 组件挂载后初始化
onMounted(() => {
  if (bodyRef.value) {
    bodyRef.value.style.height = `${props.height}px`;
  }
});

// 暴露方法
defineExpose({
  // 滚动到指定索引的行
  scrollToIndex: (index: number) => {
    if (bodyRef.value) {
      bodyRef.value.scrollTop = index * props.rowHeight;
    }
  },
  // 滚动到指定位置
  scrollTo: (options: { left?: number; top?: number }) => {
    if (bodyRef.value) {
      if (typeof options.left === 'number') {
        bodyRef.value.scrollLeft = options.left;
      }
      if (typeof options.top === 'number') {
        bodyRef.value.scrollTop = options.top;
      }
    }
  }
});
</script> 