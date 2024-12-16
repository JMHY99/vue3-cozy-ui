<template>
  <div>
    <c-select
      v-model="value1"
      style="width: 200px"
      placeholder="单选可清空"
      clearable
    >
      <c-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      />
    </c-select>

    <c-select
      v-model="value2"
      style="width: 200px"
      placeholder="多选可清空"
      multiple
      clearable
    >
      <c-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      />
    </c-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value1 = ref("");
const value2 = ref<string[]>([]);

const options = [
  { value: "1", label: "北京" },
  { value: "2", label: "上海" },
  { value: "3", label: "广州" },
  { value: "4", label: "深圳" },
];
</script>
