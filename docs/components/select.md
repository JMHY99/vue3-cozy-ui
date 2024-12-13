# Select 选择器

下拉选择器。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

## 基本使用

最基本的选择器。

<demo src="../demos/select/select-01-basic.vue"></demo>

## 多选模式

多选模式。

<demo src="../demos/select/select-02-multiple.vue"></demo>

## 带搜索框

展开后可对选项进行搜索。

<demo src="../demos/select/select-03-search.vue"></demo>

## 分组

使用 OptionGroup 进行选项分组。

<demo src="../demos/select/select-04-group.vue"></demo>

## 尺寸

三种尺寸的选择器。

<demo src="../demos/select/select-05-size.vue"></demo>

## API

### Select Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 指定当前选中的条目 | string \| number \| boolean \| (string \| number \| boolean)[] | - |
| disabled | 是否禁用 | boolean | false |
| multiple | 是否多选 | boolean | false |
| placeholder | 选择框默认文字 | string | - |
| clearable | 是否可以清空选项 | boolean | false |
| size | 选择框大小 | 'large' \| 'default' \| 'small' | 'default' |
| loading | 加载中状态 | boolean | false |
| show-search | 使单选模式可搜索 | boolean | false |
| filter-option | 是否根据输入项进行筛选 | boolean \| function(inputValue, option) | true |
| max-tag-count | 最多显示多少个 tag，响应式模式会对性能产生损耗 | number | - |

### Select Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中 option，或 input 的 value 变化时触发 | function(value, option) |
| search | 文本框值变化时回调 | function(value: string) |
| clear | 清除内容时回调 | function |
| focus | 获取焦点时回调 | function |
| blur | 失去焦点时回调 | function |

### Option Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值 | string \| number \| boolean | - |
| label | 选项显示的内容 | string | - |
| disabled | 是否禁用 | boolean | false |

### OptionGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 组名 | string | - |