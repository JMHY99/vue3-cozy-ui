import CImage from './image.vue'

CImage.install = function(app: any) {
  app.component(CImage.name, CImage)
}

export default CImage 