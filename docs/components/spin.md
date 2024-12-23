# Spin 加载中

### 概述

::: tip
用于页面和区块的加载中状态。
:::

### 基础用法

一个简单的 loading 状态。

<demo src="../demos/spin/spin-01-base.vue"></demo>

### 各种大小

小的用于文本加载，默认用于卡片容器级加载，大的用于页面级加载。

<demo src="../demos/spin/spin-02-size.vue"></demo>

### 容器

可以给任何元素添加加载状态。

<demo src="../demos/spin/spin-03-container.vue"></demo>

### 自定义描述文案

自定义描述文案。

<demo src="../demos/spin/spin-04-tip.vue"></demo>

### 加载类型

提供了五种加载动画类型，可以根据场景选择。

<demo src="../demos/spin/spin-06-types.vue"></demo>

### API

#### Spin 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| spinning | 是否为加载中状态 | boolean | - | true |
| size | 组件大小 | string | small / default / large | default |
| tip | 当作为包裹元素时，可以自定义描述文案 | string | - | - |
| delay | 延迟显示加载效果的时间（防止闪烁） | number | - | 0 |
| type | 加载动画类型 | string | circle / wave / bounce / cardio / square | circle |

#### Spin 插槽

| 名称 | 说明 |
| --- | --- |
| default | 被包裹的内容 | 