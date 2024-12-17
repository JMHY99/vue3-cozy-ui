# Slider 滑动输入条

### 概述

::: tip
滑动型输入器，展示当前值和可选范围。
:::

### 基础用法

基本滑动条。当 `range` 为 `false` 时，使用 `v-model` 绑定值。

<demo src="../demos/slider/slider-01-basic.vue"></demo>

### 禁用

禁用滑动条。

<demo src="../demos/slider/slider-02-disabled.vue"></demo>

### 带标记的滑动条

使用 `marks` 属性标注分段式滑块。

<demo src="../demos/slider/slider-03-marks.vue"></demo>

### 显示步骤

设置 `showSteps` 属性可以显示步骤点。

<demo src="../demos/slider/slider-04-steps.vue"></demo>

### 垂直方向

设置 `vertical` 可使 Slider 变成垂直方向。

<demo src="../demos/slider/slider-05-vertical.vue"></demo>

### 自定义提示

使用 `formatTooltip` 格式化 Tooltip 的内容。

<demo src="../demos/slider/slider-06-tooltip.vue"></demo>

### API

#### Props

| 参数          | 说明           | 类型    | 可选值 | 默认值 |
| ------------- | -------------- | ------- | ------ | ------ |
| model-value / v-model | 绑定值   | number  | —      | 0      |
| min          | 最小值         | number  | —      | 0      |
| max          | 最大值         | number  | —      | 100    |
| step         | 步长           | number  | —      | 1      |
| disabled     | 是否禁用       | boolean | —      | false  |
| vertical     | 是否垂直方向   | boolean | —      | false  |
| showTooltip  | 是否显示提示框 | boolean | —      | true   |
| formatTooltip | 格式化提示框内容 | function | —   | —      |
| marks        | 标记           | object  | —      | {}     |
| showSteps    | 是否显示步骤点 | boolean | —      | false  |

#### Events

| 事件名 | 说明           | 回调参数   |
| ------ | -------------- | ---------- |
| change | 值改变时触发   | value: number |
  </rewritten_file> 