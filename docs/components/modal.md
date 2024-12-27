# Modal 对话框

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。

## 代码演示

### 基础用法

第一个对话框。

<demo src="../demos/modal/modal-01-basic.vue"></demo>

### 异步关闭

点击确定后异步关闭对话框，例如提交表单。

<demo src="../demos/modal/modal-02-async.vue"></demo>

### 自定义页脚

更复杂的例子，自定义了页脚的按钮。

<demo src="../demos/modal/modal-03-footer.vue"></demo>

### 确认对话框

使用 `confirm()` 可以快捷地弹出确认框。

<demo src="../demos/modal/modal-04-confirm.vue"></demo>

### 自定义位置

使用 `centered` 或自定义 `style.top` 设置对话框位置。

<demo src="../demos/modal/modal-05-position.vue"></demo>

### 自定义渲染对话框

自定义渲染对话框内容。

<demo src="../demos/modal/modal-06-custom.vue"></demo>

## API

### Modal Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 对��框是否可见 | `boolean` | `false` |
| title | 标题 | `string` | - |
| mask | 是否显示遮罩层 | `boolean` | `true` |
| maskClosable | 点击遮罩层是否允许关闭 | `boolean` | `true` |
| closable | 是否显示右上角的关闭按钮 | `boolean` | `true` |
| centered | 垂直居中展示 Modal | `boolean` | `false` |
| width | 宽度 | `string \| number` | `520` |
| size | 对话框大小 | `'small' \| 'default' \| 'large'` | `'default'` |
| zIndex | 设置 Modal 的 z-index | `number` | `1000` |
| keyboard | 是否支持键盘 esc 关闭 | `boolean` | `true` |
| showFooter | 是否显示底部内容 | `boolean` | `true` |
| okText | 确认按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| confirmLoading | 确定按钮 loading | `boolean` | `false` |

### Modal Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| ok | 点击确定回调 | - |
| cancel | 点击遮罩层或右上角叉或取消按钮的回调 | - |

### Modal Slots

| 名称 | 说明 |
| --- | --- |
| default | 对话框的内容 |
| title | 对话框标题区的内容 |
| footer | 对话框底部区域，设置为 footer={null} 则不显示 | 