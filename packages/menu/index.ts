import CMenu from './menu.vue'
import CMenuItem from './menu-item.vue'
import CSubMenu from './submenu.vue'
import CMenuItemGroup from './menu-item-group.vue'

CMenu.install = (app: any) => {
  app.component(CMenu.name, CMenu)
}

CMenuItem.install = (app: any) => {
  app.component(CMenuItem.name, CMenuItem)
}

CSubMenu.install = (app: any) => {
  app.component(CSubMenu.name, CSubMenu)
}

CMenuItemGroup.install = (app: any) => {
  app.component(CMenuItemGroup.name, CMenuItemGroup)
}

export { CMenuItem, CSubMenu, CMenuItemGroup }
export default CMenu
