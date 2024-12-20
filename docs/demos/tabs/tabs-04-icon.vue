<template>
  <div class="demo">
    <c-tabs v-model:activeKey="activeKey">
      <c-tab-pane name="1">
        <template #tab>
          <span>
            <c-icon name="apple" />
            Tab 1
          </span>
        </template>
        Content of Tab Pane 1
      </c-tab-pane>
      <c-tab-pane name="2">
        <template #tab>
          <span>
            <c-icon name="android" />
            Tab 2
          </span>
        </template>
        Content of Tab Pane 2
      </c-tab-pane>
      <c-tab-pane name="3">
        <template #tab>
          <span>
            <c-icon name="windows" />
            Tab 3
          </span>
        </template>
        Content of Tab Pane 3
      </c-tab-pane>
    </c-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeKey = ref('1');
</script>

<style scoped>
.demo {
  padding: 24px;
  background: #fff;
}

.c-icon {
  margin-right: 8px;
}
</style>
