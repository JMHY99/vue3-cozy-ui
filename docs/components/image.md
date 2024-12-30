# Image 图片

### 概述
::: tip
可预览的图片组件。

- 需要展示图片时使用
- 加载大图时显示 loading 或加载失败时容错处理
- 支持图片预览功能
:::

### 基本使用
<demo src="../demos/image/image-01-base.vue"></demo>

### 容错处理
<demo src="../demos/image/image-02-fallback.vue"></demo>

### 渐进加载
<demo src="../demos/image/image-03-placeholder.vue"></demo>

### 多种填充
<demo src="../demos/image/image-04-object-fit.vue"></demo>

### API

#### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| alt | 图片描述 | string | - |
| fallback | 加载失败容错地址 | string | - |
| height | 图片高度 | string \| number | - |
| preview | 预览参数，为 false 时禁用 | boolean | true |
| src | 图片地址 | string | - |
| width | 图片宽度 | string \| number | - |
| fit | 图片填充模式 | 'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down' | 'fill' |
| placeholder | 是否使用占位符 | boolean | true |

#### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| error | 图片加载失败时触发 | (e: Event) |
| load | 图片加载完成时触发 | (e: Event) |
| click | 图片被点击时触发 | (e: MouseEvent) |

#### 插槽

| 插槽名 | 说明 |
| --- | --- |
| placeholder | 自定义占位内容 |
| error | 自定义失败内容 | 