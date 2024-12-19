# Avatar 头像

### 概述

::: tip
用来代表用户或事物，支持图片、图标或字符展示。
:::

### 基本使用

头像有三种尺寸，两种形状可选。

<demo src="../demos/avatar/avatar-01-basic.vue"></demo>

### 类型

支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色。

<demo src="../demos/avatar/avatar-02-type.vue"></demo>

### 自动调整字符大小

对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。

<demo src="../demos/avatar/avatar-03-auto-size.vue"></demo>

### 带徽标的头像

通常用于消息提示。

<demo src="../demos/avatar/avatar-04-with-badge.vue"></demo>

### 头像组合展示

头像组合展示。

<demo src="../demos/avatar/avatar-05-group.vue"></demo>

### API

#### Avatar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| alt | 图像无法显示时的替代文本 | `string` | - |
| fit | 图片的适应方式 | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` |
| icon | 设置头像的图标类型 | `string \| Component` | - |
| shape | 指定头像的形状 | `'circle' \| 'square'` | `'circle'` |
| size | 设置头像的大小 | `number \| 'large' \| 'small' \| 'default'` | `'default'` |
| src | 图片类头像的资源地址 | `string` | - |
| srcset | 设置图片类头像的 srcset 属性 | `string` | - |

#### Avatar Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| error | 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为 | `(e: Event) => void` |

#### Avatar Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义头像展示内容 |
| icon | 自定义图标内容 |

#### AvatarGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| maxCount | 显示的最大头像个数 | `number` | - |
| maxPopoverPlacement | 多余头像气泡弹出位置 | `'top' \| 'bottom'` | `'top'` |
| size | 设置头像的大小 | `number \| 'large' \| 'small' \| 'default'` | `'default'` |
| shape | 设置头像的形状 | `'circle' \| 'square'` | `'circle'` |
