# Affix 固钉

### 概述
::: tip
将页面元素钉在可视范围。
:::

### 基础用法

最简单的用法。

<demo src="../demos/affix/affix-01-base.vue"></demo>

### 滚动容器

用 target 设置 Affix 需要监听其滚动事件的元素，默认为 window。

<demo src="../demos/affix/affix-02-target.vue"></demo>

### 状态回调

可以获得是否固定的状态。

<demo src="../demos/affix/affix-03-emit.vue"></demo>

### API 文档

| 参数         | 说明                                | 类型                | 默认值         |
| ------------ | ----------------------------------- | ------------------- | -------------- |
| offsetBottom | 距离窗口底部达到指定偏移量后触发    | `Number`            | `null`         |
| offsetTop    | 距离窗口顶部达到指定偏移量后触发    | `Number`            | `null`         |
| target       | 设置 Affix 需要监听其滚动事件的元素 | `() => HTMLElement` | `() => window` |

### 事件

| 事件名 | 说明                         | 参数                |
| ------ | ---------------------------- | ------------------- |
| change | 固定状态改变时触发的回调函数 | `Function(affixed)` |
