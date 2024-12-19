# Carousel 走马灯

### 概述

::: tip
在有限空间内，循环播放同一类型的图片、文字等内容。
:::

### 基础用法

适用广泛的基础用法。

<demo src="../demos/carousel/carousel-01-basic.vue">基础用法</demo>

### 指示器

可以自定义指示器的显示位置和样式。

<demo src="../demos/carousel/carousel-02-indicator.vue">指示器</demo>

### 切换箭头

可以自定义切换箭头的显示时机和位置。

<demo src="../demos/carousel/carousel-03-arrow.vue">切换箭头</demo>

### 卡片化

当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格。

<demo src="../demos/carousel/carousel-04-card.vue">卡片化</demo>

### 垂直方向

垂直方向的轮播效果。

<demo src="../demos/carousel/carousel-05-vertical.vue">垂直方向</demo>

### 自动切换

自动切换和暂停切换。

<demo src="../demos/carousel/carousel-06-autoplay.vue">自动切换</demo>

### API

#### Carousel 属性

| 参数              | 说明                                  | 类型                            | 默认值       |
| ----------------- | ------------------------------------- | ------------------------------- | ------------ |
| initialIndex      | 初始状态激活的幻灯片的索引，从 0 开始 | number                          | 0            |
| height            | 走马灯的高度                          | string                          | '200px'      |
| autoplay          | 是否自动切换                          | boolean                         | true         |
| interval          | 自动切换的时间间隔，单位为毫秒        | number                          | 3000         |
| indicatorPosition | 指示器的位置                          | 'inside' \| 'outside' \| 'none' | 'inside'     |
| indicatorType     | 指示器的类型                          | 'dot' \| 'line' \| 'label'      | 'line'       |
| arrow             | 切换箭头的显示时机                    | 'always' \| 'hover' \| 'never'  | 'hover'      |
| arrowPosition     | 箭头的位置                            | 'inside' \| 'outside'           | 'inside'     |
| type              | 走马灯的类型                          | 'default' \| 'card'             | 'default'    |
| direction         | 展示的方向                            | 'horizontal' \| 'vertical'      | 'horizontal' |
| loop              | 是否循环显示                          | boolean                         | true         |
| pause             | 鼠标悬浮时是否暂停自动切换            | boolean                         | true         |

#### Carousel 事件

| 事件名 | 说明             | 回调参数                               |
| ------ | ---------------- | -------------------------------------- |
| change | 幻灯片切换时触发 | 目前激活的幻灯片的索引，原幻灯片的索引 |

#### Carousel 方法

| 方法名        | 说明               | 参数                              |
| ------------- | ------------------ | --------------------------------- |
| setActiveItem | 手动切换幻灯片     | 需要切换的幻灯片的索引，从 0 开始 |
| prev          | 切换至上一张幻灯片 | -                                 |
| next          | 切换至下一张幻灯片 | -                                 |

#### CarouselItem 属性

| 参数  | 说明                                      | 类型   | 默认值 |
| ----- | ----------------------------------------- | ------ | ------ |
| name  | 幻灯片的名字，可用作 setActiveItem 的参数 | string | -      |
| label | 该幻灯片所对应指示器的文本                | string | -      |
