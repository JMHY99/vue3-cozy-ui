# Tag 标签

### 概述

::: tip

进行标记和分类的小标签。

- 用于标记事物的属性和维度。
- 进行分类。
::: 


### 基本用法

基本标签的用法。

<demo src="../demos/tag/tag-01-base.vue"></demo>

### 可选择标签

可通过 `checkable` 实现类似 Checkbox 的效果。

<demo src="../demos/tag/tag-02-checkable.vue"></demo>

### 多彩标签

我们添加了多种预设色彩的标签样式，用作不同场景使用。

<demo src="../demos/tag/tag-03-colorful.vue"></demo>

### 预设状态的标签

预设五种状态颜色，可以通过设置 `type` 为 `success`、`processing`、`error`、`warning` 和 `default` 来代表不同的状态。

<demo src="../demos/tag/tag-04-status.vue"></demo>

### 可关闭标签

可关闭的标签，点击关闭按钮后会消失。

<demo src="../demos/tag/tag-05-closeable.vue"></demo>

### 图标按钮

当需要在 Tag 内嵌入图标时，可以设置 `icon` 属性。

<demo src="../demos/tag/tag-06-icon.vue"></demo>

### API

#### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bordered | 是否有边框 | boolean | true |
| closable | 标签是否可以关闭 | boolean | false |
| color | 标签色 | string | - |
| icon | 设置图标 | string | - |
| type | 设置标签类型 | `success` \| `processing` \| `error` \| `warning` \| `default` | - |
| checkable | 是否可选中 | boolean | false |
| checked(v-model) | 是否选中 | boolean | false |

#### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭时的回调 | (e: MouseEvent) => void |
| click | 点击标签时的回调 | (e: MouseEvent) => void |
| update:checked | 选中状态改变时的回调 | (checked: boolean) => void |
| afterClose | 关闭动画完成后的回调 | () => void |