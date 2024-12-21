<template>
  <div v-if="loading">
    <div 
      class="cozy-skeleton" 
      :class="{
        'cozy-skeleton-active': active,
        'cozy-skeleton-with-avatar': avatar,
        'cozy-skeleton-with-paragraph': paragraph,
        'cozy-skeleton-round': round
      }"
    >
      <!-- Avatar 骨架 -->
      <div 
        v-if="avatar" 
        class="cozy-skeleton-avatar"
        :class="{
          [`cozy-skeleton-avatar-${avatarSize}`]: avatarSize
        }"
      ></div>

      <div class="cozy-skeleton-content">
        <!-- Title 骨架 -->
        <h3 
          v-if="title" 
          class="cozy-skeleton-title"
          :style="{ width: titleWidth }"
        ></h3>

        <!-- Paragraph 骨架 -->
        <ul 
          v-if="paragraph" 
          class="cozy-skeleton-paragraph"
        >
          <li 
            v-for="(_, index) in paragraphRows" 
            :key="index"
            :style="{ width: getParagraphWidth(index) }"
          ></li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// 定义组件名称
defineOptions({
  name: 'CSkeleton',
});

// 定义组件属性
const props = withDefaults(defineProps<{
  /** 是否展示动画效果 */
  active?: boolean;
  /** 是否显示头像占位图 */
  avatar?: boolean;
  /** 头像占位图大小 */
  avatarSize?: 'large' | 'small' | 'default';
  /** 是否显示标题占位图 */
  title?: boolean;
  /** 标题占位图宽度 */
  titleWidth?: string | number;
  /** 是否显示段落占位图 */
  paragraph?: boolean;
  /** 段落占位图行数 */
  paragraphRows?: number;
  /** 段落占位图宽度，可以是数组来指定每一行的宽度 */
  paragraphWidth?: string | number | (string | number)[];
  /** 是否显示圆形占位图 */
  round?: boolean;
  /** 是否显示加载中状态 */
  loading?: boolean;
}>(), {
  active: false,
  avatar: false,
  avatarSize: 'default',
  title: true,
  titleWidth: '40%',
  paragraph: true,
  paragraphRows: 3,
  paragraphWidth: '100%',
  round: false,
  loading: true,
});

// 计算段落宽度
const getParagraphWidth = (index: number) => {
  if (Array.isArray(props.paragraphWidth)) {
    return props.paragraphWidth[index] || '100%';
  }
  
  // 最后一行宽度为 60%
  if (index === props.paragraphRows - 1) {
    return '60%';
  }
  
  return props.paragraphWidth;
};
</script> 