# Result 结果

用于反馈一系列操作任务的处理结果。

## 何时使用

当有重要操作需要告知用户处理结果，且反馈内容较为复杂时使用。

## 代码演示

### 基本用法

展示成功、失败、信息和警告等状态。

<demo src="../demos/result/result-01-basic.vue"></demo>

### 自定义图标

自定义 icon。

<demo src="../demos/result/result-02-custom-icon.vue"></demo>

### 带有额外内容

自定义操作按钮和额外内容。

<demo src="../demos/result/result-03-extra.vue"></demo>

### 403/404/500

复杂的错误反馈。

<demo src="../demos/result/result-04-error.vue"></demo>

## API

### Result Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 结果的状态，决定图标和颜色 | `'success' \| 'error' \| 'info' \| 'warning' \| '404' \| '403' \| '500'` | `'info'` |
| title | 标题 | `string` | - |
| subTitle | 副标题 | `string` | - |

### Result Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容，作为 Result 的 children 内容 |
| icon | 自定义图标 |
| title | 自定义标题 |
| subTitle | 自定义副标题 |
| extra | 自定义操作区域 | 