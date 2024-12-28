<template>
  <div
    ref="containerRef"
    class="cozy-v-list"
    @scroll="handleScroll"
  >
    <div
      class="cozy-v-list-phantom"
      :style="{ height: totalHeight + 'px' }"
    ></div>
    <div
      class="cozy-v-list-content"
      :style="{ transform: `translate3d(0, ${offset}px, 0)` }"
    >
      <div
        v-for="item in visibleData"
        :key="item.index"
        class="cozy-v-list-item"
        :style="{ height: itemHeight + 'px' }"
      >
        <slot :item="item.data" :index="item.index">
          {{ item.data }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

// 定义组件名称
defineOptions({
  name: 'CVList'
});

// 定义Props接口
interface Props {
  // 列表数据
  data: any[];
  // 每项的高度，默认50
  itemHeight?: number;
  // 可视区域高度，默认400
  height?: number | string;
  // 预加载的数量，默认10
  bufferSize?: number;
}

// 定义Props默认值
const props = withDefaults(defineProps<Props>(), {
  itemHeight: 50,
  height: 400,
  bufferSize: 10
});

// 定义事件
const emit = defineEmits<{
  scroll: [event: Event];
  'visible-range-change': [startIndex: number, endIndex: number];
}>();

// 容器引用
const containerRef = ref<HTMLElement | null>(null);

// 滚动位置
const scrollTop = ref(0);

// 计算总高度
const totalHeight = computed(() => props.data.length * props.itemHeight);

// 计算可视区域能显示的项目数量
const visibleCount = computed(() => {
  if (!containerRef.value) return 0;
  return Math.ceil(containerRef.value.clientHeight / props.itemHeight);
});

// 计算起始索引
const startIndex = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemHeight);
  return Math.max(0, start - props.bufferSize);
});

// 计算结束索引
const endIndex = computed(() => {
  const end = startIndex.value + visibleCount.value + props.bufferSize * 2;
  return Math.min(props.data.length, end);
});

// 计算偏移量
const offset = computed(() => {
  return startIndex.value * props.itemHeight;
});

// 计算可视区域数据
const visibleData = computed(() => {
  return props.data
    .slice(startIndex.value, endIndex.value)
    .map((item, index) => ({
      data: item,
      index: startIndex.value + index
    }));
});

// 处理滚动事件
const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  scrollTop.value = target.scrollTop;
  emit('scroll', e);
  emit('visible-range-change', startIndex.value, endIndex.value);
};

// 监听数据变化
watch(
  () => props.data,
  () => {
    scrollTop.value = 0;
    if (containerRef.value) {
      containerRef.value.scrollTop = 0;
    }
  }
);

// 组件挂载后初始化
onMounted(() => {
  if (containerRef.value) {
    // 设置容器高度
    if (typeof props.height === 'number') {
      containerRef.value.style.height = `${props.height}px`;
    } else {
      containerRef.value.style.height = props.height;
    }
  }
});

// 暴露方法
defineExpose({
  // 滚动到指定索引
  scrollToIndex: (index: number) => {
    if (containerRef.value) {
      containerRef.value.scrollTop = index * props.itemHeight;
    }
  },
  // 滚动到指定位置
  scrollTo: (top: number) => {
    if (containerRef.value) {
      containerRef.value.scrollTop = top;
    }
  },
  // 获取当前可视范围
  getVisibleRange: () => {
    return {
      start: startIndex.value,
      end: endIndex.value
    };
  }
});
</script> 