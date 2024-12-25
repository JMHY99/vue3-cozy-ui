# Transfer 穿梭框

在两栏之间移动元素,完成选择行为。

## 何时使用

- 需要在多个可选项中进行多选时。
- 比起 Select 和 TreeSelect,穿梭框占据更大的空间,可以展示可选项的更多信息。

## 代码演示

<demo src="../demos/transfer/transfer-01-basic.vue"></demo>

<demo src="../demos/transfer/transfer-02-search.vue"></demo>

## API

### Transfer Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data-source | 数据源 | `Array` | `[]` |
| model-value / v-model | 显示在右侧框数据的key集合 | `Array` | `[]` |
| titles | 标题集合，顺序从左至右 | `string[]` | `['源列表', '目标列表']` |
| row-key | 每行数据的唯一键 | `string` | `'key'` |
| render-prop | 每行数据显示的属性 | `string` | `'title'` |
| show-search | 是否显示搜索框 | `boolean` | `false` |

### Transfer Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选项在两栏之间转移时的回调函数 | `(targetKeys: string[], direction: string, moveKeys: string[]) => void` |
| update:model-value | 右侧框数据key集合改变时触发 | `(targetKeys: string[]) => void` | 