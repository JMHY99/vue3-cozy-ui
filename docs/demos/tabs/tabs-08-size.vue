<template>
  <div class="demo">
    <div style="margin-bottom: 16px">
      Size:
      <c-radio-group v-model="size">
        <c-radio-button label="small">Small</c-radio-button>
        <c-radio-button label="default">Default</c-radio-button>
        <c-radio-button label="large">Large</c-radio-button>
      </c-radio-group>
    </div>
    <c-tabs v-model:activeKey="activeKey" :size="size">
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
const size = ref<'small' | 'default' | 'large'>('default');
</script>

<style scoped>
.demo {
  padding: 24px;
  background: #fff;
}
</style>
