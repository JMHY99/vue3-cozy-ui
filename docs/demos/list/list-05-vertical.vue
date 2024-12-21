<template>
  <c-list
    item-layout="vertical"
    :data-source="data"
  >
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
        <div class="list-content">
          {{ item.content }}
        </div>
        <template #actions>
          <a href="javascript:;">
            <i class="cozy-icon c-star-outlined"></i>
            156
          </a>
          <a href="javascript:;">
            <i class="cozy-icon c-like-outlined"></i>
            156
          </a>
          <a href="javascript:;">
            <i class="cozy-icon c-message-outlined"></i>
            2
          </a>
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
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
  {
    title: 'Ant Design Title 2',
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
])
</script>

<style scoped>
.list-content {
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 16px;
}

.cozy-icon {
  margin-right: 8px;
}
</style> 