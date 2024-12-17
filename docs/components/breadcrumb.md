# Breadcrumb 面包屑

### 概述
::: tip
显示当前页面在系统层级结构中的位置，并能向上返回。
:::

### 基础用法

最基础的用法，通过设置 `to` 属性和监听 `click` 事件来处理跳转。

<demo src="../demos/breadcrumb/breadcrumb-01-basic.vue"></demo>

### 自定义分隔符

通过设置 `separator` 属性来自定义分隔符，支持文本和图标。

<demo src="../demos/breadcrumb/breadcrumb-02-separator.vue"></demo>

### API

#### Breadcrumb Props

| 参数          | 说明                     | 类型   | 可选值 | 默认值 |
| ------------- | ------------------------ | ------ | ------ | ------ |
| separator     | 分隔符                   | string | —      | /      |
| separatorIcon | 图标分隔符的自定义图标类 | string | —      | —      |

#### BreadcrumbItem Props

| 参数    | 说明                                                                | 类型                      | 可选值 | 默认值  |
| ------- | ----------------------------------------------------------------- | ------------------------- | ------ | ------- |
| to      | 路由跳转目标，可以是字符串或对象                                   | string / object           | —      | —       |
| replace | 是否替换当前路由（由外部路由处理时使用）                           | boolean                   | —      | false   |

#### BreadcrumbItem Events

| 事件名 | 说明                     | 回调参数                                |
| ------ | ------------------------ | --------------------------------------- |
| click  | 点击面包屑项时触发       | (to: string \| Record<string, any>) => void |