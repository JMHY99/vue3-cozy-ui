# Steps 步骤条

引导用户按照流程完成任务的导航条。

## 何时使用

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

## 基础用法

简单的步骤条。

<demo src="../demos/steps/steps-01-base.vue"></demo>

## 迷你版

迷你版的步骤条，通过设置 `size="small"` 启用.

<demo src="../demos/steps/steps-02-small.vue"></demo>

## 带图标的步骤条

通过设置 `icon` 属性，可以启用自定义图标。

<demo src="../demos/steps/steps-03-icon.vue"></demo>

## 步骤切换

通过 `current` 属性来控制当前步骤。

<demo src="../demos/steps/steps-04-switch.vue"></demo>

## 竖直方向的步骤条

简单的竖直方向的步骤条。

<demo src="../demos/steps/steps-05-vertical.vue"></demo>

## 点状步骤条

包含步骤点的进度条。

<demo src="../demos/steps/steps-06-dot.vue"></demo>

## API

### Steps Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 指定当前步骤，从 0 开始记数 | number | 0 |
| direction | 指定步骤条方向 | 'horizontal' \| 'vertical' | 'horizontal' |
| size | 指定大小 | 'default' \| 'small' | 'default' |
| status | 指定当前步骤的状态 | 'wait' \| 'process' \| 'finish' \| 'error' | 'process' |
| progressDot | 点状步骤条 | boolean \| (iconDot, { index, status, title, description }) => any | false |
| initial | 起始序号，从 0 开始记数 | number | 0 |
| labelPlacement | 指定标签放置位置，默认水平放图标右侧，可选 vertical 放图标下方 | 'horizontal' \| 'vertical' | 'horizontal' |
| onChange | 点击切换步骤时的回调 | (current) => void | - |

### Step Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | - |
| subTitle | 子标题 | string | - |
| description | 步骤的详情描述 | string | - |
| icon | 步骤图标 | string | - |
| status | 指定状态 | 'wait' \| 'process' \| 'finish' \| 'error' | - |
| disabled | 禁用点击 | boolean | false |

### Step Slots

| 名称 | 说明 |
| --- | --- |
| icon | 自定义图标 |
| title | 自定义标题 |
| subTitle | 自定义子标题 |
| description | 自定义描述内容 |
  </rewritten_file> 