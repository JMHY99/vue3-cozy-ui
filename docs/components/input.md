# Input 输入框

用于输入内容的基础表单组件。

## 基础用法

最基础的输入框用法。

<demo src="../demos/input/input-01-basic.vue"></demo>

## 禁用状态

通过 `disabled` 属性禁用输入框。

<demo src="../demos/input/input-02-disabled.vue"></demo>

## 可清空

使用 `clearable` 属性可以给输入框添加清空按钮。

<demo src="../demos/input/input-03-clearable.vue"></demo>

## 带图标的输入框

通过 `prefix-icon` 和 `suffix-icon` 属性可以给输入框添加前缀或后缀图标。

<demo src="../demos/input/input-04-icon.vue"></demo>

## 不同尺寸

提供三种不同尺寸的输入框。

<demo src="../demos/input/input-05-size.vue"></demo>

## 文本域

用于输入多行文本信息，通过将 `type` 属性的值指定为 `textarea`。

<demo src="../demos/input/input-06-textarea.vue"></demo>

## Input 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|---------|
| v-model | 绑定值 | string / number | — | — |
| type | 类型 | string | text/password 等原生 input 类型 | text |
| placeholder | 输入框占位文本 | string | — | 请输入 |
| disabled | 是否禁用 | boolean | — | false |
| readonly | 是否只读 | boolean | — | false |
| clearable | 是否可清空 | boolean | — | false |
| prefix-icon | 前缀图标类名 | string | — | — |
| suffix-icon | 后缀图标类名 | string | — | — |
| size | 输入框尺寸 | string | large/default/small | default |
| rows | 文本域默认行数 | number | — | 3 |
| maxlength | 最大输入长度 | number | — | — |
| autofocus | 自动获取焦点 | boolean | — | false |
| resize | 文本域是否可缩放 | string | none/both/horizontal/vertical | vertical |

## Input 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| input | 输入值变化时触发 | (event: Event) |
| change | 值改变时触发 | (event: Event) |
| focus | 获得焦点时触发 | (event: FocusEvent) |
| blur | 失去焦点时触发 | (event: FocusEvent) |
| clear | 点击清空按钮时触发 | — |

## Input 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| focus | 使输入框获取焦点 | — |
| blur | 使输入框失去焦点 | — |
| select | 选中输入框中的文字 | — | 