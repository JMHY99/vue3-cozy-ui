
import VList from './v-list.vue';

// 注册组件
VList.install = function(app: any) {
  app.component(VList.name, VList);
};

// 导出组件
export default VList;

// TypeScript 的组件类型定义
export type VListInstance = InstanceType <typeof VList >; 