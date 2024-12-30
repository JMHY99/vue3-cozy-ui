# Popover 气泡卡片

### 概述
:::tip
简单的卡片式弹窗。

- 当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。
- 和 Tooltip 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。
:::

### 基础用法

最简单的用法。

<demo src="../demos/popover/popover-01-base.vue"></demo>

### 位置

位置有 12 个方向。

<demo src="../demos/popover/popover-02-placement.vue"></demo>

### 触发方式

鼠标移入、聚集、点击。

<demo src="../demos/popover/popover-03-trigger.vue"></demo>

### 从浮层内关闭

使用 visible 属性控制浮层显示。

<demo src="../demos/popover/popover-04-visible.vue"></demo>

### API

#### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | string \| slot | - |
| content | 卡片内容 | string \| slot | - |
| placement | 气泡框位置 | `top` \| `topLeft` \| `topRight` \| `bottom` \| `bottomLeft` \| `bottomRight` \| `left` \| `leftTop` \| `leftBottom` \| `right` \| `rightTop` \| `rightBottom` | `top` |
| trigger | 触发行为 | `hover` \| `focus` \| `click` | `hover` |
| mouseEnterDelay | 鼠标移入后延时多少才显示 Popover，单位：毫秒 | number | 100 |
| mouseLeaveDelay | 鼠标移出后延时多少才隐藏 Popover，单位：毫秒 | number | 100 |
| overlayClassName | 卡片类名 | string | - |
| overlayStyle | 卡片样式 | object | - |
| defaultVisible | 默认是否显隐 | boolean | false |
| visible(v-model) | 用于手动控制浮层显隐 | boolean | - |
| disabled | 是否禁用 | boolean | false |
| arrowPointAtCenter | 箭头是否指向目标元素中心 | boolean | false |
| offsetX | X轴偏移量 | number | 0 |
| offsetY | Y轴偏移量 | number | 0 |

#### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| show | 显示时触发 | - |
| hide | 隐藏时触发 | - |

#### 插槽

| 插槽名称 | 说明 |
| --- | --- |
| title | 卡片标题内容 |
| content | 卡片内容 |
| default | 触发 Popover 显示的元素 | 