# PageHeader 页头

### 概述

::: tip
页头位于页容器中，页容器顶部，起到了内容概览和引导页级操作的作用。
:::

### 基本用法

标准页头，适合使用在需要简单描述的场景。

<demo src="../demos/page-header/page-header-01-base.vue"></demo>

### 带面包屑

带面包屑页头，适合层级比较深的页面，让用户可以快速导航。

<demo src="../demos/page-header/page-header-02-breadcrumb.vue"></demo>

### 带内容

可以在页头中加入一些额外的内容，比如描述信息、操作按钮等。

<demo src="../demos/page-header/page-header-03-content.vue"></demo>

### 复杂的例子

使用操作区，并自定义子节点，适合使用在需要展示一些复杂的信息，帮助用户快速了解这个页面的信息和操作。

<demo src="../demos/page-header/page-header-04-complex.vue"></demo>

### API

#### PageHeader 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | - |
| subtitle | 子标题 | string | - |
| back | 返回按钮的文本 | string | - |
| ghost | 背景颜色 | boolean | true |

####  插槽

| 名称 | 说明 |
| --- | --- |
| title | 自定义标题内容 |
| subtitle | 自定义子标题内容 |
| avatar | 自定义头像区域 |
| back | 自定义返回区域 |
| tags | 自定义标题右侧的 tag 区域 |
| extra | 自定义操作区 |
| footer | 自定义页脚 |
| default | 自定义内容区 |

#### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| back | 点击返回按钮时的回调 | () => void | 