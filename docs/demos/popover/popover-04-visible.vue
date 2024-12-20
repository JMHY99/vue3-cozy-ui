<template>
  <div class="demo">
    <c-popover v-model:visible="visible" title="标题">
      <template #content>
        <div>
          <p>这是一段内容，这是一段内容，这是一段内容。</p>
          <button @click="hide">关闭</button>
        </div>
      </template>
      <button>点击查看</button>
    </c-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);

const hide = () => {
  visible.value = false;
};
</script>

<style scoped>
.demo {
  padding: 20px;
}
button {
  margin: 4px;
  padding: 4px 8px;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background: #fff;
  color: #666;
}
button:hover {
  color: #1677ff;
  border-color: #1677ff;
}
</style>
