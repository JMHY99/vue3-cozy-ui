# Flex 弹性布局

### 概述

::: tip
Flex 弹性布局是一种用于实现灵活和自适应布局的技术。
:::

### 基本布局

`direction`属性设置主轴的方向，默认是 row 水平排列

<demo src="../demos/flex/flex-01-base.vue"></demo>

### 对齐方式

`justify-content` `align-items`
<demo src="../demos/flex/flex-02-justify.vue"></demo>

### 自动换行

`wrap`
<demo src="../demos/flex/flex-03-wrap.vue"></demo>

### 设置间隙

使用 `gap` 设置元素之间的间距，预设了 small、middle、large 三种尺寸，也可以自定义间距。

<demo src="../demos/flex/flex-04-gap.vue"></demo>

### API

| 参数            | 说明                             | 类型                | 可选值                                                                                  | 默认值     |
| --------------- | -------------------------------- | ------------------- | --------------------------------------------------------------------------------------- | ---------- |
| direction       | 设置主轴的方向                   | string              | horizontal/vertical                                                                     | horizontal |
| wrap            | 设置元素单行显示还是多行显示     | string              | 参考[flex-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap)             | nowrap     |
| justify-content | 设置元素在主轴方向上的对齐方式   | string              | 参考[justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) | flex-start |
| align-items     | 设置元素在交叉轴方向上的对齐方式 | string              | 参考[align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items)         | stretch    |
| gap             | 设置间隙                         | string,number,array | small /middle /large/number/number[]                                                    | 0          |
