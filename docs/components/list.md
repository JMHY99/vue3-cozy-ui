# List 列表

### 概述

::: tip
列表组件用于展示一组数据，可以承载文字、列表、图片、段落等内容，是最基础的数据展示形式之一。
:::

### 基础用法

最简单的列表使用，展示一组文本数据。

<demo src="../demos/list/list-01-base.vue"></demo>

### 基础列表

展示带有头像、标题、描述等元信息的列表，以及操作区域。

<demo src="../demos/list/list-02-basic.vue"></demo>

### 加载更多

结合分页组件，实现加载更多功能。通过 `loading` 属性显示加载中状态。

<!-- <demo src="../demos/list/list-03-loadmore.vue"></demo> -->

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bordered | 是否展示边框 | boolean | false |
| dataSource | 列表数据源 | any[] | - |
| footer | 列表底部 | string \| slot | - |
| header | 列表头部 | string \| slot | - |
| loading | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean | false |
| pagination | 对应的分页配置 | object | - |
| size | list 的尺寸 | 'default' \| 'large' \| 'small' | 'default' |
| split | 是否展示分割线 | boolean | true |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 页码改变的回调 | `function(page: number, pageSize: number)` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| header | 列表头部 | - |
| footer | 列表底部 | - |
| loading | 自定义加载中内容 | - |
| empty | 自定义空内容 | - |
| item | 列表项内容 | `{ item: any, index: number }` |

### List Item 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| actions | 列表操作组 | slot[] | - |
| extra | 额外内容 | slot | - |

### List Item 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| actions | 列表操作组 | - |
| extra | 额外内容 | - |
| meta | 列表元信息 | - |
| avatar | 头像 | - |
| title | 标题 | - |
| description | 描述 | - |
</rewritten_file> 