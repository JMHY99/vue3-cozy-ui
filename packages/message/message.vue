<template>
  <div class="message" :class="`message-${type}`" v-if="visible">
    <div class="message-content">
      <slot></slot>
    </div>
  </div>
</template>

<script  lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'Message',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'info',
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props, { emit }) {
    const timer = ref<number | null>(null);

    const handleClose = () => {
      clearTimeout(timer.value!);
      emit('update:visible', false);
    };

    onMounted(() => {
      if (props.visible) {
        timer.value = setTimeout(handleClose, props.duration);
      }
    });

    onUnmounted(() => {
      clearTimeout(timer.value!);
    });

    return {
      timer,
    };
  },
});
</script>

<style scoped>
.message {
  /* 添加你的样式 */
}

/* 根据 type 添加不同的样式 */
.message-success {
  /* 成功样式 */
}

.message-error {
  /* 错误样式 */
}

/* ... 其他类型样式 */
</style>
