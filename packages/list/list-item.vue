<!-- ListItem 列表项组件 -->
<template>
  <div class="cozy-list-item">
    <!-- 列表项元信息 -->
    <div v-if="$slots.meta" class="cozy-list-item-meta">
      <slot name="meta"></slot>
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

<script setup lang="ts">
// 定义组件名称
defineOptions({
  name: 'CListItem'
});
</script> 