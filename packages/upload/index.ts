import CUpload from "./upload.vue";

CUpload.install = (app: any) => {
  app.component(CUpload.name, CUpload);
};

export default CUpload;
