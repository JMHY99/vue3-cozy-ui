<template>
  <div class="color-box">
    <div class="color color1"></div>
    <div class="color color2"></div>
    <div class="color color3"></div>
    <div class="color color4"></div>
    <div class="color color5"></div>
    <div class="color color6"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "../../../packages/style/src/variables.scss";
.color-box {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.color-box .color {
  width: 300px;
  height: 100px;
  border-radius: 5px;
}

.color1 {
  background: $color-primary;
}

.color2 {
  background: $color-primary-light-1;
}

.color3 {
  background: $color-primary-light-2;
}

.color4 {
  background: $color-primary-light-3;
}

.color5 {
  background: $color-primary-light-4;
}

.color6 {
  background: $color-primary-light-5;
}
</style>
