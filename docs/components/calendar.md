# Calendar 日历

### 概述

::: tip
日历组件，用于展示日期和选择日期。
:::

### 基础用法

最简单的用法，在浮层中可以选择或者输入日期。

<demo src="../demos/calendar/calendar-01-basic.vue"></demo>

### 卡片模式

用于嵌套在空间较小的容器中。

<demo src="../demos/calendar/calendar-02-card.vue"></demo>

### 自定义渲染

使用 `dateCell` 插槽可以自定义日期单元格的内容。

<demo src="../demos/calendar/calendar-03-custom.vue"></demo>

### 年/月切换

通过设置 `mode` 属性可以切换年/月视图。

<demo src="../demos/calendar/calendar-04-mode.vue"></demo>

### API

#### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `Date` | - |
| mode | 显示模式 | `'month' \| 'year'` | `'month'` |
| fullscreen | 是否全屏显示 | `boolean` | `true` |
| disabledDate | 不可选择的日期 | `(date: Date) => boolean` | - |

#### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 当选择日期时触发 | `(date: Date) => void` |
| select | 点击选择日期时触发 | `(date: Date) => void` |
| panelChange | 切换面板时触发 | `(date: Date, mode: string) => void` |

#### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| dateCell | 自定义日期单元格的内容 | `{ date: Date }` |