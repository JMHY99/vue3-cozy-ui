import VTable from './v-table.vue';

// 注册组件
VTable.install = function(app: any) {
  app.component(VTable.name, VTable);
};

// 导出组件
export default VTable;

// TypeScript 的组件类型定义
export type VTableInstance = InstanceType<typeof VTable>; 