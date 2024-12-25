import CTransfer from './transfer.vue'

CTransfer.install = function(app: any) {
  app.component(CTransfer.name, CTransfer)
}

export default CTransfer 