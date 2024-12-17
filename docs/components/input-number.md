# InputNumber 数字输入框

### 概述
::: tip
仅允许输入标准的数字值，可定义范围
:::

### 基础用法

<demo src="../demos/input-number/input-number-01-basic.vue"></demo>

### 禁用状态

<demo src="../demos/input-number/input-number-02-disabled.vue"></demo>

### 步数

<demo src="../demos/input-number/input-number-03-step.vue"></demo>

### 精度

<demo src="../demos/input-number/input-number-04-precision.vue"></demo>

### 不同尺寸

<demo src="../demos/input-number/input-number-05-size.vue"></demo>

### API

#### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  | ----  | ----  | ----  |
| model-value / v-model | 绑定值 | number | - | - |
| min | 设置计数器允许的最小值 | number | - | -Infinity |
| max | 设置计数器允许的最大值 | number | - | Infinity |
| step | 计数器步长 | number | - | 1 |
| precision | 数值精度 | number | - | 0 |
| size | 计数器尺寸 | string | large/default/small | default |
| disabled | 是否禁用计数器 | boolean | - | false |
| readonly | 原生 readonly 属性，是否只读 | boolean | - | false |
| name | 等价于原生 input name 属性 | string | - | - |
| controls | 是否使用控制按钮 | boolean | - | true |

#### 事件

| 事件名 | 说明 | 回调参数 |
|  ----  | ----  | ----  |
| change | 绑定值被改变时触发 | (value: number) |
| blur | 在组件 Input 失去焦点时触发 | (event: FocusEvent) |
| focus | 在组件 Input 获得焦点时触发 | (event: FocusEvent) |

#### 方法

| 方法名 | 说明 | 参数 |
|  ----  | ----  | ----  |
| focus | 使 input 获取焦点 | - |
| blur | 使 input 失去焦点 | - |