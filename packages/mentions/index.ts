import CMentions from './mentions.vue'

CMentions.install = (app: any) => {
  app.component(CMentions.name, CMentions);
};

export default CMentions;