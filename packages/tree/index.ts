import CTree from './tree.vue'

CTree.install = function(app: any) {
  app.component(CTree.name, CTree)
}

export default CTree 