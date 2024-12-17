# Divider 分割线

### 概述

::: tip
区隔内容的分割线。
:::


### 基础用法
分割线的基础用法。

<demo src="../demos/divider/divider-01-basic.vue"></demo>

### 垂直分割线
使用 type="vertical" 设置为行内的垂直分割线。

<demo src="../demos/divider/divider-02-vertical.vue"></demo>

### 带文字的分割线
分割线中带有文字，可以用 orientation 指定文字位置。

<demo src="../demos/divider/divider-03-with-text.vue"></demo>

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 水平还是垂直类型 | 'horizontal' \| 'vertical' | 'horizontal' |
| orientation | 分割线标题的位置 | 'left' \| 'right' \| 'center' | 'center' |
| dashed | 是否虚线 | boolean | false |
| plain | 文字是否显示为普通正文样式 | boolean | false |