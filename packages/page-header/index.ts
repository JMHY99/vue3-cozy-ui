import CPageHeader from './page-header.vue'

CPageHeader.install = (app: any) => {
  app.component(CPageHeader.name, CPageHeader)
}

export default CPageHeader 