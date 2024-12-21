<template>
  <div>
    <h3>Large Size</h3>
    <c-list size="large" :data-source="data">
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
        </c-list-item>
      </template>
    </c-list>

    <h3>Small Size</h3>
    <c-list size="small" :data-source="data">
      <template #item="{ item }">
        <c-list-item>
          <template #meta>
            <div class="cozy-list-item-meta">
              <div class="cozy-list-item-meta-avatar">
                <c-avatar :src="item.avatar" size="small" />
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
        </c-list-item>
      </template>
    </c-list>
  </div>
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
])
</script>

<style scoped>
h3 {
  margin: 16px 0;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
}
</style> 