<template>
  <div class="cozy-comment">
    <!-- 评论头部 -->
    <div class="cozy-comment-inner">
      <!-- 头像 -->
      <div class="cozy-comment-avatar">
        <slot name="avatar">
          <img :src="avatar" v-if="avatar" />
        </slot>
      </div>

      <!-- 评论内容 -->
      <div class="cozy-comment-content">
        <!-- 作者和时间 -->
        <div class="cozy-comment-content-author">
          <span class="cozy-comment-content-author-name">
            <slot name="author">{{ author }}</slot>
          </span>
          <span class="cozy-comment-content-author-time" v-if="datetime || $slots.datetime">
            <slot name="datetime">{{ datetime }}</slot>
          </span>
        </div>

        <!-- 评论内容 -->
        <div class="cozy-comment-content-detail">
          <slot name="content">{{ content }}</slot>
        </div>

        <!-- 评论操作 -->
        <ul class="cozy-comment-actions" v-if="$slots.actions">
          <li v-for="(action, index) in $slots.actions?.length" :key="index">
            <slot name="actions" :index="index"></slot>
          </li>
        </ul>
      </div>
    </div>

    <!-- 嵌套评论 -->
    <div class="cozy-comment-nested" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * Comment 评论组件
 * @description 对网站内容的反馈、评价和讨论
 */

defineOptions({
  name: 'CComment'
})

// Props 定义
const props = withDefaults(defineProps<{
  /** 要显示的作者名称 */
  author?: string
  /** 要显示的头像地址 */
  avatar?: string
  /** 评论的主要内容 */
  content?: string
  /** 展示时间描述 */
  datetime?: string
}>(), {})
</script> 