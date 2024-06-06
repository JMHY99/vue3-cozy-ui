<template>
  <div class="color-box">
    <div class="color color1"></div>
    <div class="color color2"></div>
    <div class="color color3"></div>
    <div class="color color4"></div>
    <div class="color color5"></div>
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
  background: $color-info;
}

.color3 {
  background: $color-success;
}

.color4 {
  background: $color-warning;
}

.color5 {
  background: $color-danger;
}
</style>
