<template>
  <div>
    <div class="demo3">
      <c-flex wrap="wrap" gap="small">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
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
.demo3 div > div {
  width: 100px;
  height: 80px;
}

.demo3 div > div:nth-child(2n) {
  background-color: #2f9bff;
}

.demo3 div > div:nth-child(2n + 1) {
  background-color: #7cc0ff;
}
</style>
