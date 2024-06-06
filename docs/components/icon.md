---
pageClass: icon-page-class
---

# Icon 图标

### 概述

图标组件集成了一套常用的图标库，为开发者提供了丰富多样的图标选择，以满足不同应用场景下的视觉需求。

### 基础用法

直接指定图标对应的`name`属性显示对应的图标

<demo src="../demos/icon/icon-01-base.vue"></demo>

### 图标大小

通过设置`size`属性来控制图标的大小

<demo src="../demos/icon/icon-02-size.vue"></demo>

### 旋转图标

对某些应用场景使用`spin`属性实现旋转加载效果的图标

<demo src="../demos/icon/icon-03-spin.vue"></demo>

### 图标集合

<!-- <IconList/> -->

### API

| 参数 | 说明     | 类型    | 可选值     | 默认值 |
| ---- | -------- | ------- | ---------- | ------ |
| name | 图标名称 | string  | -          | -      |
| size | 尺寸大小 | number  | -          | 24     |
| spin | 是否旋转 | boolean | true/false | false  |
