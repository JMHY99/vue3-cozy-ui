# Checkbox 多选框

### 概述

::: tip
多选框。在一组可选项中进行多项选择时使用。
:::

### 基础用法

简单的 checkbox。

<demo src="../demos/checkbox/checkbox-01-basic.vue"></demo>

### 禁用状态

checkbox 不可用状态。

<demo src="../demos/checkbox/checkbox-02-disabled.vue"></demo>

### Checkbox 组

方便的从数组生成 checkbox 组。

<demo src="../demos/checkbox/checkbox-03-group.vue"></demo>

### 全选

在实现全选效果时，你可能会用到 indeterminate 属性。

<demo src="../demos/checkbox/checkbox-04-indeterminate.vue"></demo>

### API

#### Checkbox Props

| 参数          | 说明           | 类型    | 可选值 | 默认值 |
| ------------- | -------------- | ------- | ------ | ------ |
| model-value / v-model | 绑定值   | boolean | —      | false  |
| label         | 选中状态的值   | string / number / boolean | — | —   |
| disabled      | 是否禁用      | boolean | —      | false  |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | — | false |

#### Checkbox Events

| 事件名 | 说明           | 回调参数   |
| ------ | -------------- | ---------- |
| change | 当绑定值变化时触发的事件 | value: boolean |

#### CheckboxGroup Props

| 参数          | 说明           | 类型    | 可选值 | 默认值 |
| ------------- | -------------- | ------- | ------ | ------ |
| model-value / v-model | 绑定值   | array  | —      | []     |
| disabled      | 是否禁用      | boolean | —      | false  |
| min          | 可被勾选的 checkbox 的最小数量   | number | —      | —     |
| max          | 可被勾选的 checkbox 的最大数量   | number | —      | —     |

#### CheckboxGroup Events

| 事件名 | 说明           | 回调参数   |
| ------ | -------------- | ---------- |
| change | 当绑定值变化时触发的事件 | value: array | 