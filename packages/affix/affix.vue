<template>
  <!-- 外层占位元素，用来保持页面布局 -->
  <div ref="placeholder" :style="placeholderStyle">
    <!-- 内部固定元素 -->
    <div :class="affixClasses" :style="affixStyles">
      <!-- 插槽内容，即需要固定的元素 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";

defineOptions({
  name: "CAffix",
});

interface CAffixProps {
  offsetBottom?: number;
  offsetTop?: number;
  target?: () => HTMLElement | Window;
}

const props = withDefaults(defineProps<CAffixProps>(), {
  offsetBottom: 0,
  offsetTop: 0,
  target: () => window,
});

const emit = defineEmits<{
  (e: "change", isAffixed: boolean): void;
}>();

const placeholder = ref<HTMLElement | null>(null);
const affixed = ref(false);
const affixStyles = ref({});
const placeholderStyle = ref({});
let targetElement: HTMLElement | Window;

const affixClasses = computed(() => ({
  "cozy-affix": true,
  "cozy-affix-fixed": affixed.value,
}));

const checkPosition = () => {
  const targetRect =
    targetElement === window
      ? { top: 0, bottom: window.innerHeight }
      : (targetElement as HTMLElement).getBoundingClientRect();
  const elementRect = placeholder.value?.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  let newAffixed = false;
  let newAffixStyles = {};

  if (elementRect) {
    if (
      props.offsetTop !== null &&
      elementRect.top <= targetRect.top + props.offsetTop
    ) {
      newAffixed = true;
      newAffixStyles = {
        position: "fixed",
        top: `${targetRect.top + props.offsetTop}px`,
        width: `${elementRect.width}px`,
      };
    } else if (
      props.offsetBottom !== null &&
      elementRect.bottom >= windowHeight - props.offsetBottom
    ) {
      newAffixed = true;
      newAffixStyles = {
        position: "fixed",
        bottom: `${props.offsetBottom}px`,
        width: `${elementRect.width}px`,
      };
    }
  }

  if (newAffixed !== affixed.value) {
    affixed.value = newAffixed;
    emit("change", newAffixed);
  }

  if (!newAffixed) {
    affixStyles.value = {};
    placeholderStyle.value = {};
  } else {
    affixStyles.value = newAffixStyles;
    placeholderStyle.value = {
      width: `${elementRect?.width}px`,
      height: `${elementRect?.height}px`,
    };
  }
};

onMounted(() => {
  targetElement = props.target();
  (targetElement as HTMLElement | Window).addEventListener(
    "scroll",
    checkPosition
  );
  window.addEventListener("resize", checkPosition);
  checkPosition();
});

onBeforeUnmount(() => {
  (targetElement as HTMLElement | Window).removeEventListener(
    "scroll",
    checkPosition
  );
  window.removeEventListener("resize", checkPosition);
});

watch([() => props.offsetTop, () => props.offsetBottom], () => {
  checkPosition();
});
</script>
