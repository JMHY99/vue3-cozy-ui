import { App } from 'vue';
import CPopover from './popover.vue';

CPopover.install = (app: any) => {
  app.component(CPopover.name, CPopover);
};

export default CPopover;
