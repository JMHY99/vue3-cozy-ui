# Skeleton 骨架屏

### 概述

::: tip
在需要等待加载内容的位置提供一个占位图形组合。
:::

### 基础用法

最简单的占位效果。

<demo src="../demos/skeleton/skeleton-01-base.vue"></demo>

### 复杂的组合

更复杂的组合。

<demo src="../demos/skeleton/skeleton-02-complex.vue"></demo>

### 动画效果

显示动画效果。

<demo src="../demos/skeleton/skeleton-03-active.vue"></demo>

### 包含头像

带头像的组合。

<demo src="../demos/skeleton/skeleton-04-avatar.vue"></demo>

### 加载中状态

当 `loading` 为 `true` 时，显示占位图。当 `loading` 为 `false` 时，显示实际内容。

<demo src="../demos/skeleton/skeleton-05-loading.vue"></demo>

### API

#### Skeleton 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| active | 是否展示动画效果 | boolean | - | false |
| avatar | 是否显示头像占位图 | boolean | - | false |
| avatar-size | 头像占位图大小 | string | large / small / default | default |
| loading | 为 true 时，显示占位图。反之则直接展示子���件 | boolean | - | true |
| paragraph | 是否显示段落占位图 | boolean | - | true |
| paragraph-rows | 段落占位图行数 | number | - | 3 |
| paragraph-width | 段落占位图宽度，可传数组来指定每一行的宽度 | number / string / Array<number \| string> | - | '100%' |
| round | 为 true 时，段落和标题显示圆角 | boolean | - | false |
| title | 是否显示标题占位图 | boolean | - | true |
| title-width | 标题占位图宽度 | number / string | - | '40%' | 