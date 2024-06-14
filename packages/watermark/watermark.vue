<template>
  <div class="c-watermark-wrapper" style="position: relative; width: 100%; height: 100%">
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
  // width: 120,
  // height: 60,
  rotate: -45,
  zIndex: 10,
});

const defaultFont = {
  color: "rgba(0, 0, 0, 0.15)",
  fontSize: "16px",
  fontFamily: "sans-serif",
  fontWeight: "normal",
};

const watermarkStyle = ref({});

const getLongContent = (content) => {
  if (!Array.isArray(content)) {
    return content
  }
  let longContent = '';
  for (let i = 0; i < content.length; i++) {
    if (typeof content[i] === 'string' && content[i].length > longContent.length) {
      longContent = content[i];
    }
  }
  return longContent;
}

const drawWatermark = () => {
  const { width, height, rotate, image, content, font, gap, offset } = props;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const longContent = getLongContent(content)

  //文本默认高宽
  let contentWidth = 0;
  if (ctx) {
    ctx.font = `${font?.fontWeight ?? defaultFont.fontWeight} ${font?.fontSize ?? defaultFont.fontSize
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
    ctx.font = `${font?.fontWeight ?? defaultFont.fontWeight} ${font?.fontSize ?? defaultFont.fontSize
      } ${font?.fontFamily ?? defaultFont.fontFamily}`;
    ctx.fillStyle = font?.color ?? defaultFont.color;
    // 图片
    if (image) {
      const img = new Image();
      img.crossOrigin = "Anonymous"; //设置crossOrigin属性来请求CORS权限
      img.src = image;
      img.onload = () => {
        let x = gapX / 2;
        let y = effectiveHeight + gapY / 2;
        for (let index = 0; index < 2; index++) {
          ctx.save(); // 保存当前状态
          ctx.translate(x + effectiveWidth / 2, y + effectiveHeight / 2); // 将原点移动到文字中心
          ctx.rotate((rotate * Math.PI) / 180);
          ctx.translate(-effectiveWidth / 2, -effectiveHeight / 2);
          ctx.drawImage(img, 0, 0, effectiveWidth, effectiveHeight);
          ctx.restore(); // 恢复之前保存的状态
          x += effectiveWidth + gapX;
          y += effectiveHeight + gapY;
        }
        updateWatermarkStyle(canvas.toDataURL());
      };
    } else if (Array.isArray(content)) {
      // 当 content 是字符串数组时，多行水印
      let x = gapX / 2;
      let y = effectiveHeight + gapY / 2;
      for (let index = 0; index < 2; index++) {
        ctx.save(); // 保存当前状态
        ctx.translate(x + effectiveWidth / 2, y + effectiveHeight / 2); // 将原点移动到文字中心
        ctx.rotate((rotate * Math.PI) / 180);
        ctx.translate(-effectiveWidth / 2, -effectiveHeight / 2);
        content.forEach((line, index) => {
          ctx.fillText(line, 0, index * fontSize, effectiveWidth);
        });
        ctx.restore(); // 恢复之前保存的状态
        x += effectiveWidth + gapX;
        y += effectiveHeight + gapY;
      }
      updateWatermarkStyle(canvas.toDataURL());
    } else if (typeof content === "string") {
      let x = gapX / 2;
      let y = effectiveHeight + gapY / 2;
      for (let index = 0; index < 2; index++) {
        ctx.save(); // 保存当前状态
        // ctx.translate(x, y); // 设置第一个文字的位置
        // ctx.rotate((rotate * Math.PI) / 180);
        ctx.translate(x + effectiveWidth / 2, y + effectiveHeight / 2); // 将原点移动到文字中心
        ctx.rotate((rotate * Math.PI) / 180);
        ctx.translate(-effectiveWidth / 2, -effectiveHeight / 2); // 移动回文字绘制起点
        ctx.fillText(content, 0, 0, effectiveWidth); // 绘制第一个文字
        ctx.restore(); // 恢复之前保存的状态
        x += effectiveWidth + gapX;
        y += effectiveHeight + gapY;
      }
      updateWatermarkStyle(canvas.toDataURL());
    }

    ctx.restore();
  }
};

const updateWatermarkStyle = (dataUrl: string) => {
  const [gapX, gapY] = props.gap ?? [100, 100];
  const [offsetX, offsetY] = props.offset ?? [gapX / 2, gapY / 2];
  watermarkStyle.value = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: props.zIndex ?? 10,
    backgroundImage: `url(${dataUrl})`,
    backgroundRepeat: "repeat",
    backgroundPosition: `${offsetX - 50}px ${offsetY - 50}px`,
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
