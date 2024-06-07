# 快速上手

### 安装

```bash
npm install cozy-ui -S
```

### 注册

#### 全局完整注册

```javascript
import { createApp } from "vue";
import CozyUIPlus from "vue3-cozy-ui";
//导入样式
import "vue3-cozy-ui/dist/index.css";

const app = createApp(App);

app.use(CozyUIPlus);
app.mount("#app");
```

#### 全局部分注册

```javascript
import { createApp } from "vue";
import { CButton } from "vue3-cozy-ui";

const app = createApp(App);

app.use(Button).mount("#app");
```

#### 局部注册

```html
<template>
  <c-button>按钮</c-button>
</template>
<script setup>
  import { CButton } from "vue3-cozy-ui";
</script>
```
