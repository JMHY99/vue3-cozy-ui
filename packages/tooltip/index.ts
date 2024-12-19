// import type { App, Plugin } from 'vue'
// import Tooltip from './tooltip.vue'

// export const TooltipPlugin: Plugin = {
//   install(app: App) {
//     app.component('CTooltip', Tooltip)
//   }
// }

// export { Tooltip }
// export default TooltipPlugin 

import CTooltip from "./tooltip.vue";

CTooltip.install = (app: any) => {
  app.component(CTooltip.name, CTooltip);
};

export default CTooltip;