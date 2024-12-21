<!-- List 列表组件 -->
<template>
  <div
    class="cozy-list"
    :class="[
      `cozy-list-${size}`,
      {
        'cozy-list-split': split,
        'cozy-list-bordered': bordered,
        'cozy-list-loading': loading,
        'cozy-list-empty': !loading && (!dataSource || dataSource.length === 0),
        'cozy-list-vertical': itemLayout === 'vertical',
        'cozy-list-grid': grid
      }
    ]"
  >
    <!-- 列表头部 -->
    <div v-if="$slots.header || header" class="cozy-list-header">
      <slot name="header">{{ header }}</slot>
    </div>

    <!-- 列表内容 -->
    <div class="cozy-list-content">
      <div v-if="loading" class="cozy-list-loading-content">
        <slot name="loading">
          <div class="cozy-list-spin">
            <i class="cozy-icon c-loading-outlined"></i>
          </div>
        </slot>
      </div>
      <template v-else>
        <div v-if="!dataSource || dataSource.length === 0" class="cozy-list-empty-content">
          <slot name="empty">
            <CEmpty />
          </slot>
        </div>
        <template v-else>
          <!-- 栅格布局 -->
          <div v-if="grid" :class="gridClasses">
            <div
              v-for="(item, index) in dataSource"
              :key="item.key || index"
              :class="colClasses"
            >
              <div class="cozy-list-grid-item">
                <slot name="item" :item="item" :index="index">
                  {{ item }}
                </slot>
              </div>
            </div>
          </div>
          <!-- 普通列表布局 -->
          <ul v-else class="cozy-list-items">
            <li
              v-for="(item, index) in dataSource"
              :key="item.key || index"
              class="cozy-list-item"
            >
              <slot name="item" :item="item" :index="index">
                {{ item }}
              </slot>
            </li>
          </ul>
        </template>
      </template>
    </div>

    <!-- 列表底部 -->
    <div v-if="$slots.footer || footer" class="cozy-list-footer">
      <slot name="footer">{{ footer }}</slot>
    </div>

    <!-- 加载更多 -->
    <div v-if="pagination" class="cozy-list-pagination">
      <slot name="pagination">
        <CPagination v-bind="pagination" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CEmpty from '../empty';
import CPagination from '../pagination';

// 定义组件名称
defineOptions({
  name: 'CList'
});

// 栅格配置接口
interface GridConfig {
  gutter?: number;
  column?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

// 定义Props接口
interface ListProps {
  // 列表数据源
  dataSource?: any[];
  // 是否显示边框
  bordered?: boolean;
  // 是否展示分割线
  split?: boolean;
  // 列表大小
  size?: 'large' | 'default' | 'small';
  // 列表头部
  header?: string | number;
  // 列表底部
  footer?: string | number;
  // 当前是否处于加载状态
  loading?: boolean;
  // 对应的分页配置
  pagination?: Record<string, any>;
  // 栅格配置
  grid?: GridConfig;
  // 列表布局方式
  itemLayout?: 'horizontal' | 'vertical';
}

// Props默认值
const props = withDefaults(defineProps<ListProps>(), {
  bordered: false,
  split: true,
  size: 'default',
  loading: false,
  itemLayout: 'horizontal'
});

// 定义事件
const emit = defineEmits<{
  (e: 'change', page: number, pageSize: number): void;
}>();

// 计算栅格类名
const gridClasses = computed(() => {
  if (!props.grid) return '';
  const { gutter } = props.grid;
  return [
    'cozy-row',
    { [`cozy-row-gutter-${gutter}`]: gutter }
  ];
});

// 计算列类名
const colClasses = computed(() => {
  if (!props.grid) return '';
  const { column = 4, xs, sm, md, lg, xl, xxl } = props.grid;
  const span = 24 / column;
  return [
    'cozy-col',
    `cozy-col-${span}`,
    xs && `cozy-col-xs-${24 / xs}`,
    sm && `cozy-col-sm-${24 / sm}`,
    md && `cozy-col-md-${24 / md}`,
    lg && `cozy-col-lg-${24 / lg}`,
    xl && `cozy-col-xl-${24 / xl}`,
    xxl && `cozy-col-xxl-${24 / xxl}`
  ];
});
</script> 