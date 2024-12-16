<template>
  <div
    class="cozy-rate"
    :class="{
      'cozy-rate-disabled': disabled,
      'cozy-rate-readonly': readonly,
    }"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-for="(item, index) in starList"
      :key="index"
      class="cozy-rate-star"
      :class="{
        'cozy-rate-star-full': item.value <= currentValue,
        'cozy-rate-star-half': item.value - 0.5 === currentValue,
      }"
      @mousemove="(e) => handleMouseMove(e, item)"
      @click="() => handleClick(item)"
    >
      <slot name="character" :index="index" :value="item.value">
        <i
          v-if="character"
          class="cozy-rate-character"
          :style="{
            color: item.value <= currentValue ? activeColor : '#e8e8e8',
          }"
          >{{ character }}</i
        >
        <i
          v-else-if="icon"
          :class="['cozy-icon', icon]"
          :style="{
            color: item.value <= currentValue ? activeColor : '#e8e8e8',
          }"
        ></i>
        <i
          v-else
          class="cozy-icon c-shoucang1"
          :style="{
            color: item.value <= currentValue ? activeColor : '#e8e8e8',
          }"
        ></i>
      </slot>
      <template v-if="allowHalf">
        <div
          class="cozy-rate-star-first"
          @mousemove.stop="(e) => handleHalfMove(e, item)"
        >
          <slot name="character" :index="index" :value="item.value - 0.5">
            <i
              v-if="character"
              class="cozy-rate-character"
              :style="{
                color:
                  item.value - 0.5 <= currentValue ? activeColor : '#e8e8e8',
              }"
              >{{ character }}</i
            >
            <i
              v-else-if="icon"
              :class="['cozy-icon', icon]"
              :style="{
                color:
                  item.value - 0.5 <= currentValue ? activeColor : '#e8e8e8',
              }"
            ></i>
            <i
              v-else
              class="cozy-icon c-shoucang1"
              :style="{
                color:
                  item.value - 0.5 <= currentValue ? activeColor : '#e8e8e8',
              }"
            ></i>
          </slot>
        </div>
        <div class="cozy-rate-star-second">
          <slot name="character" :index="index" :value="item.value">
            <i
              v-if="character"
              class="cozy-rate-character"
              :style="{
                color: item.value <= currentValue ? activeColor : '#e8e8e8',
              }"
              >{{ character }}</i
            >
            <i
              v-else-if="icon"
              :class="['cozy-icon', icon]"
              :style="{
                color: item.value <= currentValue ? activeColor : '#e8e8e8',
              }"
            ></i>
            <i
              v-else
              class="cozy-icon c-shoucang1"
              :style="{
                color: item.value <= currentValue ? activeColor : '#e8e8e8',
              }"
            ></i>
          </slot>
        </div>
      </template>
    </div>
    <span v-if="showText" class="cozy-rate-text">{{ currentText }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";

// 定义组件名称
defineOptions({
  name: "CRate",
});

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    count?: number;
    allowHalf?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    showText?: boolean;
    texts?: string[];
    activeColor?: string;
    character?: string;
    icon?: string;
  }>(),
  {
    modelValue: 0,
    count: 5,
    allowHalf: false,
    allowClear: true,
    disabled: false,
    readonly: false,
    showText: false,
    texts: () => ["极差", "失望", "一般", "满意", "惊喜"],
    activeColor: "#fadb14",
    character: "",
    icon: "",
  }
);

const emit = defineEmits(["update:modelValue", "change"]);

// 当前值（包括hover效果）
const currentValue = ref(props.modelValue);
// 实际选中的值
const selectedValue = ref(props.modelValue);
// 是否处于半星状态
const isHalf = ref(false);

// 生成星星列表
const starList = computed(() => {
  return Array.from({ length: props.count }, (_, index) => ({
    value: index + 1,
  }));
});

// 当前显示的文本
const currentText = computed(() => {
  const value = Math.ceil(currentValue.value) - 1;
  return props.texts[value] || "";
});

// 处理鼠标移动
const handleMouseMove = (event: MouseEvent, item: { value: number }) => {
  if (props.disabled || props.readonly) return;

  if (!isHalf.value) {
    currentValue.value = item.value;
  }
};

// 处理半星移动
const handleHalfMove = (event: MouseEvent, item: { value: number }) => {
  if (props.disabled || props.readonly || !props.allowHalf) return;

  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  isHalf.value = event.clientX - rect.left < rect.width;
  currentValue.value = isHalf.value ? item.value - 0.5 : item.value;
};

// 处理鼠标离开
const handleMouseLeave = () => {
  if (props.disabled || props.readonly) return;
  currentValue.value = selectedValue.value;
  isHalf.value = false;
};

// 处理点击
const handleClick = (item: { value: number }) => {
  if (props.disabled || props.readonly) return;

  const value = currentValue.value;

  if (props.allowClear && value === selectedValue.value) {
    currentValue.value = 0;
    selectedValue.value = 0;
    emit("update:modelValue", 0);
    emit("change", 0);
    return;
  }

  selectedValue.value = value;
  emit("update:modelValue", value);
  emit("change", value);
};

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newValue) => {
    currentValue.value = newValue;
    selectedValue.value = newValue;
  }
);
</script>
