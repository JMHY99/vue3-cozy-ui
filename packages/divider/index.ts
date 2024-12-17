import CDivider from "./divider.vue";

CDivider.install = (app: any) => {
  app.component(CDivider.name, CDivider);
};

export default CDivider;
