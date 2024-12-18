<script setup lang="ts">
import { computed, provide, ref, onMounted, nextTick, onUnmounted } from "vue";

// 定义组件名称
defineOptions({
  name: "CMenu",
});

// Menu 组件的属性接口
interface MenuProps {
  // 菜单类型，可选 vertical horizontal inline
  mode?: "vertical" | "horizontal" | "inline";
  // 主题颜色
  theme?: "light" | "dark";
  // 是否收起状态
  inlineCollapsed?: boolean;
  // 当前选中的菜单项 key 数组
  selectedKeys?: string[];
  // 当前展开的 SubMenu 菜单项 key 数组
  openKeys?: string[];
  // 是否允许选中
  selectable?: boolean;
  // 是否允许多选
  multiple?: boolean;
}

// Props 默认值
const props = withDefaults(defineProps<MenuProps>(), {
  mode: "vertical",
  theme: "light",
  inlineCollapsed: false,
  selectable: true,
  multiple: false,
});

// 事件
const emit = defineEmits<{
  select: [key: string, item: any];
  openChange: [keys: string[]];
  click: [key: string, item: any];
}>();

// 内部状态
const selectedKeysRef = ref<string[]>(props.selectedKeys || []);
const openKeysRef = ref<string[]>(props.openKeys || []);

// 计算样式类名
const menuClasses = computed(() => [
  "cozy-menu",
  `cozy-menu-${props.mode}`,
  `cozy-menu-${props.theme}`,
  {
    "cozy-menu-inline-collapsed":
      props.inlineCollapsed && props.mode === "inline",
  },
]);

// 提供给组件的上下文
provide("menuContext", {
  mode: computed(() => props.mode),
  theme: computed(() => props.theme),
  inlineCollapsed: computed(() => props.inlineCollapsed),
  selectedKeys: selectedKeysRef,
  openKeys: openKeysRef,
  // 选择菜单项
  onSelect: (key: string, item: any) => {
    if (!props.selectable) return;

    if (props.multiple) {
      const index = selectedKeysRef.value.indexOf(key);
      if (index === -1) {
        selectedKeysRef.value.push(key);
      } else {
        selectedKeysRef.value.splice(index, 1);
      }
    } else {
      selectedKeysRef.value = [key];
      // 清除所有选中状态
      clearAllSelected();
      // 设置新的选中状态
      updateSelectedState(key);
    }

    emit("select", key, item);
  },
  // 展开/收起子菜单
  onOpenChange: (key: string) => {
    const index = openKeysRef.value.indexOf(key);
    if (index === -1) {
      openKeysRef.value.push(key);
    } else {
      openKeysRef.value.splice(index, 1);
    }
    emit("openChange", openKeysRef.value);
  },
});

// 更新选中状态的函数
const updateSelectedState = (key: string) => {
  // 更新原始菜单中的选中状态
  const originalItem = document.querySelector(`[data-menu-id="${key}"]`);
  if (originalItem) {
    originalItem.classList.add("cozy-menu-item-selected");
    // 如果是子菜单项，更新父级菜单的状态
    const parentSubmenu = originalItem.closest(".cozy-submenu");
    if (parentSubmenu) {
      parentSubmenu.classList.add("cozy-submenu-selected");
      // 更新父级菜单项的标题颜色
      const parentTitle = parentSubmenu.querySelector(".cozy-submenu-title");
      if (parentTitle) {
        parentTitle.classList.add("cozy-submenu-title-selected");
      }
    }
  }

  // 更新克隆菜单中的选中状态
  const cloneItem = document.querySelector(
    `.cozy-menu-overflow-list [data-menu-id="${key}"]`
  );
  if (cloneItem) {
    cloneItem.classList.add("cozy-menu-item-selected");
    // 如果是子菜单项，更新父级菜单的状态
    const parentSubmenu = cloneItem.closest(".cozy-submenu");
    if (parentSubmenu) {
      parentSubmenu.classList.add("cozy-submenu-selected");
      // 更新父级菜单项的标题颜色
      const parentTitle = parentSubmenu.querySelector(".cozy-submenu-title");
      if (parentTitle) {
        parentTitle.classList.add("cozy-submenu-title-selected");
      }
    }

    // 如果在溢出菜单中有选中项，无论是否有父级submenu，都更新省略号菜单的状态
    const overflowItem = document.querySelector('.cozy-menu-overflow-item');
    if (overflowItem) {
      overflowItem.classList.add("cozy-submenu-selected");
    }
  }
};

// 修改克隆菜单项的点击事件处理
const handleMenuItemClick = (
  key: string,
  originalItem: Element | HTMLElement
) => {
  if (!props.selectable) return;

  // 更新选中状态
  selectedKeysRef.value = [key];
  emit("select", key, originalItem);

  // 清除所有选中状态
  clearAllSelected();

  // 更新选中状态
  updateSelectedState(key);

  // 关闭溢出菜单
  isOverflowVisible.value = false;
};

// 新增的响应式变量
const menuRef = ref<HTMLElement | null>(null);
const isOverflowVisible = ref(false);
const overflowRef = ref<HTMLElement | null>(null);
const hiddenItems = ref<HTMLElement[]>([]);
const mouseInMenu = ref(false);

// 处理溢出菜单的鼠标事件
const handleOverflowEnter = () => {
  mouseInMenu.value = true;
  isOverflowVisible.value = true;
};

const handleOverflowLeave = (e: MouseEvent) => {
  // 检查鼠标是否移动到子菜单
  const relatedTarget = e.relatedTarget as HTMLElement;
  if (relatedTarget?.closest(".cozy-menu-overflow-submenu")) {
    return;
  }
  mouseInMenu.value = false;
  // 使用 setTimeout 延迟关闭，给用户时间移动到子菜单
  setTimeout(() => {
    if (!mouseInMenu.value) {
      isOverflowVisible.value = false;
    }
  }, 100);
};

// ���理子菜单的鼠标事件
const handleSubmenuMouseEnter = () => {
  mouseInMenu.value = true;
};

const handleSubmenuMouseLeave = (e: MouseEvent) => {
  const relatedTarget = e.relatedTarget as HTMLElement;
  if (
    relatedTarget?.closest(".cozy-menu-overflow-item") ||
    relatedTarget?.closest(".cozy-menu-overflow-submenu")
  ) {
    return;
  }
  mouseInMenu.value = false;
  setTimeout(() => {
    if (!mouseInMenu.value) {
      isOverflowVisible.value = false;
    }
  }, 100);
};

// 监听窗口大小变化
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  // 使用 ResizeObserver 监听父容器大小变化
  resizeObserver = new ResizeObserver(() => {
    nextTick(() => {
      calculateOverflow();
    });
  });

  if (menuRef.value?.parentElement) {
    resizeObserver.observe(menuRef.value.parentElement);
  }

  nextTick(() => {
    calculateOverflow();
  });
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

// 克隆并添加到溢出菜单
const cloneMenuItem = (item: HTMLElement) => {
  const clone = item.cloneNode(true) as HTMLElement;
  clone.style.display = "";

  // 处理子菜单
  if (item.classList.contains("cozy-submenu")) {
    const cloneSubmenu = clone;
    const clonePopup = cloneSubmenu.querySelector(
      ".cozy-submenu-popup"
    ) as HTMLElement;
    const cloneTitle = cloneSubmenu.querySelector(".cozy-submenu-title");
    const originalTitle = item.querySelector(".cozy-submenu-title");

    if (cloneTitle && originalTitle) {
      // 复制原始标题的类名和事件
      cloneTitle.className = originalTitle.className;
    }

    // 处理子菜单项
    const originalMenuItems = item.querySelectorAll(".cozy-menu-item");
    const cloneMenuItems = clone.querySelectorAll(".cozy-menu-item");
    cloneMenuItems.forEach((cloneItem, index) => {
      const originalItem = originalMenuItems[index];
      if (originalItem) {
        // 复制类名和数据属性
        cloneItem.className = originalItem.className;
        const itemKey = originalItem.getAttribute("data-menu-id");
        if (itemKey) {
          cloneItem.setAttribute("data-menu-id", itemKey);
        }

        // 处理点击事件
        cloneItem.addEventListener("click", (e) => {
          e.stopPropagation();
          const key = itemKey;
          if (key) {
            handleMenuItemClick(key, originalItem);
          }
        });
      }
    });

    // 处理子菜单的显示/隐藏
    let submenuTimer: number | null = null;
    cloneSubmenu.addEventListener("mouseenter", () => {
      if (submenuTimer) {
        clearTimeout(submenuTimer);
        submenuTimer = null;
      }
      if (clonePopup) {
        clonePopup.style.display = "block";
      }
    });

    cloneSubmenu.addEventListener("mouseleave", (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (relatedTarget?.closest(".cozy-submenu-popup")) {
        return;
      }
      submenuTimer = window.setTimeout(() => {
        if (clonePopup) {
          clonePopup.style.display = "none";
        }
      }, 100);
    });

    if (clonePopup) {
      clonePopup.addEventListener("mouseenter", () => {
        if (submenuTimer) {
          clearTimeout(submenuTimer);
          submenuTimer = null;
        }
      });

      clonePopup.addEventListener("mouseleave", (e: MouseEvent) => {
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (relatedTarget?.closest(".cozy-submenu")) {
          return;
        }
        if (clonePopup) {
          clonePopup.style.display = "none";
        }
      });
    }
  } else {
    // 处理普通菜单项
    const itemKey = item.getAttribute("data-menu-id");
    if (itemKey) {
      clone.setAttribute("data-menu-id", itemKey);
      // 复制类名，保持原有样式
      clone.className = item.className;

      // 处理点击事件
      clone.addEventListener("click", (e) => {
        e.stopPropagation();
        if (itemKey) {
          handleMenuItemClick(itemKey, item);
        }
      });
    }
  }

  return clone;
};

// 修改 calculateOverflow 函数中的克隆处理部分
const calculateOverflow = () => {
  if (props.mode !== "horizontal") return;

  const menuEl = menuRef.value;
  const overflowEl = overflowRef.value;
  if (!menuEl || !overflowEl) return;

  // 清除之前的溢出项
  clearOverflowItems();

  // 先重置所有项的显示状态
  const items = Array.from(menuEl.children) as HTMLElement[];
  items.forEach((item) => {
    if (!item.classList.contains("cozy-menu-overflow-item")) {
      item.style.display = "";
    }
  });

  // 获取菜单容器的宽度
  const containerWidth = menuEl.offsetWidth;
  // 先将溢出菜单显示出来以获取其宽度
  overflowEl.style.display = "inline-flex";
  const overflowWidth = 40; // 固定省略号菜单项的宽度
  let availableWidth = containerWidth - overflowWidth - 20; // 预留一些边距
  let totalWidth = 0;

  // 计算哪些项需要隐藏
  const itemsToHide: HTMLElement[] = [];
  let lastVisibleIndex = -1;

  // 第一次遍历：计算总宽度和需要隐藏的项
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.classList.contains("cozy-menu-overflow-item")) continue;

    const itemWidth = item.offsetWidth;
    if (totalWidth + itemWidth <= availableWidth) {
      totalWidth += itemWidth;
      lastVisibleIndex = i;
    } else {
      break;
    }
  }

  // 如果有需要隐藏的项
  if (lastVisibleIndex < items.length - 2) {
    // 显示溢出菜单
    overflowEl.style.display = "inline-flex";

    // 收集需要隐藏的项
    for (let i = lastVisibleIndex + 1; i < items.length; i++) {
      const item = items[i];
      if (!item.classList.contains("cozy-menu-overflow-item")) {
        itemsToHide.push(item);
        item.style.display = "none";
      }
    }

    // 克隆并添加到溢出菜单
    itemsToHide.forEach((item) => {
      const clone = cloneMenuItem(item);
      document.querySelector(".cozy-menu-overflow-list")?.appendChild(clone);
    });
    hiddenItems.value = itemsToHide;
  } else {
    // 如果所有项都可见，隐藏溢出菜单
    overflowEl.style.display = "none";
  }
};

// 清除溢出菜单中的项目
const clearOverflowItems = () => {
  const overflowList = document.querySelector(".cozy-menu-overflow-list");
  if (overflowList) {
    overflowList.innerHTML = "";
  }
  hiddenItems.value = [];
};

// 清除所有菜单项的选中状态
const clearAllSelected = () => {
  // 清除所有菜单项的选中状态（包括原始菜单和克隆菜单）
  document.querySelectorAll(".cozy-menu-item-selected").forEach((el) => {
    el.classList.remove("cozy-menu-item-selected");
  });
  // 清除所有子菜单的选中状态（包括原始菜单和克隆菜单）
  document.querySelectorAll(".cozy-submenu-selected").forEach((el) => {
    el.classList.remove("cozy-submenu-selected");
  });
  // 清除所有子菜单标题的选中状态
  document.querySelectorAll(".cozy-submenu-title-selected").forEach((el) => {
    el.classList.remove("cozy-submenu-title-selected");
  });
  // 清除溢出菜单的选中状态
  const overflowItem = document.querySelector(".cozy-menu-overflow-item");
  if (overflowItem) {
    overflowItem.classList.remove("cozy-submenu-selected");
  }
};
</script>

<template>
  <ul :class="menuClasses" role="menu" ref="menuRef">
    <slot></slot>
    <!-- 水平模式下的溢出菜单 -->
    <li
      v-if="mode === 'horizontal'"
      ref="overflowRef"
      class="cozy-menu-overflow-item"
      :style="{ display: 'none' }"
      @mouseenter="handleOverflowEnter"
      @mouseleave="handleOverflowLeave"
    >
      <div class="cozy-menu-overflow-title">
        <span>...</span>
      </div>
      <transition name="cozy-zoom-in-top">
        <div
          v-show="isOverflowVisible"
          class="cozy-menu-overflow-submenu"
          @mouseenter="handleSubmenuMouseEnter"
          @mouseleave="handleSubmenuMouseLeave"
        >
          <ul class="cozy-menu-overflow-list"></ul>
        </div>
      </transition>
    </li>
  </ul>
</template>
