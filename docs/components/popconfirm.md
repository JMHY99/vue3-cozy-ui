# Popconfirm 气泡确认框

点击元素，弹出气泡式的确认框。

## 何时使用

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

和 `confirm` 弹出的全屏居中模态对话框相比，交互形式更轻量。

## 代码演示

### 基本用法

最简单的用法。

<demo src="../demos/popconfirm/popconfirm-01-basic.vue"></demo>

### 自定义按钮文字

使用 `okText` 和 `cancelText` 自定义按钮文字。

<demo src="../demos/popconfirm/popconfirm-02-custom-text.vue"></demo>

### 不同的弹出位置

可以通过设置 `placement` 属性来控制气泡确认框的弹出位置。

<demo src="../demos/popconfirm/popconfirm-03-placement.vue"></demo>

### 条件触发

可以判断是否需要弹出。

<demo src="../demos/popconfirm/popconfirm-04-condition.vue"></demo>

### 异步关闭

点击确定后异步关闭气泡确认框，例如提交表单。

<demo src="../demos/popconfirm/popconfirm-05-async.vue"></demo>

### 自定义图标

使用 `icon` 自定义提示图标。

<demo src="../demos/popconfirm/popconfirm-06-custom-icon.vue"></demo>

## API

### Popconfirm Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 确认框的标题 | string \| slot | - |
| okText | 确认按钮文字 | string | 确定 |
| cancelText | 取消按钮文字 | string | 取消 |
| okType | 确认按钮类型 | string | primary |
| okButtonLoading | 确认按钮 loading | boolean | false |
| cancelButtonLoading | 取消按钮 loading | boolean | false |
| disabled | 是否禁用 | boolean | false |
| placement | 气泡框位置，可选 `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` | string | top |
| trigger | 触发行为，可选 `hover` `focus` `click` | string | click |
| icon | 自定义弹出气泡 icon | string | exclamation-circle |
| mouseEnterDelay | 鼠标移入后延时多少才显示，单位：秒 | number | 0.1 |
| mouseLeaveDelay | 鼠标移出后延时多少才隐藏，单位：秒 | number | 0.1 |
| overlayClassName | 浮层类名 | string | - |
| overlayStyle | 浮层样式 | object | - |
| arrowPointAtCenter | 箭头是否指向目标元素中心 | boolean | false |

### Popconfirm Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确认按钮时触发 | function | - |
| cancel | 点击取消按钮时触发 | function | - |
| visibleChange | 显示隐藏的回调 | function(visible) | - |

### Popconfirm Slots

| 名称 | 说明 |
| --- | --- |
| default | 触发气泡确认框显示的元素 |
| title | 确认框标题 | 