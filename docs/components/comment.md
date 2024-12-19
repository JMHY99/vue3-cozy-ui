# Comment 评论

对网站内容的反馈、评价和讨论。

## 基础用法

基础评论组件。

<demo src="../demos/comment/comment-01-base.vue"></demo>

## 嵌套评论

评论可以嵌套。

<demo src="../demos/comment/comment-02-nested.vue"></demo>

## 配置操作

配置操作项。

<demo src="../demos/comment/comment-03-actions.vue"></demo>

## API

### Comment Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| author | 要显示的作者名称 | string | - |
| avatar | 要显示的头像地址 | string | - |
| content | 评论的主要内容 | string | - |
| datetime | 展示时间描述 | string | - |

### Comment Slots

| 名称 | 说明 |
| --- | --- |
| actions | 在评论内容下面呈现的操作项列表 |
| author | 要显示的作者名称 |
| avatar | 要显示的头像 |
| content | 评论的主要内容 |
| datetime | 展示时间描述 |
| default | 嵌套评论的内容 | 