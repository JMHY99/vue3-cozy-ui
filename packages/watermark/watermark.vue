<!-- <template>
  <div :style="containerStyle" class="c-watermark-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

defineOptions({
  name: "CWatermark",
});

// 定义组件属性类型
interface WatermarkProps {
  width?: number;
  height?: number;
  rotate?: number;
  zIndex?: number;
  image?: string;
  content?: string;
  font?: {
    color?: string;
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
  };
  gap?: [number, number];
  offset?: [number, number];
}

const props = defineProps<WatermarkProps>();

const defaultFont = {
  color: "rgba(0, 0, 0, 0.15)",
  fontSize: "16px",
  fontFamily: "sans-serif",
  fontWeight: "normal",
};

const containerStyle = ref({});

const drawWatermark = () => {
  const { width, height, rotate, image, content, font, gap, offset } = props;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const [gapX, gapY] = gap ?? [100, 100];
  const [offsetX, offsetY] = offset ?? [gapX / 2, gapY / 2];
  const effectiveWidth = width ?? 200;
  const effectiveHeight = height ?? 200;

  canvas.width = gapX + effectiveWidth;
  canvas.height = gapY + effectiveHeight;

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.font = `${font?.fontWeight ?? defaultFont.fontWeight} ${
      font?.fontSize ?? defaultFont.fontSize
    } ${font?.fontFamily ?? defaultFont.fontFamily}`;
    ctx.fillStyle = font?.color ?? defaultFont.color;
    ctx.translate(offsetX, offsetY);
    ctx.rotate(((rotate ?? -22) * Math.PI) / 180);

    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, effectiveWidth, effectiveHeight);
        updateContainerStyle(canvas.toDataURL());
      };
    } else if (content) {
      ctx.fillText(content, 0, 0, effectiveWidth);
      updateContainerStyle(canvas.toDataURL());
    }

    ctx.restore();
  }
};

const updateContainerStyle = (dataUrl: string) => {
  containerStyle.value = {
    position: "relative",
    zIndex: props.zIndex ?? 10,
    backgroundImage: `url(${dataUrl})`,
    backgroundRepeat: "repeat",
  };
};

watch(
  () => [
    props.width,
    props.height,
    props.rotate,
    props.zIndex,
    props.image,
    props.content,
    props.font,
    props.gap,
    props.offset,
  ],
  drawWatermark,
  { immediate: true }
);

onMounted(drawWatermark);
</script>

<style scoped>
.c-watermark-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style> -->
<template>
  <div class="c-watermark-wrapper">
    <div class="c-watermark-content">
      <slot></slot>
    </div>
    <div :style="watermarkStyle" class="c-watermark-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineProps } from "vue";

defineOptions({
  name: "CWatermark",
});

// 定义组件属性类型
interface WatermarkProps {
  width?: number;
  height?: number;
  rotate?: number;
  zIndex?: number;
  image?: string;
  content?: string;
  font?: {
    color?: string;
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
  };
  gap?: [number, number];
  offset?: [number, number];
}

const props = defineProps<WatermarkProps>();

const defaultFont = {
  color: "rgba(0, 0, 0, 0.15)",
  fontSize: "16px",
  fontFamily: "sans-serif",
  fontWeight: "normal",
};

const watermarkStyle = ref({});

const drawWatermark = () => {
  const { width, height, rotate, image, content, font, gap, offset } = props;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const [gapX, gapY] = gap ?? [100, 100];
  const [offsetX, offsetY] = offset ?? [gapX / 2, gapY / 2];
  const effectiveWidth = width ?? 200;
  const effectiveHeight = height ?? 200;

  canvas.width = gapX + effectiveWidth;
  canvas.height = gapY + effectiveHeight;

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.font = `${font?.fontWeight ?? defaultFont.fontWeight} ${
      font?.fontSize ?? defaultFont.fontSize
    } ${font?.fontFamily ?? defaultFont.fontFamily}`;
    ctx.fillStyle = font?.color ?? defaultFont.color;
    ctx.translate(offsetX + effectiveWidth / 2, offsetY + effectiveHeight / 2);
    ctx.rotate(((rotate ?? -22) * Math.PI) / 180);

    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.drawImage(
          img,
          -effectiveWidth / 2,
          -effectiveHeight / 2,
          effectiveWidth,
          effectiveHeight
        );
        updateWatermarkStyle(canvas.toDataURL());
      };
    } else if (content) {
      ctx.fillText(content, 0, 0, effectiveWidth);
      updateWatermarkStyle(canvas.toDataURL());
    }

    ctx.restore();
  }
};

const updateWatermarkStyle = (dataUrl: string) => {
  watermarkStyle.value = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: props.zIndex ?? 10,
    backgroundImage: `url(${dataUrl})`,
    backgroundRepeat: "repeat",
    pointerEvents: "none", // 确保水印不影响子元素的交互
  };
};

watch(
  () => [
    props.width,
    props.height,
    props.rotate,
    props.zIndex,
    props.image,
    props.content,
    props.font,
    props.gap,
    props.offset,
  ],
  drawWatermark,
  { immediate: true }
);

onMounted(drawWatermark);
</script>

<style scoped>
.c-watermark-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.c-watermark-content {
  position: relative;
  z-index: 1;
}

.c-watermark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
}
</style>
