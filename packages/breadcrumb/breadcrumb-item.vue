<template>
  <span class="cozy-breadcrumb-item">
    <span
      :class="[
        'cozy-breadcrumb-item-content',
        { 'cozy-breadcrumb-item-link': to },
      ]"
      @click="handleClick"
    >
      <slot></slot>
    </span>
    <span v-if="!isLast" class="cozy-breadcrumb-item-separator">
      <slot name="separator">
        <span v-if="separatorIcon">
          <i :class="`cozy-icon ${separatorIcon}`"></i>
        </span>
        <span v-else>{{ separator }}</span>
      </slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import {
  inject,
  computed,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";

// 定义组件名称
defineOptions({
  name: "CBreadcrumbItem",
});

const props = withDefaults(
  defineProps<{
    to?: string | Record<string, any>;
    replace?: boolean;
  }>(),
  {
    replace: false,
  }
);

const emit = defineEmits(["click"]);

const separator = inject("breadcrumbSeparator", "/");
const separatorIcon = inject("breadcrumbSeparatorIcon", "");
const addItem = inject("breadcrumbAddItem", (item: any) => {});
const removeItem = inject("breadcrumbRemoveItem", (item: any) => {});
const isLastItem = inject("breadcrumbIsLastItem", (item: any) => false);

const instance = getCurrentInstance();
const isLast = computed(() => {
  if (!instance) return false;
  return isLastItem(instance);
});

onMounted(() => {
  if (instance) {
    addItem(instance);
  }
});

onBeforeUnmount(() => {
  if (instance) {
    removeItem(instance);
  }
});

const handleClick = () => {
  if (!props.to) return;
  emit("click", props.to);
};
</script>
