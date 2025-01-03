# Message 全局提示

### 概述

::: tip
全局展示操作反馈信息。
:::

### 基础用法

<demo src="../demos/message/message-01-basic.vue"></demo>

### 不同类型

<demo src="../demos/message/message-02-types.vue"></demo>

### 修改延时

<demo src="../demos/message/message-03-duration.vue"></demo>

### API

#### Message 方法

组件提供了一些静态方法，使用方式和参数如下：

- `message.success(content, [duration], onClose)`
- `message.error(content, [duration], onClose)`
- `message.info(content, [duration], onClose)`
- `message.warning(content, [duration], onClose)`
- `message.warn(content, [duration], onClose)` // alias of warning
- `message.loading(content, [duration], onClose)`

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示内容 | string | - |
| duration | 自动关闭的延时，单位秒。设为 0 时不自动关闭 | number | 3 |
| onClose | 关闭时触发的回调函数 | () => void | - |

#### 全局方法

还提供了全局配置和全局销毁方法：

- `message.config(options)`
- `message.destroy()`

#### message.config

```js
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  rtl: true,
});
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| duration | 默认自动关闭延时，单位秒 | number | 3 |
| maxCount | 最大显示数, 超过限制时，最早的消息会被自动关闭 | number | - |
| top | 消息距离顶部的位置 | number | 8 |
 