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
        'cozy-list-empty': !loading && (!dataSource || dataSource.length === 0)
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

<script lang="ts" setup>
import { computed } from 'vue';
import CEmpty from '../empty';
import CPagination from '../pagination';

// 定义组件名称
defineOptions({
  name: 'CList'
});

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
}

// Props默认值
const props = withDefaults(defineProps<ListProps>(), {
  bordered: false,
  split: true,
  size: 'default',
  loading: false
});
</script> 