<template>
  <div
    :class="[
      'cozy-divider',
      `cozy-divider-${type}`,
      {
        'cozy-divider-with-text': !!$slots.default,
        [`cozy-divider-with-text-${orientation}`]: !!$slots.default,
        'cozy-divider-dashed': dashed,
        'cozy-divider-plain': plain,
      },
    ]"
  >
    <span v-if="$slots.default" class="cozy-divider-inner-text">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

// 定义组件名称
defineOptions({
  name: "CDivider",
});

// 定义属性类型
interface DividerProps {
  type?: 'horizontal' | 'vertical'
  orientation?: 'left' | 'right' | 'center'
  dashed?: boolean
  plain?: boolean
}

withDefaults(defineProps<DividerProps>(), {
  type: "horizontal",
  orientation: "center",
  dashed: false,
  plain: false,
});
</script>
