import CIcon from "./icon";
import CButton from "./button";
import CButtonGroup from "./button-group";

const components = [CIcon, CButton, CButtonGroup];

const installComponents = (app: any) => {
  components.forEach((comp: any) => {
    app.component(comp.name as string, comp);
  });
};
const install = (app: any, router?: any) => {
  installComponents(app);
};

export { CIcon, CButton, CButtonGroup };

export default { install };
