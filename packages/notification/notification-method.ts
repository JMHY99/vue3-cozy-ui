import { createVNode, render, type VNode } from 'vue'
import CNotification from './notification.vue'

let seed = 0
const instances: VNode[] = []

export interface NotificationOptions {
  title?: string
  description?: string
  type?: 'success' | 'info' | 'warning' | 'error'
  duration?: number
  placement?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'
  icon?: string
  closeIcon?: string
  closable?: boolean
  style?: Record<string, any>
}

/**
 * 创建通知框
 * @param options 通知框配置项
 */
const notification = (options: NotificationOptions) => {
  const id = `notification_${seed++}`
  const container = document.createElement('div')

  // 创建关闭函数
  const close = () => {
    render(null, container)
    container.remove()
    const index = instances.indexOf(vm)
    if (index !== -1) {
      instances.splice(index, 1)
    }
  }

  // 创建虚拟节点
  const vm = createVNode(CNotification, {
    ...options,
    modelValue: true,
    'onUpdate:modelValue': (val: boolean) => {
      if (!val) {
        close()
      }
    },
    notificationKey: id
  })

  // 渲染到容器
  render(vm, container)
  document.body.appendChild(container)
  instances.push(vm)

  return {
    close
  }
}

// 创建不同类型的快捷方法
const types = ['success', 'info', 'warning', 'error'] as const
types.forEach(type => {
  notification[type] = (options: NotificationOptions) => {
    return notification({
      ...options,
      type
    })
  }
})

export default notification 