import CForm from './form.vue'
import CFormItem from './form-item.vue'

CForm.install = (app: any) => {
  app.component(CForm.name, CForm)
  app.component(CFormItem.name, CFormItem)
}

export { CForm, CFormItem }
export default CForm 