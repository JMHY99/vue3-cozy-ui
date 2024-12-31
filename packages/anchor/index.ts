import CAnchor from './anchor.vue'
import CAnchorLink from './anchor-link.vue'

CAnchor.install = (app: any) => {
  app.component(CAnchor.name, CAnchor)
}

CAnchorLink.install = (app: any) => {
  app.component(CAnchorLink.name, CAnchorLink)
}

export { CAnchor, CAnchorLink }
export default CAnchor
