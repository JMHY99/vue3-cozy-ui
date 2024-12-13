import CDatePicker from './date-picker.vue'

CDatePicker.install = (app: any) => {
  app.component(CDatePicker.name, CDatePicker)
}

export default CDatePicker 