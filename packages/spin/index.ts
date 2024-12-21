import CSpin from './spin.vue';

// 注册组件
CSpin.install = function(app: any) {
  app.component(CSpin.name, CSpin);
};

// 导出组件
export default CSpin; 