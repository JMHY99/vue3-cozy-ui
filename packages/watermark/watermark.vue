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
  <div
    class="c-watermark-wrapper"
    style="position: relative; width: 100%; height: 100%"
  >
    <slot></slot>
    <div :style="watermarkStyle"></div>
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
  content?: string | string[];
  font?: {
    color?: string;
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
  };
  gap?: [number, number];
  offset?: [number, number];
}

const props = withDefaults(defineProps<WatermarkProps>(), {
  width: 120,
  height: 60,
  rotate: -20,
  zIndex: 10,
});

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
  const [offsetX, offsetY] = offset ?? [0, 0];
  const effectiveWidth = width;
  const effectiveHeight = height;

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
    // ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(((rotate ?? -20) * Math.PI) / 180);

    // 图片
    if (image) {
      const img = new Image();
      img.crossOrigin = "Anonymous"; //设置crossOrigin属性来请求CORS权限
      img.src = image;
      img.onload = () => {
        // 将旋转的中心点移动到画布中心或图片中心
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // 旋转-20度，注意JavaScript中的Math.PI是π，所以-20度转换为弧度是 -20 * (Math.PI / 180)
         ctx.rotate(((rotate ?? -20) * Math.PI) / 180);

        ctx.drawImage(img, 0, 0, effectiveWidth, effectiveHeight);
        updateWatermarkStyle(canvas.toDataURL());
      };
    } else if (Array.isArray(content)) {
      // 当 content 是字符串数组时，多行水印
      let lineHeight = parseInt(font?.fontSize ?? defaultFont.fontSize, 10);
      content.forEach((line, index) => {
        ctx.fillText(line, 0, index * lineHeight, effectiveWidth);
      });
      updateWatermarkStyle(canvas.toDataURL());
    } else if (typeof content === "string") {
      // 当 content 是单个字符串时
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
    width: "100%",
    height: "100%",
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
