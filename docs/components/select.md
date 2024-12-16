# Select 选择器

下拉选择器。

### 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

### 基本使用

最基本的选择器。

<demo src="../demos/select/select-01-basic.vue"></demo>

### 多选模式

多选模式。

<demo src="../demos/select/select-02-multiple.vue"></demo>

### 带搜索框

展开后可对选项进行搜索。

<demo src="../demos/select/select-03-search.vue"></demo>

### 分组

使用 OptionGroup 进行选项分组。

<demo src="../demos/select/select-04-group.vue"></demo>

### 尺寸

三种尺寸的选择器。

<demo src="../demos/select/select-05-size.vue"></demo>

### 可清空选择

设置 `clearable` 属性可以启用清空功能。当选择器有值时，将鼠标悬停在选择框上会显示清空按钮。

<demo src="../demos/select/select-06-clearable.vue"></demo>

### API

#### Select Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 选中的值 | `string \| number \| boolean \| (string \| number \| boolean)[]` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| multiple | 是否多选 | `boolean` | `false` |
| placeholder | 选择框默认文本 | `string` | `'请选择'` |
| clearable | 是否可以清空选项 | `boolean` | `false` |
| size | 选择框大小 | `'large' \| 'small'` | - |
| loading | 加载中状态 | `boolean` | `false` |
| showSearch | 是否显示搜索框 | `boolean` | `false` |
| filterOption | 是否根据输入项进行筛选 | `boolean \| ((inputValue: string, option: OptionType) => boolean)` | `true` |
| maxTagCount | 多选模式下最多显示的标签数 | `number` | - |
| emptyText | 无数据时显示的文本 | `string` | `'暂无数据'` |

#### Select Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中值发生变化时触发 | `(value: string \| number \| boolean \| (string \| number \| boolean)[]) => void` |
| clear | 点击清除按钮时触发 | `() => void` |
| search | 搜索框值变化时触发 | `(value: string) => void` |
| focus | 获得焦点时触发 | `(e: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(e: FocusEvent) => void` |

#### Option Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值 | `string \| number \| boolean` | - |
| label | 选项标签 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |

#### OptionGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 分组标签 | `string` | - |