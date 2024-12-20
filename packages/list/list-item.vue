<!-- ListItem 列表项组件 -->
<template>
  <div class="cozy-list-item">
    <!-- 列表项元信息 -->
    <div v-if="$slots.meta" class="cozy-list-item-meta">
      <slot name="meta">
        <!-- 头像 -->
        <div v-if="$slots.avatar" class="cozy-list-item-meta-avatar">
          <slot name="avatar"></slot>
        </div>
        <!-- 标题和描述 -->
        <div class="cozy-list-item-meta-content">
          <div v-if="$slots.title" class="cozy-list-item-meta-title">
            <slot name="title"></slot>
          </div>
          <div v-if="$slots.description" class="cozy-list-item-meta-description">
            <slot name="description"></slot>
          </div>
        </div>
      </slot>
    </div>

    <!-- 列表项内容 -->
    <div class="cozy-list-item-content">
      <slot></slot>
    </div>

    <!-- 列表项操作 -->
    <ul v-if="$slots.actions" class="cozy-list-item-actions">
      <li v-for="(action, index) in $slots.actions" :key="index">
        <slot :name="`actions-${index}`"></slot>
      </li>
    </ul>

    <!-- 列表项额外内容 -->
    <div v-if="$slots.extra" class="cozy-list-item-extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 定义组件名称
defineOptions({
  name: 'CListItem'
});
</script> 