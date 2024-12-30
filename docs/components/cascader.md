# Cascader 级联选择

### 概述

::: tip
级联选择框。

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。
  :::

### 基本用法

最简单的用法。

<demo src="../demos/cascader/cascader-01-basic.vue"></demo>

### 默认值

默认值通过数组的方式指定。

<demo src="../demos/cascader/cascader-02-default-value.vue"></demo>

### 可以清空

通过 `allowClear` 设置是否支持清空选项。

<demo src="../demos/cascader/cascader-03-clear.vue"></demo>

### 禁用选项

通过指定 options 里的 `disabled` 字段。

<demo src="../demos/cascader/cascader-04-disabled.vue"></demo>

### 移入展开

通过 `expandTrigger` 设置展开触发方式。

<demo src="../demos/cascader/cascader-05-hover.vue"></demo>

### 大小

不同大小的级联选择器。

<demo src="../demos/cascader/cascader-06-size.vue"></demo>

### 自定义字段名

通过 `fieldNames` 自定义字段名。

<demo src="../demos/cascader/cascader-07-fields.vue"></demo>

### 动态加载选项

使用 `loadData` 实现动态加载选项。

<demo src="../demos/cascader/cascader-08-load-data.vue"></demo>

### 搜索功能

可以直接搜索选项并选择。

<demo src="../demos/cascader/cascader-09-search.vue"></demo>

### 多选

可以通过 `multiple` 设置多选，并通过 `maxTagCount` 设置最多显示的 tag 数。

<demo src="../demos/cascader/cascader-10-multiple.vue"></demo>

### API

#### Cascader Props

| 参数                 | 说明                       | 类型                                                   | 默认值                                                     |
| -------------------- | -------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| modelValue / v-model | 指定选中项                 | `string \| number \| (string \| number)[]`             | -                                                          |
| options              | 可选项数据源               | `CascaderOption[]`                                     | `[]`                                                       |
| placeholder          | 输入框占位文本             | `string`                                               | `'请选择'`                                                 |
| disabled             | 是否禁用                   | `boolean`                                              | `false`                                                    |
| allowClear           | 是否支持清除               | `boolean`                                              | `true`                                                     |
| showSearch           | 是否支持搜索               | `boolean`                                              | `false`                                                    |
| searchPlaceholder    | 搜索框占位文本             | `string`                                               | `'请输入搜索内容'`                                         |
| size                 | 输入框大小                 | `'large' \| 'small'`                                   | -                                                          |
| multiple             | 是否多选                   | `boolean`                                              | `false`                                                    |
| maxTagCount          | 最多显示多少个 tag         | `number`                                               | `3`                                                        |
| fieldNames           | 自定义字段名               | `object`                                               | `{ label: 'label', value: 'value', children: 'children' }` |
| loadData             | 动态加载选项               | `(selectedOptions: CascaderOption[]) => Promise<void>` | -                                                          |
| emptyText            | 当下拉列表为空时显示的内容 | `string`                                               | `'暂无数据'`                                               |

#### Cascader Events

| 事件名称      | 说明                  | 回调参数                                                                                       |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------- |
| change        | 选择完成后的回调      | `(value: string \| number \| (string \| number)[], selectedOptions: CascaderOption[]) => void` |
| search        | 搜索框值变化时的回调  | `(value: string) => void`                                                                      |
| blur          | 失去焦点时的回调      | -                                                                                              |
| focus         | 获得焦点时的回调      | -                                                                                              |
| visibleChange | 下拉框出现/隐藏时触发 | `(visible: boolean) => void`                                                                   |

#### CascaderOption

```ts
interface CascaderOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  children?: CascaderOption[];
  loading?: boolean;
  [key: string]: any;
}
```
