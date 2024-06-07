---
pageClass: button-page-class
---

# Button 按钮

### 概述

::: tip
按钮用于触发一个操作，是用户与应用进行交互的重要方式之一。
:::

### 基础用法

创建不同样式的按钮，可以通过设置 `type` 属性为 primary、info、success、warning 或 danger。如果不设置 `type` 属性，则按钮将采用默认样式。

<demo src="../demos/button/button-01-base.vue"></demo>

### 禁用状态

通过添加 `disabled` 属性，可以将按钮设置为禁用状态。

<demo src="../demos/button/button-02-disabled.vue"></demo>

### 圆形按钮

使用`circle`属性，实现圆形按钮

<demo src="../demos/button/button-03-circle.vue"></demo>

### 幽灵按钮

用`ghost`属性设置为幽灵按钮

<demo src="../demos/button/button-04-ghost.vue"></demo>

### 按钮尺寸

用`size`属性设置按钮尺寸大小

<demo src="../demos/button/button-05-size.vue"></demo>

### 加载状态

用`loading`属性设置按钮加载状态

<demo src="../demos/button/button-06-loading.vue"></demo>

### 按钮组

将多个按钮放入按钮组中，可以实现按钮组合的效果。

<demo src="../demos/button/button-07-button-group.vue"></demo>

### API

| 参数     | 说明           | 类型    | 可选值                                      | 默认值 |
| -------- | -------------- | ------- | ------------------------------------------- | ------ |
| type     | 类型           | string  | primary / success / warning / danger / info | —      |
| disabled | 是否禁用状态   | boolean | —                                           | false  |
| circle   | 是否圆形按钮   | boolean | —                                           | false  |
| ghost    | 是否幽灵按钮   | boolean | —                                           | false  |
| size     | 按钮尺寸大小   | string  | large / middle / small                      | —      |
| loading  | 是否加载中状态 | boolean | —                                           | false  |
