<template>
  <div>
    <c-radio-group v-model="direction">
      <c-radio label="horizontal">horizontal</c-radio>
      <c-radio label="vertical">vertical</c-radio>
    </c-radio-group>
    <br />
    <div class="demo">
      <c-flex :direction="direction">
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
      direction: "horizontal",
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style>
.demo div > div {
  width: 80px;
  height: 80px;
}

.demo div > div:nth-child(2n) {
  background-color: #2f9bff;
}

.demo div > div:nth-child(2n + 1) {
  background-color: #7cc0ff;
}
</style>
