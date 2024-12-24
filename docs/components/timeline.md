# Timeline 时间轴

### 概述

::: tip
垂直展示的时间流信息。
:::

### 基础用法

基础的时间轴。

<demo src="../demos/timeline/timeline-01-base.vue"></demo>

### 右侧时间轴点

时间轴点可以在内容的右边。

<demo src="../demos/timeline/timeline-02-right.vue"></demo>

### 交替展示

内容在时间轴两侧交替出现。

<demo src="../demos/timeline/timeline-03-alternate.vue"></demo>

### 自定义时间轴点

可以自定义时间轴点的颜色和图标。

<demo src="../demos/timeline/timeline-04-custom.vue"></demo>

### 标签

使用 label 标签单独展示时间。

<demo src="../demos/timeline/timeline-05-label.vue"></demo>

### API

#### Timeline 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| pending | 指定最后一个幽灵节点是否存在 | boolean \| string | - | false |
| mode | 通过设置 mode 可以改变时间轴和内容的相对位置 | string | left \| alternate \| right | left |
| reverse | 节点排序 | boolean | - | false |

#### TimelineItem 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| color | 指定圆圈颜色 | string | blue \| red \| green \| gray | blue |
| dot | 自定义时间轴点 | string | - | - |
| label | 设置标签 | string | - | - |
| position | 自定义节点位置 | string | left \| right | - |

#### TimelineItem 插槽

| 名称 | 说明 |
| --- | --- |
| default | 基本内容 |
| dot | 自定义时间轴点内容 | 