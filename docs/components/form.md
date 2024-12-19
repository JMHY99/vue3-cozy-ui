# Form 表单

### 概述

::: tip
表单包含 输入框、单选框、下拉选择、多选框等用户输入的组件。 使用表单，您可以收集、验证和提交数据。
:::

### 基础用法

基础的表单包含各种输入表单项，比如input、select、radio、checkbox等。

<demo src="../demos/form/form-01-base.vue"></demo>

### 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

<demo src="../demos/form/form-02-inline.vue"></demo>

### 对齐方式

根据具体目标和制约因素，选择最佳的标签对齐方式。

<demo src="../demos/form/form-03-align.vue"></demo>

### 表单验证

在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。

<demo src="../demos/form/form-04-validate.vue"></demo>

### 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

<demo src="../demos/form/form-05-custom-validate.vue"></demo>

### 动态表单项

动态增加、减少表单项。

<demo src="../demos/form/form-06-dynamic.vue"></demo>

### 表单项提示

使用 tooltip 属性可以为表单项添加提示信息。

<demo src="../demos/form/form-07-tooltip.vue"></demo>

### 内容对齐

可以设置表单项内容的对齐方式。

<demo src="../demos/form/form-08-content-align.vue"></demo>

### 数字类型验证

对数字类型的输入进行验证。

<demo src="../demos/form/form-09-number-validate.vue"></demo>

### 表单尺寸

可以设置表单内所有组件的尺寸。

<demo src="../demos/form/form-10-size.vue"></demo>

### 表单网格布局

使用栅格系统来实现更复杂的表单布局。

<demo src="../demos/form/form-11-grid.vue"></demo>

### 分步表单

将复杂的表单分步骤填写，减少用户压力。

<!-- <demo src="../demos/form/form-12-steps.vue"></demo> -->

### API

#### Form 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | object | — |
| rules | 表单验证规则 | object | — |
| inline | 行内表单模式 | boolean | false |
| label-position | 表单域标签的位置 | 'right' \| 'left' \| 'top' | 'right' |
| label-width | 表单域标签的宽度 | string \| number | — |
| label-suffix | 表单域标签的后缀 | string | — |
| hide-required-asterisk | 是否隐藏必填字段标签旁边的红色星号 | boolean | false |
| require-asterisk-position | 必填星号位置 | 'left' \| 'right' | 'left' |
| show-message | 是否显示校验错误信息 | boolean | true |
| inline-message | 是否以行内形式展示校验信息 | boolean | false |
| status-icon | 是否在输入框中显示校验结果反馈图标 | boolean | false |
| validate-on-rule-change | 是否在 rules 属性改变后立即触发一次验证 | boolean | true |
| size | 用于控制该表单内组件的尺寸 | 'large' \| 'default' \| 'small' | 'default' |
| disabled | 是否禁用该表单内的所有组件 | boolean | false |
| scroll-to-error | 当验证失败时，是否滚动到第一个错误表单项 | boolean | false |

#### Form 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| validate | 对整个表单进行校验 | (callback?: Function) => Promise |
| validateField | 对部分表单字段进行校验 | (props: string \| string[], callback?: Function) => Promise |
| resetFields | 重置表单 | — |
| clearValidate | 移除表单项的校验结果 | (props?: string \| string[]) => void |
| scrollToField | 滚动到指定表单字段 | (prop: string) => void |

#### FormItem 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 表单域 model 字段 | string | — |
| label | 标签文本 | string | — |
| label-width | 标签宽度 | string \| number | — |
| required | 是否必填 | boolean | false |
| rules | 表单验证规则 | object \| array | — |
| error | 表单域验证错误信息 | string | — |
| show-message | 是否显示校验错误信息 | boolean | true |
| inline-message | 以行内形式展示校验信息 | boolean | false |
| size | 用于控制该表单域下组件的尺寸 | string | — |
| tooltip | 标签提示信息 | string | — |
| content-position | 内容的对齐方式 | 'left' \| 'center' \| 'right' | 'left' |
| validate-debounce | 验证防抖时间(毫秒) | number | 0 |

#### FormItem 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 表单项的内容 |
| label | 标签文本的内容 |
| error | 自定义表单校验信息的显示方式 | 