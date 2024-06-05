---
pageClass: icon-page-class
---

# Icon 图标

### 概述

图标组件集成了一套常用的图标库，为开发者提供了丰富多样的图标选择，以满足不同应用场景下的视觉需求。

### 基础用法

直接指定图标对应的`name`属性显示对应的图标

::: demo

```vue
<template>
  <c-icon name="c-minus-circle-outlined"></c-icon>
  <c-icon name="c-check-circle-outlined"></c-icon>
  <c-icon name="c-close-circle-outlined"></c-icon>
  <c-icon name="c-set-outlined"></c-icon>
  <c-icon name="c-scene-outlined"></c-icon>
  <c-icon name="c-skin-outlined"></c-icon>
  <c-icon name="c-folder"></c-icon>
  <c-icon name="c-duihuan"></c-icon>
  <c-icon name="c-fasong"></c-icon>
  <c-icon name="c-fenxiang"></c-icon>
  <c-icon name="c-code-outlined"></c-icon>
  <c-icon name="c-openness-outlined"></c-icon>
  <c-icon name="c-shanchu1"></c-icon>
  <c-icon name="c-qunzu"></c-icon>
  <c-icon name="c-wode2"></c-icon>
</template>
```

:::

### 图标大小

通过设置`size`属性来控制图标的大小

::: demo

```html
<c-icon size="10" name="c-minus-circle-outlined"></c-icon>
<c-icon size="12" name="c-check-circle-outlined"></c-icon>
<c-icon size="14" name="c-close-circle-outlined"></c-icon>
<c-icon size="16" name="c-set-outlined"></c-icon>
<c-icon size="18" name="c-scene-outlined"></c-icon>
<c-icon size="20" name="c-skin-outlined"></c-icon>
<c-icon size="22" name="c-folder"></c-icon>
<c-icon size="24" name="c-duihuan"></c-icon>
<c-icon size="26" name="c-fasong"></c-icon>
<c-icon size="28" name="c-fenxiang"></c-icon>
<c-icon size="30" name="c-code-outlined"></c-icon>
<c-icon size="34" name="c-openness-outlined"></c-icon>
<c-icon size="36" name="c-shanchu1"></c-icon>
<c-icon size="38" name="c-qunzu"></c-icon>
<c-icon size="40" name="c-wode2"></c-icon>
```

:::

### 旋转图标

对某些应用场景使用`spin`属性实现旋转加载效果的图标
::: demo

```html
<c-icon spin name="c-refresh-outlined"></c-icon>
<c-icon spin name="c-refresh-outlined"></c-icon>
<c-icon spin name="c-refresh-outlined"></c-icon>
<c-icon spin name="c-refresh-outlined"></c-icon>
<c-icon spin name="c-refresh-outlined"></c-icon>
<c-icon spin name="c-refresh-outlined"></c-icon>
<c-icon spin name="c-refresh-outlined"></c-icon>
<c-icon spin name="c-refresh-outlined"></c-icon>
<c-icon spin name="c-refresh-double-outlined"></c-icon>
<c-icon spin name="c-refresh-double-outlined"></c-icon>
<c-icon spin name="c-refresh-double-outlined"></c-icon>
<c-icon spin name="c-refresh-double-outlined"></c-icon>
<c-icon spin name="c-refresh-double-outlined"></c-icon>
<c-icon spin name="c-refresh-double-outlined"></c-icon>
<c-icon spin name="c-refresh-double-outlined"></c-icon>
```

:::

### 图标集合

<!-- <IconList/> -->

### API

| 参数 | 说明     | 类型    | 可选值     | 默认值 |
| ---- | -------- | ------- | ---------- | ------ |
| name | 图标名称 | string  | -          | -      |
| size | 尺寸大小 | number  | -          | 24     |
| spin | 是否旋转 | boolean | true/false | false  |
