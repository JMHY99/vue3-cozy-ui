<template>
  <c-descriptions title="User Info" bordered>
    <c-descriptions-item label="Product">Cloud Database</c-descriptions-item>
    <c-descriptions-item label="Billing Mode">Prepaid</c-descriptions-item>
    <c-descriptions-item label="Automatic Renewal">YES</c-descriptions-item>
    <c-descriptions-item label="Order Time">2018-04-24 18:00:00</c-descriptions-item>
    <c-descriptions-item label="Usage Time" :span="2">
      2019-04-24 18:00:00
    </c-descriptions-item>
    <c-descriptions-item label="Status" :span="3">
      Running
    </c-descriptions-item>
    <c-descriptions-item label="Negotiated Amount">$80.00</c-descriptions-item>
    <c-descriptions-item label="Discount">$20.00</c-descriptions-item>
    <c-descriptions-item label="Official Receipts">$60.00</c-descriptions-item>
    <c-descriptions-item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
    </c-descriptions-item>
  </c-descriptions>
</template>

<script lang="ts" setup>
/**
 * @title 带边框的
 * @description 带边框和背景颜色的列表。
 */
</script> 