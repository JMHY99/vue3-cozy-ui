import CBadge from "./badge.vue";

CBadge.install = (app: any) => {
  app.component(CBadge.name, CBadge);
};

export default CBadge;
