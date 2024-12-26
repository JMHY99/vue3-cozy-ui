import CProgress from "./progress.vue";

CProgress.install = (app: any) => {
  app.component(CProgress.name, CProgress);
};

export default CProgress;
