import CSkeleton from './skeleton.vue';

// 注册组件
CSkeleton.install = function(app: any) {
  app.component(CSkeleton.name, CSkeleton);
};

// 导出组件
export default CSkeleton; 