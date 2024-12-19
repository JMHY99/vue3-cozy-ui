<template>
  <c-carousel height="200px" type="card">
    <c-carousel-item v-for="item in 6" :key="item">
      <div
        class="carousel-demo-item"
        :style="{ background: colors[(item - 1) % 4] }"
      >
        {{ item }}
      </div>
    </c-carousel-item>
  </c-carousel>
</template>

<script setup lang="ts">
const colors = ["#364d79", "#64cbcc", "#8bc34a", "#ff9800"];
</script>

<style scoped>
.carousel-demo-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
}
</style>
