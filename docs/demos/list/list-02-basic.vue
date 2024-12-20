<template>
  <c-list :data-source="data">
    <template #item="{ item }">
      <c-list-item>
        <template #meta>
          <template #avatar>
            <c-avatar :src="item.avatar" />
          </template>
          <template #title>
            <a href="javascript:;">{{ item.title }}</a>
          </template>
          <template #description>{{ item.description }}</template>
        </template>
        <template #actions>
          <a href="javascript:;">编辑</a>
          <a href="javascript:;">更多</a>
        </template>
        <template #extra>
          <img
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </template>
      </c-list-item>
    </template>
  </c-list>
</template>

<script setup>
import { ref } from 'vue'

const data = ref([
  {
    title: 'Ant Design Title 1',
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  },
  {
    title: 'Ant Design Title 2',
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  },
  {
    title: 'Ant Design Title 3',
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  },
  {
    title: 'Ant Design Title 4',
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  },
])
</script> 