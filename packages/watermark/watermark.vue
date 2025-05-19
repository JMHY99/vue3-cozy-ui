<template>
  <div
    class="c-watermark-wrapper"
    style="position: relative; width: 100%; height: 100%"
    ref="watermarkContainer"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineProps, onBeforeUnmount } from "vue";

// 定义组件名称
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
  rotate: -45,
  zIndex: 10,
});

const defaultFont = {
  color: "rgba(0, 0, 0, 0.15)",
  fontSize: "16px",
  fontFamily: "sans-serif",
  fontWeight: "normal",
};

const watermarkContainer = ref<HTMLElement | null>(null); // 水印容器引用
const watermarkDiv = ref<HTMLDivElement | null>(null);
let mutationObserver: MutationObserver | null = null;

const handleDomChanges = () => {
  console.log('2222222 :>> ', 1111111111);
  if (watermarkContainer.value) {
    const watermarkElement = watermarkContainer.value.querySelector(
      "div[style*='background-image']"
    );
    if (!watermarkElement) {
      // console.warn('水印元素被移除，正在重新生成...')
      drawWatermark(); // 重新绘制水印
    }
  }
};

const getLongContent = (content: string | string[]) => {
  if (!Array.isArray(content)) {
    return content;
  }
  let longContent = "";
  for (let i = 0; i < content.length; i++) {
    if (
      typeof content[i] === "string" &&
      content[i].length > longContent.length
    ) {
      longContent = content[i];
    }
  }
  return longContent;
};

const drawWatermark = () => {
  const { width, height, rotate, image, content, font, gap, offset } = props;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const longContent = getLongContent(content ?? []);

  // 文本默认高宽
  let contentWidth = 0;
  if (ctx) {
    ctx.font = `${font?.fontWeight ?? defaultFont.fontWeight} ${
      font?.fontSize ?? defaultFont.fontSize
    } ${font?.fontFamily ?? defaultFont.fontFamily}`;
    contentWidth = ctx.measureText(longContent).width;
  }
  const fontSize = parseInt(font?.fontSize ?? defaultFont.fontSize, 10);

  const [gapX, gapY] = gap ?? [100, 100];
  const effectiveWidth = width ?? contentWidth;
  const effectiveHeight = height ?? fontSize;

  canvas.width = (gapX + effectiveWidth) * 2;
  canvas.height = (gapY + effectiveHeight) * 2;

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.font = `${font?.fontWeight ?? defaultFont.fontWeight} ${
      font?.fontSize ?? defaultFont.fontSize
    } ${font?.fontFamily ?? defaultFont.fontFamily}`;
    ctx.fillStyle = font?.color ?? defaultFont.color;

    // 图片水印
    if (image) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = image;
      img.onload = () => {
        let x = gapX / 2;
        let y = effectiveHeight + gapY / 2;
        for (let index = 0; index < 2; index++) {
          ctx.save();
          ctx.translate(x + effectiveWidth / 2, y + effectiveHeight / 2);
          ctx.rotate((rotate * Math.PI) / 180);
          ctx.translate(-effectiveWidth / 2, -effectiveHeight / 2);
          ctx.drawImage(img, 0, 0, effectiveWidth, effectiveHeight);
          ctx.restore();
          x += effectiveWidth + gapX;
          y += effectiveHeight + gapY;
        }
        updateWatermarkImage(canvas.toDataURL());
      };
    } else if (Array.isArray(content)) {
      // 多行文本水印
      let x = gapX / 2;
      let y = effectiveHeight + gapY / 2;
      for (let index = 0; index < 2; index++) {
        ctx.save();
        ctx.translate(x + effectiveWidth / 2, y + effectiveHeight / 2);
        ctx.rotate((rotate * Math.PI) / 180);
        ctx.translate(-effectiveWidth / 2, -effectiveHeight / 2);
        content.forEach((line, idx) => {
          ctx.fillText(line, 0, idx * fontSize, effectiveWidth);
        });
        ctx.restore();
        x += effectiveWidth + gapX;
        y += effectiveHeight + gapY;
      }
      updateWatermarkImage(canvas.toDataURL());
    } else if (typeof content === "string") {
      // 单行文本水印
      let x = gapX / 2;
      let y = effectiveHeight + gapY / 2;
      for (let index = 0; index < 2; index++) {
        ctx.save();
        ctx.translate(x + effectiveWidth / 2, y + effectiveHeight / 2);
        ctx.rotate((rotate * Math.PI) / 180);
        ctx.translate(-effectiveWidth / 2, -effectiveHeight / 2);
        ctx.fillText(content, 0, 0, effectiveWidth);
        ctx.restore();
        x += effectiveWidth + gapX;
        y += effectiveHeight + gapY;
      }
      updateWatermarkImage(canvas.toDataURL());
    }

    ctx.restore();
  }
};

const updateWatermarkImage = (dataUrl: string) => {
  const container = watermarkContainer.value;
  if (!container) return;

  // 移除旧的水印
  const existing = container.querySelector("div[style*='background-image']");
  if (existing) {
    container.removeChild(existing);
  }

  // 创建新水印
  const watermarkDiv = document.createElement("div");
  const [gapX, gapY] = props.gap ?? [100, 100];
  const [offsetX, offsetY] = props.offset ?? [gapX / 2, gapY / 2];

  watermarkDiv.style.position = "absolute";
  watermarkDiv.style.top = "0";
  watermarkDiv.style.left = "0";
  watermarkDiv.style.width = "100%";
  watermarkDiv.style.height = "100%";
  watermarkDiv.style.zIndex = String(props.zIndex ?? 10);
  watermarkDiv.style.backgroundImage = `url(${dataUrl})`;
  watermarkDiv.style.backgroundRepeat = "repeat";
  watermarkDiv.style.backgroundPosition = `${offsetX - 50}px ${offsetY - 50}px`;
  watermarkDiv.style.pointerEvents = "none";

  container.appendChild(watermarkDiv);
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

onMounted(() => {
  drawWatermark();

  if (watermarkContainer.value) {
    mutationObserver = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          handleDomChanges();
        }
        if (mutation.type === "attributes") {
          handleDomChanges();
        }
      }
    });

    mutationObserver.observe(watermarkContainer.value, {
      childList: true,
      attributes: true,
      subtree: true,
    });
  }
});

onBeforeUnmount(() => {
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }
});
</script>
