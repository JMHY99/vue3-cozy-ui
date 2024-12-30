# Tabs 标签页

### 概述

::: tip
选项卡切换组件。

- 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
- Ant Design 依次提供了三级选项卡，分别用于不同的场景。
- 卡片式的页签，提供可关闭的样式，常用于容器顶部。
- 标准线条式页签，用于容器内部的主功能切换，这是最常用的 Tabs。
:::


### 基础用法

默认选中第一项。

<demo src="../demos/tabs/tabs-01-base.vue"></demo>

### 禁用

禁用某一项。

<demo src="../demos/tabs/tabs-02-disabled.vue"></demo>

### 居中

标签居中展示。

<demo src="../demos/tabs/tabs-03-centered.vue"></demo>

### 图标

有图标的标签。

<demo src="../demos/tabs/tabs-04-icon.vue"></demo>

### 卡片式页签

卡片式页签。

<demo src="../demos/tabs/tabs-05-card.vue"></demo>

### 可编辑卡片

新增和关闭卡片。

<demo src="../demos/tabs/tabs-06-editable-card.vue"></demo>

### 位置

可以在上、右、下、左四个方向放置页签。

<demo src="../demos/tabs/tabs-07-position.vue"></demo>

### 大小

大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。

<demo src="../demos/tabs/tabs-08-size.vue"></demo>

### API

#### Tabs

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey(v-model) | 当前激活 tab 面板的 key | string | - |
| defaultActiveKey | 初始化选中面板的 key | string | - |
| tabBarGutter | tabs 之间的间隙 | number | - |
| tabBarStyle | tab bar 的样式对象 | object | - |
| tabPosition | 页签位置 | `top` \| `right` \| `bottom` \| `left` | `top` |
| type | 页签的基本样式 | `line` \| `card` \| `editable-card` | `line` |
| size | 大小 | `large` \| `default` \| `small` | `default` |
| hideAdd | 是否隐藏加号图标 | boolean | `false` |
| animated | 是否使用动画切换 Tabs | boolean \| `{ inkBar?: boolean, tabPane?: boolean }` | `true` |
| closable | tabs 为 editable-card 时，是否使用关闭图标 | boolean | `true` |
| draggable | 是否可拖拽 | boolean | `false` |

#### Tabs 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换面板的回调 | (key: string) => void |
| tabClick | 点击 tab 时的回调 | (key: string) => void |
| edit | 新增和删除页签的回调 | (targetKey: string \| MouseEvent, action: 'add' \| 'remove') => void |

#### Tabs 插槽

| 插槽名称 | 说明 |
| --- | --- |
| tabBarExtraContent | tab bar 上额外的元素 |
| rightExtra | tab bar 上右侧额外的元素 |

#### TabPane

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tab | 选项卡头显示文字 | string \| slot | - |
| name | 对应 activeKey | string | - |
| disabled | 是否禁用 | boolean | `false` |
| closable | 是否可关闭 | boolean | - |
| href | 选项卡链接 | string | - |
| prefixIcon | 选项卡前缀图标 | string | - |

#### TabPane 插槽

| 插槽名称 | 说明 |
| --- | --- |
| tab | 选项卡头显示内容 |
| default | 选项卡内容 | 