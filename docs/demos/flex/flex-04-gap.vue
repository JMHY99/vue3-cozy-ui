<template>
  <div>
    <c-radio-group v-model="gap">
      <c-radio label="small">small</c-radio>
      <c-radio label="middle">middle</c-radio>
      <c-radio label="large">large</c-radio>
      <c-radio label="100px">100px</c-radio>
    </c-radio-group>
    <br />
    <div class="demo4">
      <c-flex :gap="gap">
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
      gap: "small",
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style>
.demo4 div > div {
  width: 100px;
  height: 80px;
}

.demo4 div > div:nth-child(2n) {
  background-color: #2f9bff;
}

.demo4 div > div:nth-child(2n + 1) {
  background-color: #7cc0ff;
}
</style>
