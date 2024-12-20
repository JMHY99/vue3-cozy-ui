<template>
  <div class="demo">
    <c-tabs v-model:activeKey="activeKey" :tabBarStyle="{ justifyContent: 'center' }">
      <c-tab-pane name="1" tab="Tab 1">
        Content of Tab Pane 1
      </c-tab-pane>
      <c-tab-pane name="2" tab="Tab 2">
        Content of Tab Pane 2
      </c-tab-pane>
      <c-tab-pane name="3" tab="Tab 3">
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
</style>
