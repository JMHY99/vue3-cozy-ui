<template>
  <div
    :class="[
      'cozy-card',
      {
        'cozy-card-bordered': bordered,
        'cozy-card-hoverable': hoverable,
        'cozy-card-small': size === 'small',
        'cozy-card-loading': loading,
        [`cozy-card-${type}`]: type
      }
    ]"
  >
    <!-- 封面图片 -->
    <div v-if="$slots.cover" class="cozy-card-cover">
      <slot name="cover"></slot>
    </div>

    <!-- 卡片头部 -->
    <div v-if="$slots.title || title || $slots.extra" class="cozy-card-head">
      <div class="cozy-card-head-wrapper">
        <!-- 标题 -->
        <div v-if="$slots.title || title" class="cozy-card-head-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <!-- 右侧额外内容 -->
        <div v-if="$slots.extra" class="cozy-card-extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </div>

    <!-- 卡片内容 -->
    <div class="cozy-card-body">
      <template v-if="loading">
        <div class="cozy-card-loading-content">
          <p v-for="i in 4" :key="i">
            <span
              v-for="j in 4"
              :key="j"
              class="cozy-card-loading-block"
              :style="{ width: `${Math.floor(Math.random() * 50 + 30)}%` }"
            />
          </p>
        </div>
      </template>
      <slot v-else />
    </div>

    <!-- 卡片操作区域 -->
    <ul v-if="$slots.actions" class="cozy-card-actions">
      <li v-for="(action, index) in $slots.actions" :key="index">
        <span>
          <component :is="action" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CCard'
})

interface Props {
  /** 标题 */
  title?: string
  /** 是否有边框 */
  bordered?: boolean
  /** 卡片大小 */
  size?: 'default' | 'small'
  /** 卡片类型 */
  type?: string
  /** 是否可悬浮 */
  hoverable?: boolean
  /** 加载状态 */
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  bordered: true,
  size: 'default',
  type: '',
  hoverable: false,
  loading: false
})
</script>
