# Badge 徽标数

### 概述

::: tip
图标右上角的圆形徽标数字。
一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。
:::

### 基本使用

简单的徽标展示，当 `count` 为 `0` 时，默认不显示，但是可以使用 `showZero` 修改为显示。

<demo src="../demos/badge/badge-01-basic.vue"></demo>

### 独立使用

不包裹任何元素即是独立使用，可自定样式展示。

<demo src="../demos/badge/badge-02-standalone.vue"></demo>

### 封顶数字

超过 `overflowCount` 的会显示为 `${overflowCount}+`，默认的 `overflowCount` 为 `99`。

<demo src="../demos/badge/badge-03-overflow.vue"></demo>

### 小红点

没有具体的数字。

<demo src="../demos/badge/badge-04-dot.vue"></demo>

### 状态点

用于表示状态的小圆点。

<demo src="../demos/badge/badge-05-status.vue"></demo>

### 自定义位置偏移

设置状态点的位置偏移，格式为 `[x, y]`。

<demo src="../demos/badge/badge-06-offset.vue"></demo>

### 动态更新

展示动态变化的效果。

<demo src="../demos/badge/badge-07-dynamic.vue"></demo>

### API

####   Badge Props

| 参数          | 说明                                                        | 类型                                                             | 默认值  |
| ------------- | ----------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| count         | 展示的数字，大于 overflowCount 时显示为 `${overflowCount}+` | `number \| string`                                               | -       |
| dot           | 不展示数字，只有一个小红点                                  | `boolean`                                                        | `false` |
| offset        | 设置状态点的位置偏移，格式为 `[x, y]`                       | `[number, number]`                                               | -       |
| overflowCount | 展示封顶的数字值                                            | `number`                                                         | `99`    |
| showZero      | 当数值为 0 时，是否展示徽标                                 | `boolean`                                                        | `false` |
| status        | 设置 Badge 为状态点                                         | `'success' \| 'processing' \| 'default' \| 'error' \| 'warning'` | -       |
| text          | 在设置了 `status` 的前提下有效，设置状态点的文本            | `string`                                                         | -       |
| title         | 设置鼠标放在状态点上时显示的文字                            | `string`                                                         | -       |
| color         | 自定义小圆点的颜色                                          | `string`                                                         | -       |

#### Badge Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 包裹的元素     |
| count   | 自定义徽标内容 |