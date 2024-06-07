import CHeader from "./header.vue";

CHeader.install = (app) => {
  app.component(CHeader.name, CHeader);
};

export default CHeader;
