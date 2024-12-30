# AutoComplete 自动完成

### 概述

::: tip
输入框自动完成功能。

- 需要一个输入框而不是选择器。
- 需要输入建议/辅助提示。
:::

### 基本使用

基本使用。

<demo src="../demos/auto-complete/auto-complete-01-basic.vue"></demo>

### 自定义选项

可以自定义选项。

<demo src="../demos/auto-complete/auto-complete-02-custom.vue"></demo>

### 不区分大小写

不区分大小写的 AutoComplete。

<demo src="../demos/auto-complete/auto-complete-03-case-insensitive.vue"></demo>

### 查询模式

根据查询结果自动完成。

<demo src="../demos/auto-complete/auto-complete-04-search.vue"></demo>

### 查询模式 - 确定类目

查询模式 - 确定类目。

<demo src="../demos/auto-complete/auto-complete-05-categories.vue"></demo>

### 自定义输入组件

自定义输入组件。

<demo src="../demos/auto-complete/auto-complete-06-custom-input.vue"></demo>

### 不同尺寸

不同尺寸的 AutoComplete。

<demo src="../demos/auto-complete/auto-complete-07-size.vue"></demo>

### API

#### AutoComplete Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue(v-model) | 输入框的值 | `string` | - |
| options | 自动完成的数据源 | `AutoCompleteOption[]` | `[]` |
| placeholder | 输入框占位文本 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 输入框大小 | `'large' \| 'small'` | - |
| maxLength | 最大长度 | `number` | - |
| allowClear | 是否可以清空选项 | `boolean` | `false` |
| defaultActiveFirstOption | 是否默认高亮第一个选项 | `boolean` | `true` |
| defaultOpen | 是否在输入框获得焦点时显示下拉框 | `boolean` | `false` |
| dropdownStyle | 下拉框的样式 | `object` | - |
| notFoundContent | 无匹配时的内容 | `string` | `'无匹配结果'` |
| backfill | 使用键盘选择选项的时候把选中项回填到输入框中 | `boolean` | `false` |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false` | `boolean \| ((inputValue: string, option: AutoCompleteOption) => boolean)` | `true` |

#### AutoComplete Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中 option，或 input 的 value 变化时触发 | `(value: string) => void` |
| select | 被选中时调用 | `(option: AutoCompleteOption) => void` |
| search | 搜索补全项的时候调用 | `(value: string) => void` |
| focus | 获得焦点时触发 | `(e: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(e: FocusEvent) => void` |
| dropdownVisibleChange | 下拉框出现/隐藏时触发 | `(visible: boolean) => void` |

#### AutoComplete Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| option | 自定义选项内容 | `{ option: AutoCompleteOption }` |

#### AutoCompleteOption

```ts
interface AutoCompleteOption {
  value: string;
  disabled?: boolean;
  [key: string]: any;
}
``` 