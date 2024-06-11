import CAlert from "./alert.vue";

CAlert.install = (app) => {
  app.component(CAlert.name, CAlert);
};
export default CAlert;
