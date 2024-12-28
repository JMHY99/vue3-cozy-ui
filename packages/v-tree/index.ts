import VTree from './v-tree.vue';

// 注册组件
VTree.install = function(app: any) {
  app.component(VTree.name, VTree);
};

// 导出组件
export default VTree;

// TypeScript 的组件类型定义
export type VTreeInstance = InstanceType<typeof VTree>; 