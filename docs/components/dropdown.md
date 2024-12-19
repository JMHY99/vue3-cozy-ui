# Dropdown 下拉菜单

向下弹出的列表。

## 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

## 代码演示

### 基本使用
最简单的下拉菜单。

<demo src="../demos/dropdown/dropdown-01-basic.vue"></demo>

### 弹出位置
支持 6 个弹出位置。

<demo src="../demos/dropdown/dropdown-02-placement.vue"></demo>

### 触发方式
默认是移入触发菜单，可以点击触发。

<demo src="../demos/dropdown/dropdown-03-trigger.vue"></demo>

### 带分割线的菜单
下拉菜单可以包含分割线。

<demo src="../demos/dropdown/dropdown-04-with-divider.vue"></demo>

### 禁用状态
点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

<demo src="../demos/dropdown/dropdown-05-disabled.vue"></demo>

## API

### Dropdown Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发下拉的行为 | `'hover' \| 'click'` | `'hover'` |
| disabled | 菜单是否禁用 | `boolean` | `false` |
| overlayClassName | 下拉根元素的类名 | `string` | - |
| overlayStyle | 下拉根元素的样式 | `CSSProperties` | - |
| placement | 菜单弹出位置 | `'bottomLeft' \| 'bottomCenter' \| 'bottomRight' \| 'topLeft' \| 'topCenter' \| 'topRight'` | `'bottomLeft'` |
| mouseEnterDelay | 当 trigger 为 hover 时，鼠标移入后延时多少才显示 Dropdown，单位：毫秒 | `number` | `100` |
| mouseLeaveDelay | 当 trigger 为 hover 时，鼠标移出后延时多少才隐藏 Dropdown，单位：毫秒 | `number` | `100` |

### Dropdown Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| visibleChange | 菜单显示状态改变时调用 | `(visible: boolean) => void` |
| click | 点击菜单项时触发 | `(e: MouseEvent) => void` |

### Dropdown Slots

| 名称 | 说明 |
| --- | --- |
| default | 触发下拉菜单的元素 |
| overlay | 菜单内容，通常是 `<c-menu>` 组件 | 