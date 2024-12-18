# Menu 导航菜单

### 概述

::: tip
为页面和功能提供导航的菜单列表，支持垂直、水平、和内联模式，支持多级菜单。
:::

### 顶部导航

<demo src="../demos/menu/menu-01-horizontal.vue"></demo>

### 内联菜单

垂直菜单的内联模式，子菜单内嵌在菜单区域。

<demo src="../demos/menu/menu-02-inline.vue"></demo>

### 缩起内联菜单

内联菜单可以被缩起/展开。

<demo src="../demos/menu/menu-03-collapsed.vue"></demo>

### 只展开当前父级菜单

点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。

<demo src="../demos/menu/menu-04-single-open.vue"></demo>

### 垂直菜单

<demo src="../demos/menu/menu-05-vertical.vue"></demo>

### 主题

内建了两套主题 light 和 dark，默认 light。

<demo src="../demos/menu/menu-06-theme.vue"></demo>

### 菜单分组

使用 MenuItemGroup 进行菜单分组。

<demo src="../demos/menu/menu-07-group.vue"></demo>

### API

#### Menu

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| mode | 菜单类型 | string | vertical / horizontal / inline | vertical |
| theme | 主题颜色 | string | light / dark | light |
| inlineCollapsed | inline 模式下菜单是否收起状态 | boolean | — | false |
| selectedKeys | 当前选中的菜单项 key 数组 | string[] | — | [] |
| openKeys | 当前展开的 SubMenu 菜单项 key 数组 | string[] | — | [] |
| selectable | 是否允许选中 | boolean | — | true |
| multiple | 是否允许多选 | boolean | — | false |

#### Menu 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 被选中时调用 | (key: string, item: any) |
| openChange | SubMenu 展开/关闭时调用 | (openKeys: string[]) |
| click | 点击 MenuItem 调用此函数 | (key: string, item: any) |

#### MenuItem

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| itemKey | item 的唯一标志 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| icon | 菜单图标 | string | — | — |
| title | 设置收缩时展示的悬浮标题 | string | — | — |

#### SubMenu

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| itemKey | 唯一标志 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| icon | 菜单图标 | string | — | — |
| title | 子菜单标题 | string | — | — |
| open | 是否展开，可由父组件控制 | boolean | — | false |

#### MenuItemGroup

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 分组标题 | string | — | — |