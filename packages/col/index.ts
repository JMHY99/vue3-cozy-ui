import Col from './col.vue'

Col.install = (app: any) => {
  app.component(Col.name, Col)
}

export default Col
