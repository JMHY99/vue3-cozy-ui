import type { App, Plugin } from 'vue'
import CDrawer from './drawer.vue'

type SFCWithInstall<T> = T & Plugin

const withInstall = <T>(comp: T) => {
  const c = comp as SFCWithInstall<T>
  c.install = (app: App) => {
    app.component('CDrawer', c)
  }
  return c
}

export default withInstall(CDrawer) 