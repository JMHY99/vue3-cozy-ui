# TreeSelect 树选择

### 概述

::: tip
树型选择控件。

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。
:::


### 基本使用

最简单的用法。

<demo src="../demos/tree-select/tree-select-01-basic.vue"></demo>

### 多选模式

多选的树选择。

<demo src="../demos/tree-select/tree-select-02-multiple.vue"></demo>

### 可搜索

通过搜索框快速查找内容。

<demo src="../demos/tree-select/tree-select-03-search.vue"></demo>

### 异步加载

异步加载树节点。

<demo src="../demos/tree-select/tree-select-04-async.vue"></demo>

### 自定义显示

自定义显示节点内容。

<demo src="../demos/tree-select/tree-select-05-custom.vue"></demo>

### 尺寸

不同尺寸的选择器。

<demo src="../demos/tree-select/tree-select-06-size.vue"></demo>

### API

#### TreeSelect Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 指定当前选中的条目 | `string \| number \| (string \| number)[]` | - |
| treeData | 树形数据 | `TreeNodeData[]` | `[]` |
| fieldNames | 自定义节点字段名 | `object` | `{ title: 'title', key: 'key', children: 'children' }` |
| multiple | 支持多选 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 选择框大小 | `'large' \| 'small'` | - |
| placeholder | 选择框默认文字 | `string` | `'请选择'` |
| searchPlaceholder | 搜索框默认文字 | `string` | `'请输入搜索内容'` |
| allowClear | 显示清除按钮 | `boolean` | `false` |
| showSearch | 是否显示搜索框 | `boolean` | `false` |
| filterTreeNode | 是否根据输入项进行筛选，默认用 title 匹配 | `boolean \| ((inputValue: string, treeNode: TreeNodeData) => boolean)` | `true` |
| loadData | 异步加载数据 | `(node: TreeNodeData) => Promise<void>` | - |
| defaultExpandedKeys | 默认展开的树节点 | `(string \| number)[]` | `[]` |
| defaultExpandAll | 默认展开所有树节点 | `boolean` | `false` |
| virtual | 设置 false 时关闭虚拟滚动 | `boolean` | `false` |
| treeHeight | 虚拟滚动高度 | `number` | `256` |
| maxTagCount | 最多显示多少个 tag，响应式模式会对性能产生损耗 | `number` | - |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | `(omittedValues: any[]) => string` | - |
| treeNodeLabelProp | 作为显示的 prop 设置 | `string` | `title` |
| emptyText | 当下拉列表为空时显示的内容 | `string` | `'暂无数据'` |

#### TreeSelect Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中树节点时调用 | `(value: string \| number \| (string \| number)[]) => void` |
| search | 文本框值变化时回调 | `(value: string) => void` |
| select | 被选中时调用 | `(value: string \| number, node: TreeNodeData, extra: { selected: boolean }) => void` |
| treeExpand | 展开节点时调用 | `(expandedKeys: (string \| number)[], { expanded: boolean, node: TreeNodeData }) => void` |
| dropdownVisibleChange | 展开下拉菜单的回调 | `(open: boolean) => void` |
| load | 异步加载数据完成时的回调 | `(loadedKeys: (string \| number)[], { node: TreeNodeData }) => void` |

#### TreeNodeData

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 节点唯一标识 | `string \| number` | - |
| title | 节点显示的内容 | `string` | - |
| children | 子节点 | `TreeNodeData[]` | - |
| disabled | 是否禁用节点 | `boolean` | `false` |
| selectable | 是否可选 | `boolean` | `true` |
| checkable | 是否显示复选框 | `boolean` | `true` |
| isLeaf | 是否是叶子节点 | `boolean` | `false` | 