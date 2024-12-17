# Radio 单选框

### 概述
::: tip
在一组备选项中进行单选。
:::

### 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

<demo src="../demos/radio/radio-01-basic.vue"></demo>

### 禁用状态

单选框不可用的状态。

<demo src="../demos/radio/radio-02-disabled.vue"></demo>

### 单选框组

使用 RadioGroup 实现一组互斥的选项。

<demo src="../demos/radio/radio-03-group.vue"></demo>

### 按钮样式

按钮样式的单选组合。

<demo src="../demos/radio/radio-04-button.vue"></demo>

### 按钮尺寸

提供大、中、小三种尺寸。

<demo src="../demos/radio/radio-05-size.vue"></demo>

### 实心按钮

实心按钮样式。

<demo src="../demos/radio/radio-06-solid.vue"></demo>

### API

#### Radio 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|---------|
| v-model | 绑定值 | string / number / boolean | — | — |
| label | 单选框的值 | string / number / boolean | — | — |
| disabled | 是否禁用 | boolean | — | false |
| name | 原生 name 属性 | string | — | — |

#### Radio 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

#### RadioGroup 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|---------|
| v-model | 绑定值 | string / number / boolean | — | — |
| size | 单选框组尺寸 | string | large/default/small | default |
| disabled | 是否禁用 | boolean | — | false |
| button-style | 按钮风格 | string | outline/solid | outline |

#### RadioGroup 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

#### RadioButton 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|---------|
| label | 单选框的值 | string / number / boolean | — | — |
| disabled | 是否禁用 | boolean | — | false |
| name | 原生 name 属性 | string | — | — |