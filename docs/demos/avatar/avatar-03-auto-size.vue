<template>
  <div class="demo-avatar">
    <div class="avatar-list">
      <c-avatar size="large">{{ user }}</c-avatar>
      <button class="change-button" @click="changeUser">
        Change
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const user = ref('User')
const userList = ['U', 'User', 'User1', 'Username', 'Very Long Username']

const changeUser = () => {
  const index = userList.indexOf(user.value)
  user.value = userList[(index + 1) % userList.length]
}
</script>

<style scoped>
.demo-avatar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.avatar-list {
  display: flex;
  gap: 16px;
  align-items: center;
}

.change-button {
  padding: 0 16px;
  height: 32px;
  color: #1677ff;
  border: 1px solid #1677ff;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
}

.change-button:hover {
  color: #4096ff;
  border-color: #4096ff;
}
</style>
