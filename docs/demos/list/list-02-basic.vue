<template>
  <c-list :data-source="data">
    <template #item="{ item }">
      <c-list-item>
        <template #meta>
          <div class="cozy-list-item-meta">
            <div class="cozy-list-item-meta-avatar">
              <c-avatar :src="item.avatar" />
            </div>
            <div class="cozy-list-item-meta-content">
              <div class="cozy-list-item-meta-title">
                <a href="javascript:;">{{ item.title }}</a>
              </div>
              <div class="cozy-list-item-meta-description">
                {{ item.description }}
              </div>
            </div>
          </div>
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

<script setup lang="ts">
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