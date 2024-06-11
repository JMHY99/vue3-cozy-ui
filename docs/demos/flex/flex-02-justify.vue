<template>
  <div>
    <span>justify</span>
    <c-radio-group v-model="justify">
      <c-radio label="flex-start">flex-start</c-radio>
      <c-radio label="center">center</c-radio>
      <c-radio label="flex-end">flex-end</c-radio>
      <c-radio label="space-between">space-between</c-radio>
      <c-radio label="space-around"> space-around</c-radio>
      <c-radio label="space-evenly">space-evenly</c-radio>
    </c-radio-group>
    <br />
    <span>align</span>
    <c-radio-group v-model="align">
      <c-radio label="stretch">stretch</c-radio>
      <c-radio label="flex-start">flex-start</c-radio>
      <c-radio label="flex-end">flex-end</c-radio>
      <c-radio label="center">center</c-radio>
    </c-radio-group>
    <br />
    <div class="demo2">
      <c-flex :justify-content="justify" :align-items="align">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </c-flex>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      justify: "flex-start",
      align: "stretch",
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style>
.demo2 > div {
  height: 100px;
  border: 1px solid #ccc;
}

.demo2 div > div {
  width: 100px;
  height: 80px;
}

.demo2 div > div:nth-child(2n) {
  background-color: #2f9bff;
}

.demo2 div > div:nth-child(2n + 1) {
  background-color: #7cc0ff;
}
</style>
