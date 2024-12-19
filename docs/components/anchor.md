# Anchor 锚点

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## 代码演示

### 基本使用
最简单的用法。

<demo src="../demos/anchor/anchor-01-basic.vue"></demo>

### 静态位置
不浮动，状态不随页面滚动变化。

<demo src="../demos/anchor/anchor-02-static.vue"></demo>

### 自定义锚点高度
锚点目标滚动到屏幕正中间。

<demo src="../demos/anchor/anchor-03-target-offset.vue"></demo>

### 水平锚点
水平方向的锚点。

<demo src="../demos/anchor/anchor-04-horizontal.vue"></demo>

### 自定义容器
指定滚动容器。

<demo src="../demos/anchor/anchor-05-container.vue"></demo>

### 自定义锚点区域边界
指定锚点区域边界。

<demo src="../demos/anchor/anchor-06-bounds.vue"></demo>

## API

### Anchor Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| affix | 固定模式 | `boolean` | `true` |
| bounds | 锚点区域边界 | `number` | `5` |
| customizeAffix | 自定义固定状态 | `boolean` | `false` |
| direction | 设置导航方向 | `'vertical' \| 'horizontal'` | `'vertical'` |
| getContainer | 指定滚动的容器 | `() => HTMLElement \| Window` | `() => window` |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | `number` | - |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | `number` | - |
| showInkInFixed | 是否在固定状态下显示小圆点 | `boolean` | `false` |
| targetOffset | 锚点滚动偏移量，默认与 offsetTop 相同 | `number` | - |
| wrapperStyle | 容器样式 | `CSSProperties` | - |

### Anchor Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 锚点链接改变时触发 | `(currentActiveLink: string) => void` |
| click | 点击锚点链接时触发 | `(e: MouseEvent, link: string) => void` |

### AnchorLink Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | 锚点链接 | `string` | - |
| title | 文字内容 | `string` | - |

### AnchorLink Slots

| 名称 | 说明 |
| --- | --- |
| default | 内容 | 