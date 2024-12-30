# Mentions 提及

### 概述

::: tip
提及组件。

- 用于在输入中提及某人或某事
- 常用于评论、聊天、反馈等场景

:::

### 基本使用

基本使用。

<demo src="../demos/mentions/mentions-01-basic.vue"></demo>

### 异步加载

异步加载数据。

<demo src="../demos/mentions/mentions-02-async.vue"></demo>

### 自定义触发字符

自定义触发字符。

<demo src="../demos/mentions/mentions-03-prefix.vue"></demo>

### 配置项

自定义建议选项的属性。

<demo src="../demos/mentions/mentions-04-options.vue"></demo>

### 无效或只读

通过 `disabled` 属性设置是否生效。

<demo src="../demos/mentions/mentions-05-disabled.vue"></demo>

### 自定义建议

自定义建议选项。

<demo src="../demos/mentions/mentions-06-custom.vue"></demo>

### 多行模式

多行模式。

<demo src="../demos/mentions/mentions-07-multilines.vue"></demo>

### 不同尺寸

不同尺寸的 Mentions。

<demo src="../demos/mentions/mentions-08-size.vue"></demo>

### API

#### Mentions Props

| 参数                | 说明                 | 类型                                                    | 默认                                 |
| ------------------- | -------------------- | ------------------------------------------------------- | ------------------------------------ |
| modelValue(v-model) | 输入框的值           | `string`                                                | -                                    |
| options             | 选项数组             | `MentionsOption[]`                                      | `[]`                                 |
| prefix              | 触发字符             | `string \| string[]`                                    | `'@'`                                |
| fieldNames          | 自定义建议选项的键名 | `object`                                                | `{ label: 'label', value: 'value' }` |
| placeholder         | 输入框占位文本       | `string`                                                | -                                    |
| disabled            | 是否禁用             | `boolean`                                               | `false`                              |
| rows                | 输入框行数           | `number`                                                | `1`                                  |
| maxLength           | 最大长度             | `number`                                                | -                                    |
| size                | 输入框大小           | `'large' \| 'small'`                                    | -                                    |
| notFoundContent     | 无匹配时的内容       | `string`                                                | `'无匹配结果'`                       |
| dropdownStyle       | 下拉框的样式         | `object`                                                | -                                    |
| filterOption        | 自定义过滤逻辑       | `(input: string, option: MentionsOption) => boolean`    | -                                    |
| validateSearch      | 自定义触发验证逻辑   | `(text: string, props: Record<string, any>) => boolean` | -                                    |

#### Mentions Events

| 事件名称 | 说明                 | 回调参数                           |
| -------- | -------------------- | ---------------------------------- |
| change   | 输入框内容变化时触发 | `(value: string) => void`          |
| select   | 选择选项时触发       | `(option: MentionsOption) => void` |
| search   | 搜索时触发           | `(value: string) => void`          |
| focus    | 获得焦点时触发       | `(e: FocusEvent) => void`          |
| blur     | 失去焦点时触发       | `(e: FocusEvent) => void`          |

#### Mentions Slots

| 名称   | 说明           | 参数                         |
| ------ | -------------- | ---------------------------- |
| option | 自定义选项内容 | `{ option: MentionsOption }` |

#### MentionsOption

```ts
interface MentionsOption {
  value: string;
  label: string;
  disabled?: boolean;
  [key: string]: any;
}
```
