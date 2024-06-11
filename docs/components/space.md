# Space 间距

### 概述

设置组件之间的间距。

### 基础用法

相邻组件水平间距。

<demo src="../demos/space/space-01-base.vue"></demo>

### 间距大小

可选 small、middle、large，默认间距为 small；
可以自定义间距大小。

<demo src="../demos/space/space-02-size.vue"></demo>

### 设置方向

`direction`属性设置方向，默认为 horizontal

<demo src="../demos/space/space-03-direction.vue"></demo>

### 对齐方式

`align`属性设置对齐方式`stretch`、`start`、`end`、`center`、`baseline`

<demo src="../demos/space/space-04-align.vue"></demo>

### 自动换行

`wrap`属性设置自动换行。

<demo src="../demos/space/space-05-wrap.vue"></demo>

### API

| 参数      | 说明                         | 类型                   | 可选值                                                                          | 默认值  |
| --------- | ---------------------------- | ---------------------- | ------------------------------------------------------------------------------- | ------- |
| align     | 对齐方式                     | string                 | 参考[align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) | stretch |
| direction | 间距方向                     | string                 | vertical / horizontal                                                           | row     |
| size      | 间距大小                     | string/number/number[] | small /middle /large/number/number[]                                            | small   |
| wrap      | 设置元素单行显示还是多行显示 | boolean                | true/false                                                                      | false   |
