<template>
  <div class="demo">
    <div style="margin-bottom: 16px">
      Tab position:
      <c-radio-group v-model="tabPosition">
        <c-radio-button label="top">top</c-radio-button>
        <c-radio-button label="bottom">bottom</c-radio-button>
        <c-radio-button label="left">left</c-radio-button>
        <c-radio-button label="right">right</c-radio-button>
      </c-radio-group>
    </div>
    <c-tabs v-model:activeKey="activeKey" :tabPosition="tabPosition">
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
const tabPosition = ref<'top' | 'bottom' | 'left' | 'right'>('top');
</script>

<style scoped>
.demo {
  padding: 24px;
  background: #fff;
}
</style>
