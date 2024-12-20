import CTag from './tag.vue';

CTag.install = (app: any) => {
  app.component(CTag.name, CTag);
};

export default CTag;
