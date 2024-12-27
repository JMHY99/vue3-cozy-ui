import { ref } from 'vue'

// 通知实例接口
interface NotificationInstance {
  id: string
  offset: number
  placement: string
}

// 存储不同位置的通知实例
const notificationMap = new Map<string, NotificationInstance[]>()

// 计数器，用于生成唯一ID
let seed = 1

/**
 * 获取指定位置的通知列表
 * @param placement 位置
 */
const getNotifications = (placement: string) => {
  if (!notificationMap.has(placement)) {
    notificationMap.set(placement, [])
  }
  return notificationMap.get(placement)!
}

/**
 * 添加通知实例
 * @param placement 位置
 * @returns 通知实例的偏移量和ID
 */
export const addNotification = (placement: string) => {
  const notifications = getNotifications(placement)
  const id = `notification_${seed++}`
  const offset = notifications.length * 90 + 24 // 每个通知框高度 + 间距

  const instance: NotificationInstance = {
    id,
    offset,
    placement
  }
  
  notifications.push(instance)
  return { offset, id }
}

/**
 * 移除通知实例
 * @param placement 位置
 * @param id 通知实例ID
 */
export const removeNotification = (placement: string, id: string) => {
  const notifications = getNotifications(placement)
  const index = notifications.findIndex(instance => instance.id === id)
  
  if (index !== -1) {
    notifications.splice(index, 1)
    // 更新后续通知的偏移量
    for (let i = index; i < notifications.length; i++) {
      notifications[i].offset = i * 90 + 24
    }
  }
}

/**
 * 获取通知实例的偏移量
 * @param placement 位置
 * @param id 通知实例ID
 */
export const getNotificationOffset = (placement: string, id: string) => {
  const notifications = getNotifications(placement)
  const instance = notifications.find(instance => instance.id === id)
  return instance ? instance.offset : 24
} 