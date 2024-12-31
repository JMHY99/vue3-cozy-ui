<template>
  <div class="demo-anchor">
    <div class="scroll-container" ref="container">
      <div class="anchor-wrapper">
        <div class="anchor-content">
          <h2 id="custom1">自定义容器1</h2>
          <p>这是自定义容器1的内容区域，展示在特定容器内的锚点效果。</p>
          <h2 id="custom2">自定义容器2</h2>
          <p>这是自定义容器2的内容区域，展示在特定容器内的锚点效果。</p>
          <h2 id="custom3">自定义容器3</h2>
          <p>这是自定义容器3的内容区域，展示在特定容器内的锚点效果。</p>
        </div>
        <c-anchor :get-container="getContainer" :affix="false">
          <c-anchor-link href="custom1" title="自定义容器1" />
          <c-anchor-link href="custom2" title="自定义容器2" />
          <c-anchor-link href="custom3" title="自定义容器3" />
        </c-anchor>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const container = ref<HTMLElement | null>(null)

const getContainer = () => container.value as HTMLElement
</script>

<style scoped>
.demo-anchor {
  padding: 20px;
}

.scroll-container {
  height: 300px;
  overflow: auto;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}

.anchor-wrapper {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.anchor-content {
  flex: 1;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}

h2 {
  margin: 16px 0;
  font-size: 20px;
}

p {
  margin: 16px 0;
  line-height: 1.5;
  padding: 30px 0;
}
</style>
