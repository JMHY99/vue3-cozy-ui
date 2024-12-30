# Tooltip 文字提示

### 概述
::: tip
简单的文字提示气泡框。

- 用于展示某个元素的详细信息
- 当鼠标移入元素，显示提示
- 可代替系统默认的 title 提示
:::

### 基础用法

最简单的用法。

<demo src="../demos/tooltip/tooltip-01-base.vue"></demo>

### 位置

位置有 12 个方向。

<demo src="../demos/tooltip/tooltip-02-placement.vue"></demo>

### 自定义颜色

可以自定义背景颜色。

<demo src="../demos/tooltip/tooltip-03-color.vue"></demo>

### API

#### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 提示文字 | string \| slot | - |
| placement | 气泡框位置 | `top` \| `topLeft` \| `topRight` \| `bottom` \| `bottomLeft` \| `bottomRight` \| `left` \| `leftTop` \| `leftBottom` \| `right` \| `rightTop` \| `rightBottom` | `top` |
| trigger | 触发行为 | `hover` \| `focus` \| `click` | `hover` |
| mouseEnterDelay | 鼠标移入后延时多少才显示 Tooltip，单位：毫秒 | number | 100 |
| mouseLeaveDelay | 鼠标移出后延时多少才隐藏 Tooltip，单位：毫秒 | number | 100 |
| overlayClassName | 卡片类名 | string | - |
| overlayStyle | 卡片样式 | object | - |
| defaultVisible | 默认是否显隐 | boolean | false |
| visible(v-model) | 用于手动控制浮层显隐 | boolean | - |
| color | 背景颜色 | string | - |
| offsetX | X轴偏移量 | number | 0 |
| offsetY | Y轴偏移量 | number | 0 |
| disabled | 是否禁用 | boolean | false |
| arrowPointAtCenter | 箭头是否指向目标元素中心 | boolean | false |

#### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| show | 显示时触发 | - |
| hide | 隐藏时触发 | - |

#### 插槽

| 插槽名称 | 说明 |
| --- | --- |
| title | 提示文字内容 |
| default | 触发提示的元素 | 