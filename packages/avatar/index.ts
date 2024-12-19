import CAvatar from './avatar.vue'
import CAvatarGroup from './avatar-group.vue'

CAvatar.install = (app: any) => {
  app.component(CAvatar.name, CAvatar)
}

CAvatarGroup.install = (app: any) => {
  app.component(CAvatarGroup.name, CAvatarGroup)
}

export { CAvatar, CAvatarGroup }
export default CAvatar
