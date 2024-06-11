import CAvatar from "./avatar.vue";

CAvatar.install = (app) => {
  app.component(CAvatar.name, CAvatar);
};
export default CAvatar;
