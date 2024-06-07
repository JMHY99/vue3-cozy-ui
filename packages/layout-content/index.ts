import CContent from "./content.vue";

CContent.install = (app) => {
  app.component(CContent.name, CContent);
};

export default CContent;
