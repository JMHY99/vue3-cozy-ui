import CBreadcrumb from './breadcrumb.vue'
import CBreadcrumbItem from './breadcrumb-item.vue'

CBreadcrumb.install = (app: any) => {
  app.component(CBreadcrumb.name, CBreadcrumb)
  app.component(CBreadcrumbItem.name, CBreadcrumbItem)
}

export { CBreadcrumbItem }
export default CBreadcrumb
