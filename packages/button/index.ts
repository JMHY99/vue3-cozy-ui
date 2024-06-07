import CButton from "./button.vue";

CButton.install = (app) => {
  app.component(CButton.name, CButton);
};
export default CButton;
