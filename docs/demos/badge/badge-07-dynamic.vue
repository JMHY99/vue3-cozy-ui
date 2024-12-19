<template>
  <div class="demo-badge">
    <div class="badge-controls">
      <button class="badge-button" @click="decrease">
        <span>-</span>
      </button>
      <button class="badge-button" @click="increase">
        <span>+</span>
      </button>
      <button class="badge-button" @click="random">
        Random
      </button>
      <button class="badge-button" @click="toggleDot">
        Toggle Dot
      </button>
    </div>
    <div class="badge-display">
      <c-badge
        :count="count"
        :dot="isDot"
        :overflow-count="10"
        :offset="[0, 0]"
      >
        <div class="demo-badge-box"></div>
      </c-badge>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(5)
const isDot = ref(false)

const decrease = () => {
  count.value = Math.max(0, count.value - 1)
}

const increase = () => {
  count.value = count.value + 1
}

const random = () => {
  count.value = Math.floor(Math.random() * 100)
}

const toggleDot = () => {
  isDot.value = !isDot.value
}
</script>

<style scoped>
.demo-badge {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.badge-controls {
  display: flex;
  gap: 8px;
}

.badge-button {
  padding: 4px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.badge-button:hover {
  color: #1677ff;
  border-color: #1677ff;
}

.badge-display {
  padding: 24px;
}

.demo-badge-box {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee;
}
</style>
