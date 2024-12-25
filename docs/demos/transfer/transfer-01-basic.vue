::: demo 基础用法：最基本的用法，展示了数据项的格式、穿梭、勾选等功能。

```vue
<template>
  <c-transfer
    v-model="targetKeys"
    :data-source="dataSource"
    :titles="['源列表', '目标列表']"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface TransferItem {
  key: string;
  title: string;
}

const dataSource = ref<TransferItem[]>([
  { key: '1', title: '选项1' },
  { key: '2', title: '选项2' },
  { key: '3', title: '选项3' },
  { key: '4', title: '选项4' },
  { key: '5', title: '选项5' }
])

const targetKeys = ref<string[]>(['1', '3'])

const onChange = (keys: string[], direction: string, moveKeys: string[]) => {
  console.log('targetKeys:', keys)
  console.log('direction:', direction)
  console.log('moveKeys:', moveKeys)
}
</script>
```

::: 