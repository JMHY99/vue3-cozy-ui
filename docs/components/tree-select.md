# TreeSelect 树选择

树型选择控件。

## 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。

## 代码演示

<demo src="../demos/tree-select/tree-select-01-basic.vue"></demo>

<demo src="../demos/tree-select/tree-select-02-multiple.vue"></demo>

<demo src="../demos/tree-select/tree-select-03-search.vue"></demo>

## API

### TreeSelect Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| treeData | 树形数据 | `TreeNodeData[]` | `[]` |
| fieldNames | 自定义节点字段名 | `object` | `{ title: 'title', key: 'key', children: 'children' }` |
| modelValue / v-model | 选中的值 | `string \| number \| (string \| number)[]` | - |
| multiple | 是否多选 | `boolean` | `false` |
| placeholder | 选择框默认文字 | `string` | `'请选择'` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `false` |
| showSearch | 是否显示搜索框 | `boolean` | `false` |

### TreeNodeData

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 节点唯一标识 | `string \| number` | - |
| title | 节点标题 | `string` | - |
| children | 子节点 | `TreeNodeData[]` | - |
| disabled | 是否禁用节点 | `boolean` | `false` |

### TreeSelect Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中值发生变化时触发 | `(value: string \| number \| (string \| number)[]) => void` |
| search | 搜索框内容变化时触发 | `(value: string) => void` | 