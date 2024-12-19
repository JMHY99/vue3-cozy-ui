# Descriptions 描述列表

成组展示多个只读字段。

## 何时使用

常见于详情页的信息展示。

## 基础用法

简单的展示。

<demo src="../demos/descriptions/descriptions-01-base.vue"></demo>

## 带边框的

带边框和背景颜色的列表。

<demo src="../demos/descriptions/descriptions-02-border.vue"></demo>

## 自定义尺寸

自定义尺寸，适应在各种容器中展示。

<demo src="../demos/descriptions/descriptions-03-size.vue"></demo>

## 垂直布局

垂直的列表。

<demo src="../demos/descriptions/descriptions-04-vertical.vue"></demo>

## 自定义标题

自定义标题和额外内容。

<demo src="../demos/descriptions/descriptions-05-custom.vue"></demo>

## API

### Descriptions Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bordered | 是否展示边框 | boolean | false |
| column | 一行的列表项数量 | number | 3 |
| colon | 配置 label 和 content 的 colon | boolean | true |
| layout | 描述布局 | 'horizontal' \| 'vertical' | 'horizontal' |
| size | 设置列表的大小 | 'default' \| 'middle' \| 'small' | 'default' |
| title | 设置标题 | string | - |
| labelWidth | label 宽度 | string \| number | - |

### Descriptions Slots

| 名称 | 说明 |
| --- | --- |
| title | 自定义标题 |
| extra | 自定义额外内容，显示在标题右侧 |

### DescriptionsItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 内容的描述 | string | - |
| span | 包含列的数量 | number | 1 |

### DescriptionsItem Slots

| 名称 | 说明 |
| --- | --- |
| default | 内容 | 