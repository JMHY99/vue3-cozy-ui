import CCollapse from './collapse.vue'
import CCollapsePanel from './collapse-panel.vue'

CCollapse.install = (app: any) => {
  app.component(CCollapse.name, CCollapse)
  app.component(CCollapsePanel.name, CCollapsePanel)
}

export {CCollapse, CCollapsePanel }
export default CCollapse 