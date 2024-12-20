<!-- TabPane 标签页面板组件 -->
<template>
  <div
    v-show="active"
    role="tabpanel"
    :class="[
      'cozy-tabs-tabpane',
      {
        'cozy-tabs-tabpane-disabled': disabled
      }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';

// Props 定义
const props = withDefaults(
  defineProps<{
    /** 选项卡头显示文字 */
    tab?: string;
    /** 对应 activeKey */
    name: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否可关闭 */
    closable?: boolean;
    /** 选项卡链接 */
    href?: string;
    /** 选项卡前缀图标 */
    prefixIcon?: string;
  }>(),
  {
    disabled: false,
  }
);

// 注入的上下文
const { activeKey } = inject('tabs', { activeKey: computed(() => '') }) as {
  activeKey: any;
};

// 计算属性
const active = computed(() => activeKey.value === props.name);

defineOptions({
  name: 'CTabPane',
});
</script>
