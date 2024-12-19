<template>
  <div :class="panelClasses">
    <div 
      class="cozy-collapse-header" 
      :class="{ 'cozy-collapse-header-disabled': disabled }"
      @click="handleHeaderClick"
    >
      <div class="cozy-collapse-expand-icon" v-if="showExpandIcon">
        <i :class="{ 'is-active': isActive, [`cozy-icon ${expandIcon}`]: expandIcon,'cozy-icon c-right-outlined':!expandIcon }"></i>
      </div>
      <div class="cozy-collapse-header-text">
        <slot name="header">{{ header }}</slot>
      </div>
      <div class="cozy-collapse-extra" v-if="$slots.extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <transition
      name="cozy-collapse"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
      @leave="handleLeave"
    >
      <div class="cozy-collapse-content" v-show="isActive" ref="contentRef">
        <div class="cozy-collapse-content-box">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { collapseContextKey, type CollapseContext } from './types';

defineOptions({
  name: "CCollapsePanel",
});

const props = withDefaults(defineProps<{
  name: string | number;
  header?: string;
  disabled?: boolean;
  showExpandIcon?: boolean;
}>(), {
  disabled: false,
  showExpandIcon: true
});

const {
  activeKeys,
  togglePanel,
  accordion,
  expandIcon,
  expandIconPosition,
  size
} = inject(collapseContextKey) as CollapseContext;

const isActive = computed(() => activeKeys.value.includes(props.name));

const panelClasses = computed(() => [
  'cozy-collapse-panel',
  {
    'cozy-collapse-panel-active': isActive.value,
    'cozy-collapse-panel-disabled': props.disabled,
    [`cozy-collapse-panel-${size}`]: size !== 'default'
  }
]);

const handleHeaderClick = () => {
  if (props.disabled) {
    return;
  }
  togglePanel(props.name);
};

// 动画相关
const contentRef = ref<HTMLElement>();

const handleEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '0';
  element.style.opacity = '0';
  requestAnimationFrame(() => {
    element.style.height = `${contentRef.value?.scrollHeight}px`;
    element.style.opacity = '1';
  });
};

const handleAfterEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '';
  element.style.opacity = '';
};

const handleLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = `${element.scrollHeight}px`;
  requestAnimationFrame(() => {
    element.style.height = '0';
    element.style.opacity = '0';
  });
};
</script> 