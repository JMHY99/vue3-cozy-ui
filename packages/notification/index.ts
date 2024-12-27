import type { App, Plugin } from 'vue'
import CNotification from './notification.vue'
import notification from './notification-method'

type SFCWithInstall<T> = T & Plugin

const withInstall = <T>(comp: T) => {
  const c = comp as SFCWithInstall<T>
  c.install = (app: App) => {
    app.component('CNotification', c)
    app.config.globalProperties.$notification = notification
  }
  return c
}

export { notification }
export default withInstall(CNotification) 