import CRadio from './radio.vue'
import CRadioButton from './radio-button.vue'
import CRadioGroup from './radio-group.vue'

CRadio.install = (app: any) => {
  app.component(CRadio.name, CRadio)
}

CRadioButton.install = (app: any) => {
  app.component(CRadioButton.name, CRadioButton)
}

CRadioGroup.install = (app: any) => {
  app.component(CRadioGroup.name, CRadioGroup)
}

export { CRadioButton, CRadioGroup }
export default CRadio
