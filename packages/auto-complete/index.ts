import CAutoComplete from './auto-complete.vue'

CAutoComplete.install = (app: any) => {
  app.component(CAutoComplete.name, CAutoComplete)
}

export default CAutoComplete 