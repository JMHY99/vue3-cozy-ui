# TimePicker 时间选择器

输入或选择时间的控件。

## 基础用法

最简单的用法，通过 v-model 绑定一个时间值。

<demo src="../demos/time-picker/time-picker-01-base.vue"></demo>

## 禁用状态

通过 disabled 属性禁用时间选择器。

<demo src="../demos/time-picker/time-picker-02-disabled.vue"></demo>

## 时间格式

使用 format 指定时间的显示格式。

<demo src="../demos/time-picker/time-picker-03-format.vue"></demo>

## 禁用时间

可以使用 disabledHours、disabledMinutes、disabledSeconds 分别禁用特定的时、分、秒。

<demo src="../demos/time-picker/time-picker-04-disabled-time.vue"></demo>

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue(v-model) | 绑定值 | Date | - |
| placeholder | 输入框提示文字 | string | '请选择时间' |
| format | 时间格式化 | string | 'HH:mm:ss' |
| disabled | 是否禁用 | boolean | false |
| showSecond | 是否显示秒选择器 | boolean | true |
| disabledHours | 禁止选择部分小时选项 | () => number[] | - |
| disabledMinutes | 禁止选择部分分钟选项 | (hour: number) => number[] | - |
| disabledSeconds | 禁止选择部分秒选项 | (hour: number, minute: number) => number[] | - |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 时间变化时触发 | (date: Date) => void |
| update:modelValue | 更新 v-model 值 | (date: Date) => void |
  </rewritten_file> 