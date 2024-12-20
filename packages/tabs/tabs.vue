<!-- Tabs 标签页组件 -->
<template>
  <div :class="tabsClasses">
    <!-- 标签头部 -->
    <div
      ref="navRef"
      role="tablist"
      class="cozy-tabs-nav"
      :class="navClasses"
      :style="props.tabBarStyle"
    >
      <!-- 额外内容 - 前置 -->
      <div v-if="$slots.tabBarExtraContent" class="cozy-tabs-nav-extra-content">
        <slot name="tabBarExtraContent"></slot>
      </div>

      <!-- 标签列表 -->
      <div class="cozy-tabs-nav-wrap">
        <div class="cozy-tabs-nav-list" :style="tabNavListStyle">
          <div
            v-for="(tab, index) in tabs"
            :key="tab.key || index"
            role="tab"
            :class="[
              'cozy-tabs-tab',
              {
                'cozy-tabs-tab-active': activeKey === tab.key,
                'cozy-tabs-tab-disabled': tab.props?.disabled
              }
            ]"
            :style="getTabStyle(index)"
            @click="handleTabClick(tab.key, tab.props?.disabled)"
          >
            <slot
              name="tab"
              v-bind="{ tab: tab.props, active: activeKey === tab.key }"
            >
              <template v-if="tab.slots?.tab">
                <component :is="tab.slots.tab"></component>
              </template>
              <template v-else>{{ tab.props?.tab }}</template>
            </slot>
          </div>
          <!-- 标签底部条 -->
          <div
            v-if="props.type === 'line'"
            class="cozy-tabs-ink-bar"
            :style="inkBarStyle"
          ></div>
        </div>
      </div>

      <!-- 额外内容 - 后置 -->
      <div v-if="$slots.rightExtra" class="cozy-tabs-nav-extra-content-right">
        <slot name="rightExtra"></slot>
      </div>
    </div>

    <!-- 标签内容 -->
    <div class="cozy-tabs-content">
      <div
        class="cozy-tabs-tabpane"
        v-for="(tab, index) in tabs"
        :key="tab.key || index"
        v-show="activeKey === tab.key"
        role="tabpanel"
      >
        <component :is="tab.component" v-if="activeKey === tab.key"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  watch,
  useSlots,
  nextTick,
  provide
} from 'vue';
import type { Component } from 'vue';

/** Tab 位置类型 */
type TabPosition = 'top' | 'right' | 'bottom' | 'left';

/** Tab 类型 */
type TabType = 'line' | 'card' | 'editable-card';

/** Tab 大小 */
type TabSize = 'large' | 'default' | 'small';

/** Tab 项配置 */
interface TabItem {
  key: string;
  props?: {
    tab?: string;
    disabled?: boolean;
    closable?: boolean;
    [key: string]: any;
  };
  slots?: {
    tab?: Component;
  };
  component?: Component;
  disabled?: boolean;
}

/** 动画配置类型 */
interface AnimatedConfig {
  inkBar?: boolean;
  tabPane?: boolean;
}

// Props 定义
const props = withDefaults(
  defineProps<{
    /** 当前激活 tab 面板的 key */
    activeKey?: string;
    /** 初始化选中面板的 key */
    defaultActiveKey?: string;
    /** tabs 之间的间隙 */
    tabBarGutter?: number;
    /** tab bar 上额外的元素 */
    tabBarExtraContent?: string | Component;
    /** tab bar 的样式对象 */
    tabBarStyle?: object;
    /** 页签位置 */
    tabPosition?: TabPosition;
    /** 页签的基本样式 */
    type?: TabType;
    /** 大小 */
    size?: TabSize;
    /** 是否隐藏加号图标 */
    hideAdd?: boolean;
    /** 是否使用动画切换 Tabs */
    animated?: boolean | AnimatedConfig;
    /** tabs 为 editable-card 时，是否使用关闭图标 */
    closable?: boolean;
    /** 是否可拖拽 */
    draggable?: boolean;
  }>(),
  {
    tabPosition: 'top',
    type: 'line',
    size: 'default',
    hideAdd: false,
    animated: true,
    closable: true,
    draggable: false,
  }
);

// Emits 定义
const emit = defineEmits<{
  /** 切换面板的回调 */
  (e: 'update:activeKey', key: string): void;
  /** 切换面板的回调 */
  (e: 'change', key: string): void;
  /** 点击 tab 时的回调 */
  (e: 'tabClick', key: string): void;
  /** 新增和删除页签的回调 */
  (e: 'edit', targetKey: string | MouseEvent, action: 'add' | 'remove'): void;
}>();

// 组件引用
const navRef = ref<HTMLElement | null>(null);

// 内部状态
const currentActiveKey = ref(props.activeKey || props.defaultActiveKey || '');
const tabs = ref<TabItem[]>([]);
const inkBarStyle = ref({});

// 计算属性
const activeKey = computed({
  get: () => props.activeKey || currentActiveKey.value,
  set: (val) => {
    currentActiveKey.value = val;
    emit('update:activeKey', val);
  },
});

const tabNavListStyle = computed(() => {
  if (props.tabBarGutter !== undefined && props.tabBarGutter > 0) {
    return {
      gap: `${props.tabBarGutter}px`,
    };
  }
  return {};
});

// 方法定义
/** 处理标签点击 */
const handleTabClick = (key: string, disabled?: boolean) => {
  if (disabled) return;
  activeKey.value = key;
  emit('tabClick', key);
  emit('change', key);
};

/** 获取标签样式 */
const getTabStyle = (index: number) => {
  if (props.tabBarGutter !== undefined && props.tabBarGutter > 0) {
    return {};
  }
  return {
    marginLeft: index === 0 ? '0' : '32px',
  };
};

/** 更新墨条位置 */
const updateInkBar = async () => {
  await nextTick();
  if (!navRef.value || props.type !== 'line') return;

  const nav = navRef.value;
  const activeTab = nav.querySelector('.cozy-tabs-tab-active');
  if (!activeTab) return;

  const { offsetLeft, offsetWidth } = activeTab as HTMLElement;

  inkBarStyle.value = {
    width: `${offsetWidth}px`,
    transform: `translateX(${offsetLeft}px)`,
  };
};

// 监听 activeKey 变化
watch(activeKey, () => {
  updateInkBar();
});

// 组件挂载时
onMounted(() => {
  // 收集所有 tab-pane 组件
  const slots = useSlots();
  const defaultSlot = slots.default?.();
  if (defaultSlot) {
    tabs.value = defaultSlot
      .filter((vnode) => vnode.type && (vnode.type as any).name === 'CTabPane')
      .map((vnode) => ({
        key: vnode.props?.name || '',
        props: vnode.props,
        slots: vnode.children as any,
        component: vnode,
      }));

    // 如果没有设置初始激活项，默认激活第一项
    if (!currentActiveKey.value && tabs.value.length > 0) {
      currentActiveKey.value = tabs.value[0].key;
    }
  }

  // 初始化墨条位置
  updateInkBar();
});

// 提供上下文
provide('tabs', {
  activeKey,
  onTabClick: handleTabClick,
});

defineOptions({
  name: 'CTabs',
});

// 计算类名
const tabsClasses = computed(() => {
  const isAnimated = props.animated === true ||
    (typeof props.animated === 'object' && props.animated.tabPane !== false);

  return [
    'cozy-tabs',
    `cozy-tabs-${props.tabPosition}`,
    `cozy-tabs-${props.type}`,
    `cozy-tabs-${props.size}`,
    {
      'cozy-tabs-animated': isAnimated
    }
  ];
});

const navClasses = computed(() => {
  const isAnimated = props.animated === true ||
    (typeof props.animated === 'object' && props.animated.inkBar !== false);

  return [
    {
      'cozy-tabs-nav-animated': isAnimated
    }
  ];
});

</script>
