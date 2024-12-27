# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。

## 代码演示

### 基础用法

基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭。

<demo src="../demos/drawer/drawer-01-basic.vue"></demo>

### 自定义位置

自定义位置，点击触发按钮抽屉从相应的位置滑出。

<demo src="../demos/drawer/drawer-02-placement.vue"></demo>

### 自定义尺寸

可以自定义抽屉的大小。

<demo src="../demos/drawer/drawer-03-size.vue"></demo>

### 多层抽屉

在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。

<demo src="../demos/drawer/drawer-04-multi.vue"></demo>

### 自定义内容

可以自定义标题、页脚等内容。

<demo src="../demos/drawer/drawer-05-custom.vue"></demo>

## API

### Drawer Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否显示抽屉 | `boolean` | `false` |
| title | 标题 | `string` | - |
| showHeader | 是否显示标题栏 | `boolean` | `true` |
| placement | 抽屉的方向 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| size | 抽屉的大小 | `'default' \| 'large'` | `'default'` |
| mask | 是否显示遮罩层 | `boolean` | `true` |
| maskClosable | 点击遮罩层是否允许关闭 | `boolean` | `true` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| width | 宽度，在 placement 为 right 或 left 时使用 | `string \| number` | `378` |
| height | 高度，在 placement 为 top 或 bottom 时使用 | `string \| number` | `378` |
| zIndex | 设置抽屉的 z-index | `number` | `1000` |

### Drawer Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 点击遮罩层或关闭按钮的回调 | - |

### Drawer Slots

| 名称 | 说明 |
| --- | --- |
| default | 抽屉内容 |
| title | 标题内容 |
| footer | 抽屉页脚部分 