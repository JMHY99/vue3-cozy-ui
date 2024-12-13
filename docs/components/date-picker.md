# DatePicker 日期选择器

输入或选择日期的控件。

## 基础用法

最简单的用法，通过 v-model 绑定一个日期值。

<demo src="../demos/date-picker/date-picker-01-base.vue"></demo>

## 禁用状态

通过 disabled 属性禁用日期选择器。

<demo src="../demos/date-picker/date-picker-02-disabled.vue"></demo>

## 日期格式

使用 format 指定日期的显示格式。

<demo src="../demos/date-picker/date-picker-03-format.vue"></demo>

## 禁用日期

通过 disabledDate 函数设置禁用的日期。

<demo src="../demos/date-picker/date-picker-04-disabled-date.vue"></demo>

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue(v-model) | 绑定值 | Date | - |
| placeholder | 输入框提示文字 | string | '请选择日期' |
| format | 日期格式化 | string | 'YYYY-MM-DD' |
| disabled | 是否禁用 | boolean | false |
| disabledDate | 禁用日期函数 | (date: Date) => boolean | - |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 日期变化时触发 | (date: Date) => void |
| update:modelValue | 更新 v-model 值 | (date: Date) => void |
  </rewritten_file> 