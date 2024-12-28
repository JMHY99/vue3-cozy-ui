<template>
  <div>
    <c-mentions
      v-model="value"
      :options="options"
      placeholder="输入 @ 提及用户"
    >
      <template #option="{ option }">
        <span>
          <c-avatar :size="24" :src="option.avatar" style="margin-right: 8px" />
          <span>{{ option.label }} - {{ option.type }}</span>
        </span>
      </template>
    </c-mentions>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

const options = [
  {
    value: 'afc163',
    label: 'afc163',
    type: '开发者',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1'
  },
  {
    value: 'zombieJ',
    label: 'zombieJ',
    type: '设计师',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2'
  },
  {
    value: 'yesmeck',
    label: 'yesmeck',
    type: '产品经理',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3'
  }
]
</script> 