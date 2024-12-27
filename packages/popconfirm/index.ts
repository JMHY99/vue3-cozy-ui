import type { App, Plugin } from 'vue'
import CPopconfirm from './popconfirm.vue'

type SFCWithInstall<T> = T & Plugin

const withInstall = <T>(comp: T) => {
  const c = comp as SFCWithInstall<T>
  c.install = (app: App) => {
    app.component('CPopconfirm', c)
  }
  return c
}

export default withInstall(CPopconfirm) 