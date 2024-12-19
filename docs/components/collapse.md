# Collapse 折叠面板

可以折叠/展开的内容区域。

## 基础用法

可以同时展开多个面板，也可以只展开一个面板。

<demo src="../demos/collapse/collapse-01-base.vue"></demo>

## 手风琴效果

每次只能展开一个面板。

<demo src="../demos/collapse/collapse-02-accordion.vue"></demo>

## 自定义面板标题

除了使用 `header` 属性以外，还可以通过具名插槽来实现自定义面板的标题内容，以实现增加图标等效果。

<demo src="../demos/collapse/collapse-03-custom.vue"></demo>

## 额外节点

可以通过 `extra` 插槽在面板头部添加额外的操作按钮。

<demo src="../demos/collapse/collapse-04-extra.vue"></demo>

## 不同尺寸

提供三种不同尺寸的折叠面板。

<demo src="../demos/collapse/collapse-05-size.vue"></demo>

## 边框和背景

可以控制是否显示边框和使用透明背景。

<demo src="../demos/collapse/collapse-06-border.vue"></demo>

## API

### Collapse Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 当前激活的面板的 name | `string \| number \| Array<string \| number>` | — |
| accordion | 是否开启手风琴模式 | `boolean` | `false` |
| bordered | 是否显示边框 | `boolean` | `true` |
| expand-icon | 自定义切换图标 | `string` | — |
| expand-icon-position | 切换图标的位置 | `'start' \| 'end'` | `'start'` |
| ghost | 使用透明背景 | `boolean` | `false` |
| size | 面板尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |

### Collapse Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| change | 当前激活面板改变时触发 | `(activeNames: string \| number \| Array<string \| number>)` |

### CollapsePanel Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 面板的唯一标识 | `string \| number` | — |
| header | 面板标题 | `string` | — |
| disabled | 是否禁用面板 | `boolean` | `false` |
| show-expand-icon | 是否显示展开图标 | `boolean` | `true` |

### CollapsePanel Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 面板内容 |
| header | 面板标题 |
| extra | 面板头部右侧的额外内容 |
</rewritten_file>