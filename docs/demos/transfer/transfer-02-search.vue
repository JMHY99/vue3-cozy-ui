::: demo 带搜索框：可以通过搜索框快速筛选内容。

```vue
<template>
  <c-transfer
    v-model="targetKeys"
    :data-source="dataSource"
    show-search
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
  { key: '5', title: '选项5' },
  { key: '6', title: '选项6' },
  { key: '7', title: '选项7' },
  { key: '8', title: '选项8' },
  { key: '9', title: '选项9' },
  { key: '10', title: '选项10' }
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