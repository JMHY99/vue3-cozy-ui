<template>
  <c-space direction="vertical">
    <c-checkbox
      v-model="checkAll"
      :indeterminate="indeterminate"
      @change="handleCheckAllChange"
    >
      全选
    </c-checkbox>
    <c-checkbox-group v-model="checkedList" @change="handleCheckedChange">
      <c-checkbox v-for="item in options" :key="item" :label="item">
        {{ item }}
      </c-checkbox>
    </c-checkbox-group>
  </c-space>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const options = ['选项1', '选项2', '选项3']
const checkedList = ref(['选项1'])
const checkAll = ref(false)
const indeterminate = ref(true)

const handleCheckAllChange = (val: boolean) => {
  checkedList.value = val ? [...options] : []
  indeterminate.value = false
}

const handleCheckedChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === options.length
  indeterminate.value = checkedCount > 0 && checkedCount < options.length
}
</script>
