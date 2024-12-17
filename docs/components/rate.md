# Rate 评分

### 概述

::: tip
评分组件。对评价进行展示，对事物进行快速的评级操作。
:::

### 基础用法

最简单的用法。

<demo src="../demos/rate/rate-01-basic.vue"></demo>

### 半星

支持选中半星。

<demo src="../demos/rate/rate-02-half.vue"></demo>

### 文案展示

给评分组件加上文案展示。

<demo src="../demos/rate/rate-03-text.vue"></demo>

### 只读和禁用

只读和禁用状态。

<demo src="../demos/rate/rate-04-disabled.vue"></demo>

### 自定义样式

可以自定义星星的个数和颜色。

<demo src="../demos/rate/rate-05-custom.vue"></demo>

### 其他字符

可以将星星替换为其他字符。

<demo src="../demos/rate/rate-06-character.vue"></demo>

### API

#### Props

| 参数          | 说明           | 类型    | 可选值 | 默认值 |
| ------------- | -------------- | ------- | ------ | ------ |
| model-value / v-model | 当前数，受控值 | number | —      | 0      |
| count         | star 总数      | number  | —      | 5      |
| allow-half    | 是否允许半选   | boolean | —      | false  |
| allow-clear   | 是否允许再次点击后清除 | boolean | —      | true   |
| disabled      | 是否为禁用状态 | boolean | —      | false  |
| readonly      | 是否为只读状态 | boolean | —      | false  |
| show-text     | 是否显示提示文字 | boolean | —    | false  |
| texts         | 自定义提示文字数组 | string[] | — | ['极差', '失望', '一般', '满意', '惊喜'] |
| active-color  | 自定义星星选中颜色 | string | —   | #fadb14 |
| character     | 自定义字符     | string  | —      | —      |
| icon          | 自定义图标     | string  | —      | —      |

#### Events

| 事件名 | 说明           | 回调参数   |
| ------ | -------------- | ---------- |
| change | 选择时的回调   | value: number |

#### Slots

| 名称      | 说明           | 作用域参数 |
| --------- | -------------- | ---------- |
| character | 自定义字符内容 | { index: number, value: number } |