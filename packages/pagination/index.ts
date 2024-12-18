import CPagination from './pagination.vue'

CPagination.install = (app: any) => {
  app.component(CPagination.name, CPagination)
}

export default CPagination 