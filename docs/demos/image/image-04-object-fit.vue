<template>
  <div class="image-demo">
    <div v-for="fit in fits" :key="fit" class="image-demo-item">
      <span>{{ fit }}:</span>
      <c-image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        :width="100"
        :height="100"
        :fit="fit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const fits = ['contain', 'cover', 'fill', 'none', 'scale-down']
</script>

<style scoped>
.image-demo {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.image-demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.image-demo-item span {
  color: #666;
  font-size: 14px;
}
</style> 