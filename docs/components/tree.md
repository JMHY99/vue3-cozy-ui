# Tree 树形控件

树形数据展示控件。

## 何时使用

- 文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。
- 使用 `树控件` 可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 代码演示

### 基本用法

最简单的用法，展示可选中，默认展开等功能。

<demo src="../demos/tree/tree-01-basic.vue"></demo>

### 可勾选

支持勾选框的树形控件。

<demo src="../demos/tree/tree-02-checkable.vue"></demo>

### 自定义图标

可以自定义展示图标。

<demo src="../demos/tree/tree-03-custom.vue"></demo>

### 异步加载

点击展开节点时动态加载数据。

<demo src="../demos/tree/tree-04-async.vue"></demo>

### 可搜索

可搜索的树形控件。

<demo src="../demos/tree/tree-05-search.vue"></demo>

### 拖拽排序

支持拖拽节点以改变顺序。

<demo src="../demos/tree/tree-06-draggable.vue"></demo>

### 虚拟滚动

通过虚拟滚动支持大数据量。

<demo src="../demos/tree/tree-07-virtual.vue"></demo>

### 连接线

带连接线的树形控件。

<demo src="../demos/tree/tree-08-line.vue"></demo>

## API

### Tree Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| treeData | 树形数据 | `TreeNodeData[]` | `[]` |
| fieldNames | 自定义节点字段名 | `object` | `{ title: 'title', key: 'key', children: 'children' }` |
| selectedKeys | 选中的节点 | `(string \| number)[]` | `[]` |
| defaultSelectedKeys | 默认选中的节点 | `(string \| number)[]` | `[]` |
| checkedKeys | 勾选的节点 | `(string \| number)[]` | `[]` |
| defaultCheckedKeys | 默认勾选的节点 | `(string \| number)[]` | `[]` |
| expandedKeys | 展开的节点 | `(string \| number)[]` | `[]` |
| defaultExpandedKeys | 默认展开的节点 | `(string \| number)[]` | `[]` |
| defaultExpandAll | 默认展开所有节点 | `boolean` | `false` |
| checkable | 是否显示复选框 | `boolean` | `false` |
| selectable | 是否可选中 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| draggable | 是否可拖拽 | `boolean` | `false` |
| allowDrop | 是否允许拖拽时放置 | `({ dropNode, dropPosition }) => boolean` | - |
| loadData | 异步加载数据 | `(node: TreeNodeData) => Promise<void>` | - |
| filterTreeNode | 按需筛选树节点 | `boolean \| ((searchValue: string, node: TreeNodeData) => boolean)` | - |
| virtual | 是否开启虚拟滚动 | `boolean` | `false` |
| height | 虚拟滚动容器高度 | `number` | `400` |
| showLine | 是否显示连接线 | `boolean` | `false` |
| showIcon | 是否显示图标 | `boolean` | `false` |
| icon | 自定义图标 | `(props: { expanded: boolean, selected: boolean, checked: boolean }) => VNode` | - |
| switcherIcon | 自定义展开/折叠图标 | `(props: { expanded: boolean }) => VNode` | - |
| blockNode | 是否节点占据一行 | `boolean` | `false` |

### Tree Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 点击树节点时触发 | `(selectedKeys: (string \| number)[], { selected: boolean, selectedNodes: TreeNodeData[], node: TreeNodeData, event: Event }) => void` |
| check | 点击复选框时触发 | `(checkedKeys: (string \| number)[], { checked: boolean, checkedNodes: TreeNodeData[], node: TreeNodeData, event: Event }) => void` |
| expand | 展开/收起节点时触发 | `(expandedKeys: (string \| number)[], { expanded: boolean, node: TreeNodeData }) => void` |
| load | 异步加载数据完成时触发 | `(loadedKeys: (string \| number)[], { node: TreeNodeData }) => void` |
| dragstart | 开始拖拽时触发 | `({ event: DragEvent, node: TreeNodeData }) => void` |
| dragenter | 拖拽进入节点时触发 | `({ event: DragEvent, node: TreeNodeData, expandedKeys: (string \| number)[] }) => void` |
| dragover | 拖拽经过节点时触发 | `({ event: DragEvent, node: TreeNodeData }) => void` |
| dragleave | 拖拽离开节点时触发 | `({ event: DragEvent, node: TreeNodeData }) => void` |
| drop | 拖拽放置时触发 | `({ event: DragEvent, node: TreeNodeData, dragNode: TreeNodeData, dropPosition: number }) => void` |
| dragend | 拖拽结束时触发 | `({ event: DragEvent, node: TreeNodeData }) => void` |

### TreeNodeData

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 节点唯一标识 | `string \| number` | - |
| title | 节点显示的内容 | `string` | - |
| children | 子节点 | `TreeNodeData[]` | - |
| disabled | 是否禁用节点 | `boolean` | `false` |
| selectable | 是否可选中 | `boolean` | `true` |
| checkable | 是否显示复选框 | `boolean` | `true` |
| disableCheckbox | 是否禁用复选框 | `boolean` | `false` |
| isLeaf | 是否是叶子节点 | `boolean` | `false` |
| icon | 自定义图标 | `string \| (() => VNode)` | - |
| switcherIcon | 自定义展开/折叠图标 | `string \| (() => VNode)` | - |

### Tree Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| scrollTo | 虚拟滚动时滚动到指定位置 | `(options: { index?: number, key?: string \| number, align?: 'auto' \| 'top' \| 'bottom' }) => void` |
| getCheckedNodes | 获取勾选的节点 | `(checked?: boolean) => TreeNodeData[]` |
| getSelectedNodes | 获取选中的节点 | `() => TreeNodeData[]` |
| getExpandedNodes | 获取展开的节点 | `() => TreeNodeData[]` |
| getHalfCheckedKeys | 获取半选状态的节点 | `() => (string \| number)[]` | 