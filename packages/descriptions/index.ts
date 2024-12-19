import CDescriptions from './descriptions.vue'
import CDescriptionsItem from './descriptions-item.vue'

CDescriptions.install = (app: any) => {
  app.component(CDescriptions.name, CDescriptions)
}

CDescriptionsItem.install = (app: any) => {
  app.component(CDescriptionsItem.name, CDescriptionsItem)
}

export { CDescriptionsItem }
export default CDescriptions 