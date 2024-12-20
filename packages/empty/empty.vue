<template>
  <div class="cozy-empty">
    <div class="cozy-empty-image">
      <slot name="image">
        <img v-if="image" :src="image" :alt="description" />
        <img v-else src="./empty02.svg" alt="empty" />
      </slot>
    </div>
    <div class="cozy-empty-description">
      <slot name="description">
        {{ description || '暂无数据' }}
      </slot>
    </div>
    <div v-if="$slots.default" class="cozy-empty-footer">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'CEmpty'
})

interface EmptyProps {
  /** 自定义显示图片 */
  image?: string
  /** 自定义描述内容 */
  description?: string | null
  /** 图片样式 */
  imageStyle?: object
}

withDefaults(defineProps<EmptyProps>(), {
  image: '',
  description: null,
  imageStyle: () => ({})
})
</script> 