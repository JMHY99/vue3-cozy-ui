<template>
  <div class="demo">
    <c-tabs
      v-model:activeKey="activeKey"
      type="editable-card"
      @edit="onEdit"
    >
      <c-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :name="pane.key"
        :tab="pane.title"
        :closable="pane.closable"
      >
        {{ pane.content }}
      </c-tab-pane>
    </c-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface TabPane {
  title: string;
  content: string;
  key: string;
  closable?: boolean;
}

const activeKey = ref('1');
const newTabIndex = ref(0);

const panes = ref<TabPane[]>([
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
]);

const onEdit = (targetKey: string | MouseEvent, action: 'add' | 'remove') => {
  if (action === 'add') {
    add();
  } else {
    remove(targetKey as string);
  }
};

const add = () => {
  const newActiveKey = `newTab${newTabIndex.value++}`;
  panes.value.push({
    title: 'New Tab',
    content: 'Content of new Tab',
    key: newActiveKey,
  });
  activeKey.value = newActiveKey;
};

const remove = (targetKey: string) => {
  let lastIndex = 0;
  panes.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1;
    }
  });
  panes.value = panes.value.filter(pane => pane.key !== targetKey);
  if (panes.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = panes.value[lastIndex].key;
    } else {
      activeKey.value = panes.value[0].key;
    }
  }
};
</script>

<style scoped>
.demo {
  padding: 24px;
  background: #fff;
}
</style>
