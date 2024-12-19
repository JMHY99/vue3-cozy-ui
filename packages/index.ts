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
import { CAvatar, CAvatarGroup } from './avatar'
import CSpace from "./space";
import CWatermark from "./watermark";
import CInput from "./input";
import CRadio, { CRadioButton, CRadioGroup } from "./radio";
import CInputNumber from "./input-number";
import CSwitch from "./switch";
import Message from "./message";
import CRow from "./row";
import CCol from "./col";
import CBreadcrumb, { CBreadcrumbItem } from "./breadcrumb";
import CCheckbox, { CCheckboxGroup } from "./checkbox";
import CRate from "./rate";
import CSlider from "./slider";
import CSelect, { COption, COptionGroup } from "./select";
import CUpload from "./upload";
import CDatePicker from "./date-picker";
import CTimePicker from "./time-picker";
import CCalendar from "./calendar";
import { CForm, CFormItem } from "./form";
import Divider from "./divider";
import CMenu from "./menu";
import { CMenuItem, CSubMenu, CMenuItemGroup } from "./menu";
import CPageHeader from "./page-header";
import CPagination from "./pagination";
import { CSteps, CStep } from "./steps";
import CDropdown from "./dropdown";
import { CAnchor, CAnchorLink } from "./anchor";
import CBadge from './badge'
import CCard from './card'

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
  CAvatarGroup,
  CSpace,
  CWatermark,
  CInput,
  CRadio,
  CRadioButton,
  CRadioGroup,
  CInputNumber,
  CSwitch,
  CRow,
  CCol,
  CBreadcrumb,
  CBreadcrumbItem,
  CCheckbox,
  CCheckboxGroup,
  CRate,
  CSlider,
  CSelect,
  COption,
  COptionGroup,
  CUpload,
  CDatePicker,
  CTimePicker,
  CCalendar,
  CForm,
  CFormItem,
  Divider,
  CMenu,
  CMenuItem,
  CSubMenu,
  CMenuItemGroup,
  CPageHeader,
  CPagination,
  CSteps,
  CStep,
  CDropdown,
  CAnchor,
  CAnchorLink,
  CBadge,
  CCard
];

const installComponents = (app: any) => {
  components.forEach((comp: any) => {
    app.component(comp.name as string, comp);
  });
};
const install = (app: any, router?: any) => {
  installComponents(app);
  app.config.globalProperties.$message = Message;
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
  CAvatarGroup,
  CSpace,
  CWatermark,
  CInput,
  CRadio,
  CRadioButton,
  CRadioGroup,
  CInputNumber,
  CSwitch,
  Message,
  CRow,
  CCol,
  CBreadcrumb,
  CBreadcrumbItem,
  CCheckbox,
  CCheckboxGroup,
  CRate,
  CSlider,
  CSelect,
  COption,
  COptionGroup,
  CUpload,
  CDatePicker,
  CTimePicker,
  CCalendar,
  CForm,
  CFormItem,
  Divider,
  CMenu,
  CMenuItem,
  CSubMenu,
  CMenuItemGroup,
  CPageHeader,
  CPagination,
  CSteps,
  CStep,
  CDropdown,
  CAnchor,
  CAnchorLink,
  CBadge,
  CCard
};

export default { install };
