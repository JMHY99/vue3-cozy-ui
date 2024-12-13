import CTimePicker from './time-picker.vue'

CTimePicker.install = (app: any) => {
  app.component(CTimePicker.name, CTimePicker)
}

export default CTimePicker 