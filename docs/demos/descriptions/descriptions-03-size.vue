<template>
  <div>
    <c-radio-group v-model:value="size">
      <c-radio value="default">default</c-radio>
      <c-radio value="middle">middle</c-radio>
      <c-radio value="small">small</c-radio>
    </c-radio-group>
    <br />
    <br />
    <c-descriptions bordered :size="size" title="Custom Size">
      <c-descriptions-item label="Product">Cloud Database</c-descriptions-item>
      <c-descriptions-item label="Billing">Prepaid</c-descriptions-item>
      <c-descriptions-item label="Time">18:00:00</c-descriptions-item>
      <c-descriptions-item label="Amount">$80.00</c-descriptions-item>
      <c-descriptions-item label="Discount">$20.00</c-descriptions-item>
      <c-descriptions-item label="Official">$60.00</c-descriptions-item>
      <c-descriptions-item label="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
      </c-descriptions-item>
    </c-descriptions>
  </div>
</template>

<script lang="ts" setup>
/**
 * @title 自定义尺寸
 * @description 自定义尺寸，适应在各种容器中展示。
 */
import { ref } from 'vue'

const size = ref<'default' | 'middle' | 'small'>('default')
</script> 