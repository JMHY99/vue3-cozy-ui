# Alert 警告提示

### 概述

::: tip
警告提示。
:::

### 基础用法

`type` 属性为 success、info、warning 或 error。默认为 info。

<demo src="../demos/alert/alert-01-type.vue"></demo>

### 可关闭的

`closable` 属性设置关闭按钮。

<demo src="../demos/alert/alert-02-closable.vue"></demo>

### 图标显示

可以通过设置 `showIcon`控制是否显示图标，icon 插槽可以自定义图标

<demo src="../demos/alert/alert-03-showIcon.vue"></demo>

### 设置内容

`message` 属性设置内容，也可以使用 message 插槽

<demo src="../demos/alert/alert-04-message.vue"></demo>

### API

| 参数      | 说明             | 类型         | 可选值                           | 默认值 |
| --------- | ---------------- | ------------ | -------------------------------- | ------ |
| type      | 类型             | string       | success / warning / error / info | info   |
| message   | 警告提示内容     | string/ slot | —                                | —      |
| closable  | 显示关闭按钮     | boolean      | —                                | false  |
| closeText | 自定义关闭按钮   | string/ slot | —                                | ×      |
| showIcon  | 是否显示辅助图标 | boolean      | —                                | false  |
| icon      | 自定义辅助图标   | slot         | —                                | —      |

### 事件

| 事件名称 | 说明                 | 回调参数                |
| -------- | -------------------- | ----------------------- |
| close    | 关闭时触发的回调函数 | (e: MouseEvent) => void |
