# 虚拟表格 VTable

### 概述

::: tip
虚拟表格组件用于展示大量数据时优化性能，通过只渲染可视区域内的行和列来减少 DOM 节点数量。
:::

### 实现思路

虚拟表格的核心实现原理如下：

1. 双向虚拟滚动
   - 纵向虚拟滚动：仅渲染可视区域内的行
   - 横向虚拟滚动：处理大量列和固定列的情况
   - 滚动同步：表头和内容区域的横向滚动同步
   - 虚拟定位：使用 transform 控制内容区域的位置

2. 固定列实现
   - 列分组：区分左固定列、普通列、右固定列
   - 定位方式：使用 position: sticky 实现固定效果
   - 阴影处理：添加渐变阴影提示固定列边界
   - 层级管理：处理固定列与普通列的层级关系

3. 表格布局
   - 表头固定：使用绝对定位固定表头
   - 列宽控制：支持固定宽度和自适应宽度
   - 对齐方式：支持左对齐、居中、右对齐
   - 边框处理：处理固定列的边框重叠问题

4. 性能优化
   - 渲染优化：使用 transform 代替定位
   - 滚动优化：使用 RAF 处理滚动事件
   - 重排重绘：最小化布局抖动
   - 内存优化：及时清理不可见区域的 DOM

5. 功能增强
   - 行选择：支持单选和多选
   - 排序筛选：支持列排序和数据筛选
   - 自定义列：支持自定义列的渲染内容
   - 行列合并：支持单元格合并

6. 交互优化
   - 滚动条：优化滚动条样式和交互
   - 高亮效果：行悬浮和选中状态
   - 斑马纹：支持奇偶行样式
   - 边界处理：处理滚动边界情况

### 基础用法

最基础的虚拟表格用法。

<demo src="../demos/v-table/v-table-01-basic.vue"></demo>

### 自定义列宽和对齐方式

通过 `width` 和 `align` 属性设置列的宽度和对齐方式。

<demo src="../demos/v-table/v-table-02-column.vue"></demo>

### 斑马纹表格

通过 `stripe` 属性设置斑马纹样式。

<demo src="../demos/v-table/v-table-03-stripe.vue"></demo>

### 自定义单元格内容

使用具名插槽自定义单元格内容。

<demo src="../demos/v-table/v-table-04-custom.vue"></demo>

### API

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据 | any[] | [] |
| columns | 表格列配置 | Column[] | [] |
| rowHeight | 行高 | number | 48 |
| height | 容器高度 | number | 400 |
| bufferSize | 预加载的行数 | number | 20 |
| rowKey | 行数据的唯一标识 | string | - |
| stripe | 是否显示斑马纹 | boolean | false |

#### Column

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 列的唯一标识 | string | - |
| title | 列标题 | string | - |
| width | 列宽度 | string \| number | - |
| align | 对齐方式 | 'left' \| 'center' \| 'right' | 'left' |

#### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| row-click | 点击行时触发 | (row: any, index: number) => void |

#### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| scrollToIndex | 滚动到指定索引的行 | (index: number) => void |

#### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| header-[key] | 自定义表头单元格内容 | { column: Column } |
| [key] | 自定义数据单元格内容 | { row: any, column: Column, index: number } | 