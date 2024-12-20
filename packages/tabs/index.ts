import CTabs from './tabs.vue';
import CTabPane from './tab-pane.vue';

CTabs.install = (app: any) => {
  app.component(CTabs.name, CTabs);
  app.component(CTabPane.name, CTabPane);
};

export { CTabPane };
export default CTabs;
