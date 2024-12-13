import CIcon from "./icon";
import CButton from "./button";
import CButtonGroup from "./button-group";
import CFlex from "./flex";
import CLayout from "./layout";
import CContent from "./layout-content";
import CFooter from "./layout-footer";
import CHeader from "./layout-header";
import CSider from "./layout-sider";
import CAffix from "./affix";
import CAlert from "./alert";
import CAvatar from "./avatar";
import CSpace from "./space";
import CWatermark from "./watermark";
import CInput from './input'
import CRadio, { CRadioButton, CRadioGroup } from './radio'

const components = [
  CIcon,
  CButton,
  CButtonGroup,
  CFlex,
  CLayout,
  CContent,
  CFooter,
  CHeader,
  CSider,
  CAffix,
  CAlert,
  CAvatar,
  CSpace,
  CWatermark,
  CInput,
  CRadio,
  CRadioButton,
  CRadioGroup,
];

const installComponents = (app: any) => {
  components.forEach((comp: any) => {
    app.component(comp.name as string, comp);
  });
};
const install = (app: any, router?: any) => {
  installComponents(app);
};

export {
  CIcon,
  CButton,
  CButtonGroup,
  CFlex,
  CLayout,
  CContent,
  CFooter,
  CHeader,
  CSider,
  CAffix,
  CAlert,
  CAvatar,
  CSpace,
  CWatermark,
  CInput,
  CRadio,
  CRadioButton,
  CRadioGroup,
};

export default { install };
