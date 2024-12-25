# Tree 树形控件

用于展示具有层级关系的数据。

## 何时使用

- 文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。
- 使用 `树控件` 可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 代码演示

<demo src="../demos/tree/tree-01-basic.vue"></demo>

<demo src="../demos/tree/tree-02-checkable.vue"></demo>

<demo src="../demos/tree/tree-03-custom.vue"></demo>

<demo src="../demos/tree/tree-04-draggable.vue"></demo>

## API

### Tree Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| treeData | 树的数据源 | `TreeNodeData[]` | `[]` |
| fieldNames | 自定义节点字段名 | `object` | `{ title: 'title', key: 'key', children: 'children' }` |
| selectedKeys | 选中的树节点 | `string[] \| number[]` | `[]` |
| expandedKeys | 展开的树节点 | `string[] \| number[]` | `[]` |
| checkedKeys | 勾选的树节点 | `string[] \| number[]` | `[]` |
| checkable | 是否显示复选框 | `boolean` | `false` |
| selectable | 是否可选中 | `boolean` | `true` |
| showLine | 是否显示连接线 | `boolean` | `false` |
| showIcon | 是否显示图标 | `boolean` | `false` |
| draggable | 是否可拖拽 | `boolean` | `false` |

### TreeNodeData

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 节点唯一标识 | `string \| number` | - |
| title | 节点标题 | `string` | - |
| children | 子节点 | `TreeNodeData[]` | - |
| disabled | 是否禁用节点 | `boolean` | `false` |
| disableCheckbox | 是否禁用复选框 | `boolean` | `false` |
| disableSelect | 是否禁用选中 | `boolean` | `false` |
| icon | 自定义图标 | `string` | - |
| isLeaf | 是否为叶子节点 | `boolean` | `false` |

### Tree Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 点击树节点时触发 | `(selectedKeys: string[] \| number[], event: { selected: boolean; selectedNodes: TreeNodeData[] }) => void` |
| check | 点击复选框时触发 | `(checkedKeys: string[] \| number[], event: { checked: boolean; checkedNodes: TreeNodeData[] }) => void` |
| expand | 展开/收起节点时触发 | `(expandedKeys: string[] \| number[], event: { expanded: boolean; node: TreeNodeData }) => void` |
| dragstart | 开始拖拽时触发 | `(event: DragEvent, node: TreeNodeData) => void` |
| dragend | 结束拖拽时触发 | `(event: DragEvent, node: TreeNodeData) => void` |
| drop | 放置节点时触发 | `(event: DragEvent, node: TreeNodeData, dragNode: TreeNodeData) => void` | 