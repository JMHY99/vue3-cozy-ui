# Empty 空状态

空状态时的展示占位图。

## 何时使用

- 当目前没有数据时，用于显示空状态。
- 初始化场景时的引导创建流程。

## 代码演示

### 基本使用
<demo src="../demos/empty/empty-01-base.vue"></demo>

### 自定义图片
<demo src="../demos/empty/empty-02-custom-image.vue"></demo>

### 无描述
<demo src="../demos/empty/empty-03-no-description.vue"></demo>

### 自定义内容
<demo src="../demos/empty/empty-04-custom-content.vue"></demo>

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 自定义描述内容 | string \| slot | - |
| image | 设置显示图片 | string \| slot | - |
| imageStyle | 图片样式 | CSSProperties | - |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| description | 自定义描述内容 | - |
| image | 自定义图片 | - |
| default | 自定义底部内容 | - |
  </rewritten_file> 