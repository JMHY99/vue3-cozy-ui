# 快速上手

### 安装

```bash
npm install cozy-ui -S
```

### 注册

#### 全局完整注册

```javascript
import Vue from "vue";
import CozyUI from "cozy-ui";

Vue.use(CozyUI);
```

#### 全局部分注册

```javascript
import Vue from "vue";
import { CButton } from "cozy-ui";

Vue.use(CButton);
```

#### 局部注册

```html
<template>
  <c-button>按钮</c-button>
</template>
<script>
  import { CButton } from "cozy-ui";

  export default {
    components: {
      CButton,
    },
  };
</script>
```

::: demo

```vue
<template>
  <button>按钮</button>
  <button>按钮</button>
</template>
```

:::

<demo src="../demos/icon.vue" title="Demo block" desc="use demo"></demo>