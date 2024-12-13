import CCheckbox from './checkbox.vue'
import CCheckboxGroup from './checkbox-group.vue'

CCheckbox.install = (app: any) => {
  app.component(CCheckbox.name, CCheckbox)
}

CCheckboxGroup.install = (app: any) => {
  app.component(CCheckboxGroup.name, CCheckboxGroup)
}

export { CCheckboxGroup }
export default CCheckbox
