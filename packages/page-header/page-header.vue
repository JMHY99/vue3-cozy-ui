<template>
  <div class="cozy-page-header">
    <!-- 返回区域 -->
    <div v-if="back || $slots.back" class="cozy-page-header-back" @click="handleBack">
      <slot name="back">
        <i class="cozy-icon-left"></i>
        <div v-if="back" class="cozy-page-header-back-text">{{ back }}</div>
      </slot>
    </div>

    <div class="cozy-page-header-heading">
      <!-- 标题前的图标 -->
      <span v-if="$slots.avatar" class="cozy-page-header-avatar">
        <slot name="avatar"></slot>
      </span>

      <!-- 标题区域 -->
      <span class="cozy-page-header-title">
        <slot name="title">{{ title }}</slot>
      </span>

      <!-- 子标题 -->
      <span v-if="subtitle || $slots.subtitle" class="cozy-page-header-subtitle">
        <slot name="subtitle">{{ subtitle }}</slot>
      </span>

      <!-- 标题右侧的额外内容 -->
      <span v-if="$slots.tags" class="cozy-page-header-tags">
        <slot name="tags"></slot>
      </span>

      <span v-if="$slots.extra" class="cozy-page-header-extra">
        <slot name="extra"></slot>
      </span>
    </div>

    <!-- 内容区域 -->
    <div v-if="$slots.default" class="cozy-page-header-content">
      <slot></slot>
    </div>

    <!-- 底部区域 -->
    <div v-if="$slots.footer" class="cozy-page-header-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "CPageHeader",
});

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  back: {
    type: String,
    default: "",
  },
  ghost: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["back"]);

const handleBack = () => {
  emit("back");
};
</script> 