<template>
  <c-list
    :grid="{ gutter: 16, column: 4 }"
    :data-source="data"
  >
    <template #item="{ item }">
      <c-card :title="item.title">
        {{ item.content }}
      </c-card>
    </template>
  </c-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  {
    title: 'Title 1',
    content: 'Card content',
  },
  {
    title: 'Title 2',
    content: 'Card content',
  },
  {
    title: 'Title 3',
    content: 'Card content',
  },
  {
    title: 'Title 4',
    content: 'Card content',
  },
  {
    title: 'Title 5',
    content: 'Card content',
  },
  {
    title: 'Title 6',
    content: 'Card content',
  },
  {
    title: 'Title 7',
    content: 'Card content',
  },
  {
    title: 'Title 8',
    content: 'Card content',
  },
])
</script> 