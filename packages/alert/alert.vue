<template>
  <div v-if="visible" :class="['cozy-alert', 'cozy-alert-' + type]">
    <!-- 图标插槽 -->
    <slot name="icon" v-if="showIcon">
      <i :class="[`cozy-icon ${iconName}`]"></i>
    </slot>

    <!-- 内容插槽 -->
    <div class="cozy-alert-message">
      <slot name="message">
        {{ message }}
      </slot>
    </div>

    <div v-if="closable" class="cozy-alert-close" @click="closeAlert">
      <slot name="closeText">
        {{ closeText }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

defineOptions({
  name: "CAlert",
});

interface AlertProps {
  message?: string;
  type?: string;
  showIcon?: boolean;
  closable?: boolean;
  closeText?: string;
}

const props = withDefaults(defineProps<AlertProps>(), {
  type: "info",
  closeText: "×",
});

// 3.3+: 可选的、更简洁的语法
const emit = defineEmits<{
  close: [event: Event],
}>();

// 使用ref定义响应式数据
const visible = ref<boolean>(true);

// 关闭事件
const closeAlert = (event: Event) => {
  visible.value = false;
  emit("close", event);
};

const iconName = computed(() => {
  const iconMap = {
    success: "c-check-circle-outlined",
    info: "c-Info",
    warning: "c-warning",
    error: "c-close-circle-outlined",
  };
  return iconMap[props.type] || "";
});
</script>
