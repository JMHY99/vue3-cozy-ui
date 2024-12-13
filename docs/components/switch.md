# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

<demo src="../demos/switch/switch-01-basic.vue"></demo>

## 禁用状态

<demo src="../demos/switch/switch-02-disabled.vue"></demo>

## 文字和图标

<demo src="../demos/switch/switch-03-text.vue"></demo>

## 两种大小

<demo src="../demos/switch/switch-04-size.vue"></demo>

## 加载中

<demo src="../demos/switch/switch-05-loading.vue"></demo>

## API

### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  | ----  | ----  | ----  |
| model-value / v-model | 绑定值 | boolean | - | false |
| disabled | 是否禁用 | boolean | - | false |
| loading | 是否加载中 | boolean | - | false |
| size | 开关大小 | string | default / small | default |
| checked-text | 选中时的文字描述 | string | - | - |
| un-checked-text | 非选中时的文字描述 | string | - | - |

### 事件

| 事件名 | 说明 | 回调参数 |
|  ----  | ----  | ----  |
| change | 状态发生变化时的回调函数 | (value: boolean) |
 