# Grid 栅格

### 概述
::: tip
24 栅格系统。

在多数业务情况下，Cozy UI 需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。

划分之后的信息区块们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版规则，以保证视觉层面的舒适感。

布局的栅格化系统，我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。下面简单介绍一下它的工作原理：

- 通过 `row` 在水平方向建立一组 `column`（简写 col）
- 你的内容应当放置于 `col` 内，并且，只有 `col` 可以作为 `row` 的直接元素
- 栅格系统中的列是指 1 到 24 的值来表示其跨越的范围。例如，三个等宽的列可以使用 `<c-col :span="8" />` 来创建
- 如果一个 `row` 中的 `col` 总和超过 24，那么多余的 `col` 会作为一个整体另起一行排列
:::

### 基础栅格

使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 Row 内。

<demo src="../demos/grid/grid-01-basic.vue"></demo>

### 区块间隔

栅格常常需要和间隔进行配合，你可以使用 Row 的 `gutter` 属性，我们推荐使用 (16+8n)px 作为栅格间隔。

<demo src="../demos/grid/grid-02-gutter.vue"></demo>

### 左右偏移

使用 `offset` 可以将列向右侧偏移，例如 `offset="4"` 将元素向右侧偏移了 4 个列（column）的宽度。

<demo src="../demos/grid/grid-03-offset.vue"></demo>

### 栅格排序

通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。

<demo src="../demos/grid/grid-04-push-pull.vue"></demo>

### 对齐方式

通过 `justify` 和 `align` 来对分栏进行灵活的对齐。

<demo src="../demos/grid/grid-05-flex.vue"></demo>

### 响应式布局

参照 Bootstrap 的 响应式设计，预设六个响应尺寸：`xs`、`sm`、`md`、`lg`、`xl`、`xxl`。

<demo src="../demos/grid/grid-06-responsive.vue"></demo>

### API

#### Row Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| align | flex 布局下的垂直对齐方式 | string | top/middle/bottom | top |
| justify | flex 布局下的水平排列方式 | string | start/end/center/space-around/space-between | start |
| gutter | 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 | number/array | - | 0 |
| wrap | 是否自动换行 | boolean | - | true |

#### Col Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| span | 栅格占位格数 | number | 1-24 | 24 |
| offset | 栅格左侧的间隔格数 | number | 1-24 | 0 |
| pull | 栅格向左移动格数 | number | 1-24 | 0 |
| push | 栅格向右移动格数 | number | 1-24 | 0 |
| xs | `<576px` 响应式栅格 | number/object | - | - |
| sm | `≥576px` 响应式栅格 | number/object | - | - |
| md | `≥768px` 响应式栅格 | number/object | - | - |
| lg | `≥992px` 响应式栅格 | number/object | - | - |
| xl | `≥1200px` 响应式栅格 | number/object | - | - |
| xxl | `≥1600px` 响应式栅格 | number/object | - | - |
