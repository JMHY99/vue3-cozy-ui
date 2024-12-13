import Row from './row.vue'

Row.install = (app: any) => {
  app.component(Row.name, Row)
}

export default Row
