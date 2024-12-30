# Notification 通知提醒框

### 概述

::: tip
全局展示通知提醒信息。

在系统四个角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容
- 带有交互的通知，给出用户下一步的行动点
- 系统主动推送

:::


### 基本用法

最简单的用法，4.5 秒后自动关闭。

<demo src="../demos/notification/notification-01-basic.vue"></demo>

### 自定义时长

自定义通知框自动关闭的延时，默认 4.5s，取消自动关闭只要将该值设为 0 即可。

<demo src="../demos/notification/notification-02-duration.vue"></demo>

### 带有图标的通知提醒框

通知提醒框左侧有图标。

<demo src="../demos/notification/notification-03-with-icon.vue"></demo>

### 自定义图标

图标可以被自定义。

<demo src="../demos/notification/notification-04-custom-icon.vue"></demo>

### 位置

可以设置通知从右上角、右下角、左下角、左上角弹出。

<demo src="../demos/notification/notification-05-placement.vue"></demo>

### 自定义按钮

自定义关闭按钮的样式和文字。

<demo src="../demos/notification/notification-06-custom-button.vue"></demo>

### 函数式调用

通过函数方式调用通知提醒框，更加简单和方便。

<!-- <demo src="../demos/notification/notification-07-method.vue"></demo> -->

### API

#### Notification Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | - |
| description | 通知提醒内容 | string | - |
| icon | 自定义图标 | string | - |
| type | 通知类型，可选 `success` `info` `warning` `error` | string | - |
| duration | 自动关闭的延时，单位秒。设为 0 则不自动关闭 | number | 4.5 |
| closeIcon | 自定义关闭图标 | string | - |
| closable | 是否显示关闭按钮 | boolean | true |
| placement | 弹出位置，可选 `topRight` `topLeft` `bottomRight` `bottomLeft` | string | topRight |
| style | 自定义内联样式 | object | - |

#### Notification Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 当通知关闭时触发 | function | - |

#### Notification Slots

| 名称 | 说明 |
| --- | --- |
| default | 通知提醒内容 |
| title | 标题 |
| btn | 自定义关闭按钮 |

#### 函数式调用

组件提供了一些静态方法，使用方式和参数如下：

- `notification(options)`
- `notification.success(options)`
- `notification.info(options)`
- `notification.warning(options)`
- `notification.error(options)`

options 参数如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | - |
| description | 通知提醒内容 | string | - |
| icon | 自定义图标 | string | - |
| type | 通知类型 | string | - |
| duration | 自动关闭的延时，单位秒 | number | 4.5 |
| placement | 弹出位置 | string | 'topRight' |
| closable | 是否显示关闭按钮 | boolean | true |
| closeIcon | 自定义关闭图标 | string | - |
| style | 自定义内联样式 | object | - |

函数式调用返回一个对象，包含以下方法：

| 方法名 | 说明 |
| --- | --- |
| close | 关闭当前通知框 | 