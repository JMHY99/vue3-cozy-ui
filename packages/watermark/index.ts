import CWatermark from "./watermark.vue";

CWatermark.install = (app) => {
  app.component(CWatermark.name, CWatermark);
};
export default CWatermark;
