import CIcon from "./icon";

const components = [CIcon];

const installComponents = (app: any) => {
  components.forEach((comp: any) => {
    app.component(comp.name as string, comp);
  });
};
const install = (app: any, router?: any) => {
  installComponents(app);
};

export { CIcon };

export default { install };
