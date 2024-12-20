<!-- Table 表格组件 -->
<template>
  <div
    :class="[
      'cozy-table-wrapper',
      {
        'cozy-table-wrapper-rtl': direction === 'rtl',
      },
    ]"
  >
    <div
      :class="[
        'cozy-table',
        {
          [`cozy-table-${size}`]: size,
          'cozy-table-bordered': bordered,
          'cozy-table-fixed-header': scroll?.y,
          'cozy-table-fixed-column': scroll?.x,
          'cozy-table-has-fix-left': leftFixedColumns.length > 0,
          'cozy-table-has-fix-right': rightFixedColumns.length > 0,
          'cozy-table-empty': !loading && !data?.length,
        },
      ]"
    >
      <!-- 表格标题 -->
      <div v-if="title || $slots.title" class="cozy-table-title">
        <slot name="title">{{ title }}</slot>
      </div>

      <!-- 表格内容区域 -->
      <div class="cozy-table-container">
        <!-- 表头 -->
        <div
          ref="headerRef"
          class="cozy-table-header"
          :style="headerScrollBarStyle"
        >
          <table
            :style="tableStyle"
            :class="{ 'cozy-table-fixed': scroll?.x }"
          >
            <colgroup>
              <col
                v-for="(column, index) in flattenColumns"
                :key="column.key || column.dataIndex || index"
                :style="{ width: column.width, minWidth: column.width }"
              />
            </colgroup>
            <thead class="cozy-table-thead">
              <tr>
                <th
                  v-for="(column, colIndex) in flattenColumns"
                  :key="column.key || column.dataIndex || colIndex"
                  :class="getHeaderCellClass(column)"
                  :style="getHeaderCellStyle(column)"
                >
                  <div class="cozy-table-cell">
                    <template v-if="column.slots?.title">
                      <slot
                        :name="column.slots.title"
                        :column="column"
                        :index="colIndex"
                      ></slot>
                    </template>
                    <template v-else>
                      {{ column.title }}
                    </template>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        </div>

        <!-- 表格主体 -->
        <div
          ref="bodyRef"
          class="cozy-table-body"
          :style="bodyStyle"
          @scroll="handleBodyScroll"
        >
          <table :style="tableStyle">
            <colgroup>
              <col
                v-for="(column, index) in flattenColumns"
                :key="column.key || column.dataIndex || index"
                :style="{ width: column.width, minWidth: column.width }"
              />
            </colgroup>
            <tbody class="cozy-table-tbody">
              <template v-if="data?.length">
                <tr
                  v-for="(record, rowIndex) in data"
                  :key="getRowKey(record, rowIndex)"
                  :class="getRowClass(record, rowIndex)"
                  @click="handleRowClick(record, rowIndex, $event)"
                >
                  <td
                    v-for="(column, colIndex) in flattenColumns"
                    :key="column.key || column.dataIndex || colIndex"
                    :class="getCellClass(column, record, rowIndex)"
                  >
                    <div class="cozy-table-cell">
                      <template v-if="column.slots?.customRender">
                        <slot
                          :name="column.slots.customRender"
                          :text="getColumnValue(record, column)"
                          :record="record"
                          :index="rowIndex"
                          :column="column"
                        ></slot>
                      </template>
                      <template v-else>
                        {{ getColumnValue(record, column) }}
                      </template>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr class="cozy-table-empty-row">
                  <td
                    :colspan="flattenColumns.length"
                    class="cozy-table-cell cozy-table-empty-cell"
                  >
                    <slot name="empty">
                      <div class="cozy-table-empty-content">
                        <c-icon name="inbox" />
                        <p>暂无数据</p>
                      </div>
                    </slot>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 表格页脚 -->
      <div v-if="footer || $slots.footer" class="cozy-table-footer">
        <slot name="footer">{{ footer }}</slot>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="cozy-table-loading">
        <div class="cozy-table-loading-content">
          <c-icon name="loading" />
        </div>
      </div>
    </div>

    <!-- 分页器 -->
    <div v-if="pagination" class="cozy-table-pagination">
      <c-pagination
        v-model:current="paginationState.current"
        v-model:pageSize="paginationState.pageSize"
        :total="paginationState.total"
        v-bind="pagination"
        @change="handlePageChange"
      />
    </div>

    <!-- 渲染 c-table-column 组件 -->
    <div style="display: none">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick, provide, useSlots } from 'vue';
import type { TableColumnType, TableProps, SorterResult, TablePaginationConfig } from './interface';

/** 表格大小类型 */
type TableSize = 'large' | 'middle' | 'small';

/** 表格方向类型 */
type TableDirection = 'ltr' | 'rtl';

/** Props 定义 */
const props = withDefaults(
  defineProps<{
    /** 表格列的配置描述 */
    columns?: TableColumnType[];
    /** 数据数组 */
    data?: any[];
    /** 表格行 key 的取值 */
    rowKey?: string | ((record: any) => string);
    /** 表格大小 */
    size?: TableSize;
    /** 是否展示外边框和列边框 */
    bordered?: boolean;
    /** 表格标题 */
    title?: string;
    /** 表格尾部 */
    footer?: string;
    /** 页面是否加载中 */
    loading?: boolean;
    /** 分页器配置 */
    pagination?: false | TablePaginationConfig;
    /** 是否固定表头 */
    scroll?: { x?: number | string | true; y?: number | string };
    /** 表格行的类名 */
    rowClassName?: string | ((record: any, index: number) => string);
    /** 表格行的样式 */
    rowStyle?: Record<string, string | number> | ((record: any, index: number) => Record<string, string | number>);
    /** 表格单元格的类名 */
    cellClassName?: string | ((record: any, index: number) => string);
    /** 表格单元格的样式 */
    cellStyle?: Record<string, string | number> | ((record: any, index: number) => Record<string, string | number>);
    /** 表格的方向 */
    direction?: TableDirection;
  }>(),
  {
    size: 'middle',
    bordered: false,
    loading: false,
    direction: 'ltr',
  }
);

/** Emits 定义 */
const emit = defineEmits<{
  /** 分页、排序、筛选变化时触发 */
  (e: 'change', pagination: TablePaginationConfig, filters: Record<string, any>, sorter: SorterResult, extra: { action: 'paginate' | 'sort' | 'filter' }): void;
  /** 点击行时触发 */
  (e: 'row-click', record: any, index: number, event: Event): void;
}>();

// 组件引用
const headerRef = ref<HTMLDivElement>();
const bodyRef = ref<HTMLDivElement>();

// 内部状态
const sortState = ref<{
  column?: TableColumnType;
  order?: 'ascend' | 'descend' | null;
}>({});

const paginationState = ref<TablePaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  ...props.pagination,
});

// 获取插槽
const slots = useSlots();

// 提供注册列的方法
const columns = ref<TableColumnType[]>([]);

const registerColumn = (column: TableColumnType) => {
  columns.value.push(column);
};

const unregisterColumn = (column: TableColumnType) => {
  const index = columns.value.findIndex(
    col => col.dataIndex === column.dataIndex
  );
  if (index !== -1) {
    columns.value.splice(index, 1);
  }
};

provide('registerColumn', registerColumn);
provide('unregisterColumn', unregisterColumn);

// 合并 props.columns 和动态注册的列
const mergedColumns = computed(() => {
  if (columns.value.length) {
    return columns.value;
  }
  return props.columns || [];
});

// 计算属性
/** 展平的列配置 */
const flattenColumns = computed(() => {
  const flatten = (columns: TableColumnType[]): TableColumnType[] => {
    return columns.reduce<TableColumnType[]>((acc, column) => {
      if (column.children) {
        return [...acc, ...flatten(column.children)];
      }
      return [...acc, column];
    }, []);
  };
  return flatten(mergedColumns.value);
});

/** 分组后的列配置（用于表头渲染） */
const groupedColumns = computed(() => {
  const maxLevel = (columns: TableColumnType[]): number => {
    return columns.reduce((max, column) => {
      if (column.children) {
        return Math.max(max, maxLevel(column.children) + 1);
      }
      return max;
    }, 1);
  };

  const fillRowSpan = (columns: TableColumnType[], level: number, levels: number): TableColumnType[] => {
    return columns.map(column => {
      const newColumn = { ...column };
      if (newColumn.children) {
        newColumn.children = fillRowSpan(newColumn.children, level + 1, levels);
        newColumn.colSpan = newColumn.children.reduce((sum, child) => sum + (child.colSpan || 1), 0);
        newColumn.rowSpan = 1;
      } else {
        newColumn.colSpan = 1;
        newColumn.rowSpan = levels - level;
      }
      return newColumn;
    });
  };

  const levels = maxLevel(mergedColumns.value);
  return fillRowSpan(mergedColumns.value, 0, levels);
});

/** 左侧固定列 */
const leftFixedColumns = computed(() => {
  return flattenColumns.value.filter(column => column.fixed === 'left');
});

/** 右侧固定列 */
const rightFixedColumns = computed(() => {
  return flattenColumns.value.filter(column => column.fixed === 'right');
});

/** 表格样式 */
const tableStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.scroll?.x) {
    style.width = typeof props.scroll.x === 'number' ? `${props.scroll.x}px` : props.scroll.x as string;
  }
  return style;
});

/** 表头滚动条样式 */
const headerScrollBarStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.scroll?.y) {
    style.overflowY = 'scroll';
    style.maxHeight = typeof props.scroll.y === 'number' ? `${props.scroll.y}px` : props.scroll.y as string;
  }
  return style;
});

/** 表格主体样式 */
const bodyStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.scroll?.y) {
    style.maxHeight = typeof props.scroll.y === 'number' ? `${props.scroll.y}px` : props.scroll.y as string;
    style.overflowY = 'scroll';
  }
  if (props.scroll?.x) {
    style.overflowX = 'auto';
  }
  return style;
});

// 方法定义
/** 获取行的唯一标识 */
const getRowKey = (record: any, index: number): string => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(record);
  }
  if (typeof props.rowKey === 'string') {
    return record[props.rowKey];
  }
  return String(index);
};

/** 获取列的值 */
const getColumnValue = (record: any, column: TableColumnType): any => {
  if (!column.dataIndex) return undefined;
  return record[column.dataIndex];
};

/** 渲染单元格内容 */
const renderCell = (column: TableColumnType, record: any, rowIndex: number) => {
  const value = getColumnValue(record, column);

  if (column.slots?.customRender) {
    return slots[column.slots.customRender]?.({
      text: value,
      record,
      index: rowIndex,
      column
    }) || value;
  }

  return value;
};

/** 获取表头单元格类名 */
const getHeaderCellClass = (column: TableColumnType): string[] => {
  const classes = ['cozy-table-cell'];
  if (column.align) {
    classes.push(`cozy-table-cell-${column.align}`);
  }
  if (column.fixed === 'left') {
    classes.push('cozy-table-cell-fix-left');
  }
  if (column.fixed === 'right') {
    classes.push('cozy-table-cell-fix-right');
  }
  if (column.sorter) {
    classes.push('cozy-table-column-sort');
  }
  return classes;
};

/** 获取表头单元格样式 */
const getHeaderCellStyle = (column: TableColumnType): Record<string, string> => {
  const style: Record<string, string> = {};
  if (column.width) {
    style.width = typeof column.width === 'number' ? `${column.width}px` : column.width as string;
  }
  return style;
};

/** 获取行的类名 */
const getRowClass = (record: any, index: number): string[] => {
  const classes = ['cozy-table-row'];
  if (typeof props.rowClassName === 'function') {
    classes.push(props.rowClassName(record, index));
  } else if (props.rowClassName) {
    classes.push(props.rowClassName);
  }
  return classes;
};

/** 获取单元格的类名 */
const getCellClass = (column: TableColumnType, record: any, index: number): string[] => {
  const classes = ['cozy-table-cell'];
  if (column.align) {
    classes.push(`cozy-table-cell-${column.align}`);
  }
  if (typeof props.cellClassName === 'function') {
    classes.push(props.cellClassName(record, index));
  } else if (props.cellClassName) {
    classes.push(props.cellClassName);
  }
  return classes;
};

/** 处理排序 */
const handleSort = (column: TableColumnType) => {
  if (!column.sorter) return;

  let order: 'ascend' | 'descend' | null = null;
  if (sortState.value.column === column) {
    if (sortState.value.order === 'ascend') {
      order = 'descend';
    } else if (sortState.value.order === 'descend') {
      order = null;
    } else {
      order = 'ascend';
    }
  } else {
    order = 'ascend';
  }

  sortState.value = { column, order };

  const sorter: SorterResult = {
    column,
    order,
    field: column.dataIndex,
    columnKey: column.key,
  };

  emit('change', paginationState.value, {}, sorter, { action: 'sort' });
};

/** 处理筛选 */
const handleFilter = (column: TableColumnType) => {
  // TODO: 实现筛选功能
};

/** 处理行点击 */
const handleRowClick = (record: any, index: number, event: Event) => {
  emit('row-click', record, index, event);
};

/** 处理表格滚动 */
const handleBodyScroll = (e: Event) => {
  if (headerRef.value) {
    headerRef.value.scrollLeft = (e.target as HTMLElement).scrollLeft;
  }
};

/** 处理分页变化 */
const handlePageChange = (page: number, pageSize: number) => {
  paginationState.value.current = page;
  paginationState.value.pageSize = pageSize;
  emit('change', paginationState.value, {}, sortState.value, { action: 'paginate' });
};

// 监听数据变化
watch(
  () => props.data,
  () => {
    if (props.pagination && props.data) {
      paginationState.value.total = props.data.length;
    }
  },
  { immediate: true }
);

// 组件挂载后
onMounted(() => {
  nextTick(() => {
    if (props.scroll?.x || props.scroll?.y) {
      handleBodyScroll({ target: bodyRef.value } as any);
    }
  });
});

defineOptions({
  name: 'CTable',
});
</script>
