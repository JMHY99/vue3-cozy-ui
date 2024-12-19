# Card 卡片

### 概述

::: tip
通用卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。
:::

### 基础用法

最基础的卡片容器。

<demo src="../demos/card/card-01-basic.vue">基础用法</demo>

### 无边框卡片

通过设置 `bordered` 为 `false` 可以不添加边框。

<demo src="../demos/card/card-02-noborder.vue">无边框卡片</demo>

### 简洁卡片

只包含内容区域。

<demo src="../demos/card/card-03-simple.vue">简洁卡片</demo>

### 带封面的卡片

可以在卡片中加入图片、视频等多媒体内容，可以通过 `hoverable` 属性让卡片在鼠标悬浮时浮起。

<demo src="../demos/card/card-04-cover.vue">带封面的卡片</demo>

### 支持更多内容配置

可以利用 `actions` 和 `extra` 插槽配置额外的操作区域。

<demo src="../demos/card/card-05-actions.vue">带操作的卡片</demo>

### 加载中状态

通过 `loading` 属性可以让卡片处于加载中状态。

<demo src="../demos/card/card-06-loading.vue">加载中的卡片</demo>

### 不同尺寸

通过设置 `size` 可以使用不同大小的卡片。

<demo src="../demos/card/card-07-size.vue">不同尺寸</demo>

### API

#### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | string | - |
| bordered | 是否有边框 | boolean | true |
| size | 卡片大小 | 'default' \| 'small' | 'default' |
| type | 卡片类型 | string | - |
| hoverable | 鼠标悬浮时是否浮起 | boolean | false |
| loading | 是否显示加载状态 | boolean | false |

#### 插槽

| 名称 | 说明 |
| --- | --- |
| default | 卡片内容 |
| title | 卡片标题 |
| extra | 卡片右上角的操作区域 |
| cover | 卡片封面 |
| actions | 卡片底部的操作组 | 