# Pagination 分页

采用分页的形式分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

## 基础用法

基础分页。

<demo src="../demos/pagination/pagination-01-base.vue"></demo>

## 更多分页

更多分页。

<demo src="../demos/pagination/pagination-02-more.vue"></demo>

## 改变每页显示条目数

改变每页显示条目数。

<demo src="../demos/pagination/pagination-03-sizer.vue"></demo>

## 跳转

快速跳转到某一页。

<demo src="../demos/pagination/pagination-04-jumper.vue"></demo>

## 全部展示

展示所有配置项。

<demo src="../demos/pagination/pagination-05-all.vue"></demo>

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current(v-model) | 当前页数 | number | 1 |
| total | 总条目数 | number | 0 |
| pageSize(v-model) | 每页条数 | number | 10 |
| showQuickJumper | 是否可以快速跳转至某页 | boolean | false |
| showSizeChanger | 是否展示 pageSize 切换器 | boolean | false |
| pageSizeOptions | 指定每页可以显示多少条 | number[] | [10, 20, 50, 100] |
| showTotal | 用于显示数据总量和当前数据顺序 | function(total, range) | - |
| disabled | 禁用分页 | boolean | false |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 页码或 pageSize 改变的回调 | function(page, pageSize) | - |
| update:current | 当前页改变时的回调 | function(page) | - |
| update:pageSize | 每页条数改变时的回调 | function(size) | - |
  </rewritten_file> 