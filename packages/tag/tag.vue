<!-- Tag 标签组件 -->
<template>
  <transition name="cozy-zoom-fade" @after-leave="handleAfterClose">
    <span
      v-if="!closed"
      :class="[
        'cozy-tag',
        `cozy-tag-${color || type || ''}`,
        {
          'cozy-tag-has-color': isPresetColor || isCustomColor,
          'cozy-tag-checkable': checkable,
          'cozy-tag-checked': checked,
          'cozy-tag-bordered': bordered
        }
      ]"
      :style="tagStyle"
      @click="handleClick"
    >
      <!-- 图标 -->
      <c-icon v-if="icon" :name="icon" class="cozy-tag-icon" />
      <!-- 内容 -->
      <slot></slot>
      <!-- 关闭按钮 -->
      <i
        v-if="closable"
        class="cozy-icon c-close-outlined cozy-tag-close-icon"
        @click.stop="handleClose"
      ></i>
    </span>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

/** 预设颜色列表 */
const PresetColorList = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
  'success',
  'processing',
  'error',
  'warning',
  'default',
] as const;

/** Tag 预设颜色类型 */
type PresetColorType = typeof PresetColorList[number];

/** Tag 类型 */
type TagType = 'success' | 'processing' | 'error' | 'warning' | 'default';

// Props 定义
const props = withDefaults(
  defineProps<{
    /** 标签边框 */
    bordered?: boolean;
    /** 标签是否可关闭 */
    closable?: boolean;
    /** 标签色 */
    color?: string;
    /** 图标 */
    icon?: string;
    /** 标签类型 */
    type?: TagType;
    /** 是否可选中 */
    checkable?: boolean;
    /** 是否选中 */
    checked?: boolean;
  }>(),
  {
    bordered: true,
    closable: false,
    checkable: false,
    checked: false,
  }
);

// Emits 定义
const emit = defineEmits<{
  /** 关闭时的回调 */
  (e: 'close', event: MouseEvent): void;
  /** 点击标签时的回调 */
  (e: 'click', event: MouseEvent): void;
  /** 更新选中状态 */
  (e: 'update:checked', checked: boolean): void;
  /** 关闭动画结束后的回调 */
  (e: 'afterClose'): void;
}>();

// 内部状态
const closed = ref(false);

// 计算属性
/** 是否是预设颜色 */
const isPresetColor = computed(() => {
  if (!props.color) return false;
  return PresetColorList.includes(props.color as PresetColorType);
});

/** 是否是自定义颜色 */
const isCustomColor = computed(() => {
  if (!props.color) return false;
  return !isPresetColor.value && props.color.match(/^#/);
});

/** 标签样式 */
const tagStyle = computed(() => {
  if (!props.color) return {};
  if (isPresetColor.value) return {};

  return {
    backgroundColor: props.color,
    borderColor: props.color,
    color: '#fff',
  };
});

// 方法定义
/** 处理点击事件 */
const handleClick = (event: MouseEvent) => {
  if (props.checkable) {
    emit('update:checked', !props.checked);
  }
  emit('click', event);
};

/** 处理关闭事件 */
const handleClose = (event: MouseEvent) => {
  event.stopPropagation();
  closed.value = true;
  emit('close', event);
};

/** 处理关闭动画结束 */
const handleAfterClose = () => {
  emit('afterClose');
};

defineOptions({
  name: 'CTag',
});
</script>
