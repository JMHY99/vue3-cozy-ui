<template>
  <div class="carousel-demo-group">
    <c-carousel height="200px" indicator-position="outside">
      <c-carousel-item v-for="item in 4" :key="item">
        <div class="carousel-demo-item" :style="{ background: colors[item - 1] }">
          {{ item }}
        </div>
      </c-carousel-item>
    </c-carousel>

    <c-carousel height="200px" indicator-type="dot">
      <c-carousel-item v-for="item in 4" :key="item">
        <div class="carousel-demo-item" :style="{ background: colors[item - 1] }">
          {{ item }}
        </div>
      </c-carousel-item>
    </c-carousel>

    <c-carousel height="200px" indicator-type="label">
      <c-carousel-item v-for="item in 4" :key="item" :label="`标题 ${item}`">
        <div class="carousel-demo-item" :style="{ background: colors[item - 1] }">
          {{ item }}
        </div>
      </c-carousel-item>
    </c-carousel>
  </div>
</template>

<script setup lang="ts">
const colors = ['#364d79', '#64cbcc', '#8bc34a', '#ff9800']
</script>

<style scoped>
.carousel-demo-group {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.carousel-demo-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
}
</style>
