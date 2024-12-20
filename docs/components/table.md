# Table 表格

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 代码演示

### 基本用法

简单的表格

<demo src="../demos/table/table-01-base.vue"></demo>


### 可选择

第一列是联动的选择框。

<demo src="../demos/table/table-02-selection.vue"></demo>

### 排序和筛选

对某一列数据进行排序和筛选。

<demo src="../demos/table/table-03-sort-filter.vue"></demo>

### 固定表头

方便一次性展示大量数据。

<demo src="../demos/table/table-04-fixed-header.vue"></demo>

### 固定列

对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据。

<demo src="../demos/table/table-05-fixed-column.vue"></demo>

### 自定义单元格

表格支持自定义单元格的内容。

<demo src="../demos/table/table-06-custom-cell.vue"></demo>

### 可展开

当表格内容较多不能一次性完全展示时。

<demo src="../demos/table/table-07-expandable.vue"></demo>

## API

### Table

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bordered | 是否展示外边框和列边框 | boolean | false |
| columns | 表格列的配置描述 | [ColumnProps](#column)[] | - |
| data | 数据数组 | object[] | - |
| loading | 页面是否加载中 | boolean | false |
| pagination | 分页器，参考[配置项](#pagination)或 `false` | object \| false | - |
| rowKey | 表格行 key 的取值，可以是字符串或一个函数 | string \| function(record): string | 'key' |
| rowSelection | 列表项是否可选择，[配置项](#rowselection) | object | - |
| scroll | 表格是否可滚动，也可以指定滚动区域的宽、高 | `{ x: number \| true, y: number }` | - |
| size | 表格大小 | `large` \| `middle` \| `small` | `middle` |
| title | 表格标题 | string \| slot | - |
| footer | 表格尾部 | string \| slot | - |
| direction | 表格布局方向 | `ltr` \| `rtl` | `ltr` |
| expandable | 展开行配置，参考[配置项](#expandable) | object | - |

### Table Column

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 列标题 | string | - |
| prop | 列数据在数据项中对应的路径 | string | - |
| width | 列宽度 | string \| number | - |
| align | 对齐方式 | `left` \| `center` \| `right` | `left` |
| fixed | 是否固定列 | `left` \| `right` | - |
| sortable | 排序方法 | boolean \| ((a: any, b: any) => number) | - |
| filters | 筛选菜单项 | { text: string, value: any }[] | - |
| render | 自定义渲染函数 | (text: any, record: any, index: number) => any | - |

### Table Column Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| header | 自定义表头 | - |
| default | 自定义单元格内容 | { text: any, record: any, index: number } |

### Column

列描述数据对象，是 columns 中的一项。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 设置列的对齐方式 | `left` \| `right` \| `center` | `left` |
| dataIndex | 列数据在数据项中对应的路径 | string \| string[] | - |
| fixed | 列是否固定 | `left` \| `right` | - |
| key | 列的唯一标识 | string | - |
| slots | 插槽配置 | `{ title?: string, customRender?: string }` | - |
| sorter | 排序函数 | boolean \| ((a: any, b: any) => number) | - |
| sortOrder | 排序的受控属性 | `ascend` \| `descend` \| null | - |
| title | 列头显示文字 | string | - |
| width | 列宽度 | string \| number | - |
| filters | 表头的筛选菜单项 | { text: string, value: string \| number \| boolean }[] | - |
| onFilter | 本地模式下，确定筛选的运行函数 | (value: any, record: any) => boolean | - |

### rowSelection

选择功能的配置。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selectedRowKeys | 指定选中项的 key 数组 | (string \| number)[] | [] |
| type | 多选/单选 | `checkbox` \| `radio` | `checkbox` |
| onChange | 选中项发生变化时的回调 | (selectedRowKeys: (string \| number)[], selectedRows: any[]) => void | - |
| onSelect | 用户手动选择/取消选择某行的回调 | (record: any, selected: boolean, selectedRows: any[], nativeEvent: Event) => void | - |
| onSelectAll | 用户手动选择/取消选择所有行的回调 | (selected: boolean, selectedRows: any[], changeRows: any[]) => void | - |
| fixed | 把选择框列固定在左边 | boolean | - |
| columnWidth | 自定义列表选择框宽度 | string \| number | `32px` |
| columnTitle | 自定义列表选择框标题 | string | - |

### pagination

分页器的配置项。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前页数 | number | - |
| pageSize | 每页条数 | number | - |
| total | 总数 | number | - |
| showSizeChanger | 是否可以改变 pageSize | boolean | false |
| showQuickJumper | 是否可以快速跳转至某页 | boolean | false |
| showTotal | 用于显示数据总量和当前数据顺序 | (total: number, range: [number, number]) => string | - |
| onChange | 页码改变的回调 | (page: number, pageSize: number) => void | - |
| disabled | 禁用分页 | boolean | false |
| hideOnSinglePage | 只有一页时是否隐藏分页器 | boolean | false |

### expandable

展开功能的配置。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expandedRowKeys | 展开的行的 key 数组 | (string \| number)[] | - |
| expandedRowRender | 额外的展开行内容渲染函数 | (record: any, index: number, indent: number, expanded: boolean) => any | - |
| expandRowByClick | 是否允许点击行展开 | boolean | false |
| onExpand | 点击展开图标时触发 | (expanded: boolean, record: any) => void | - |
| onExpandedRowsChange | 展开的行变化时触发 | (expandedRows: any[]) => void | - |
| fixed | 把展开图标列固定在左边 | boolean | - |
| columnWidth | 自定义展开列宽度 | string \| number | - |
| columnTitle | 自定义展开列标题 | string | - |