import type { App, Plugin } from 'vue'
import CModal from './modal.vue'

type SFCWithInstall<T> = T & Plugin

const withInstall = <T>(comp: T) => {
  const c = comp as SFCWithInstall<T>
  c.install = (app: App) => {
    app.component('CModal', c)
  }
  return c
}

export default withInstall(CModal) 