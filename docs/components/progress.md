# Progress 进度条

展示操作的当前进度。

## 何时使用

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过2秒时；
- 当需要显示一个操作完成的百分比时。

## 代码演示

### 基本用法

标准的进度条。

<demo src="../demos/progress/progress-01-basic.vue"></demo>

### 进度圈

圈形的进度。

<demo src="../demos/progress/progress-02-circle.vue"></demo>

### 小型进度圈

小一号的圈形进度。

<demo src="../demos/progress/progress-03-circle-mini.vue"></demo>

### 进度条状态

标准的进度条。

<demo src="../demos/progress/progress-04-status.vue"></demo>

### 动态展示

会动的进度条才是好进度条。

<demo src="../demos/progress/progress-05-dynamic.vue"></demo>

### 仪表盘

仪表盘样式的进度条。

<demo src="../demos/progress/progress-06-dashboard.vue"></demo>

## API

### Progress Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | `'line' \| 'circle' \| 'dashboard'` | `'line'` |
| percent | 百分比 | `number` | `0` |
| successPercent | 已完成的分段百分比 | `number` | `0` |
| showInfo | 是否显示进度数值或状态图标 | `boolean` | `true` |
| status | 状态 | `'success' \| 'exception' \| 'normal' \| 'active'` | `'normal'` |
| strokeColor | 进度条的色彩 | `string` | - |
| trailColor | 未完成的分段的颜色 | `string` | - |
| strokeWidth | 进度条线的宽度 | `number` | `6` |
| strokeLinecap | 进度条端点的形状 | `'round' \| 'square'` | `'round'` |
| size | 圆形进度条画布宽度 | `number` | `120` | 