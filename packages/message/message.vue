<template>
  <transition name="cozy-message-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      :class="['cozy-message', `cozy-message-${type}`]"
      role="alert"
      :style="{
        top: `${offset}px`,
      }"
    >
      <div class="cozy-message-content">
        <i
          :class="[
            'cozy-icon',
            {
              'c-information': type === 'info',
              'c-circle-check-filled': type === 'success',
              'c-circle-close-filled': type === 'error',
              'c-warning-filled': type === 'warning',
              'c-refresh-outlined cozy-icon-loading': type === 'loading',
            },
          ]"
        ></i>
        <span>{{ content }}</span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "CMessage",
  props: {
    id: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      values: ["success", "warning", "info", "error", "loading"],
      default: "info",
    },
    duration: {
      type: Number,
      default: 3000,
    },
    offset: {
      type: Number,
      default: 20,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const visible = ref(false);
    let timer: NodeJS.Timeout | null = null;

    const close = () => {
      visible.value = false;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    const handleAfterLeave = () => {
      props.onClose?.();
    };

    const startTimer = () => {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          close();
        }, props.duration);
      }
    };

    const show = () => {
      visible.value = true;
      startTimer();
    };

    onBeforeUnmount(() => {
      if (timer) {
        clearTimeout(timer);
      }
    });

    return {
      visible,
      close,
      show,
      handleAfterLeave,
    };
  },
});
</script>
