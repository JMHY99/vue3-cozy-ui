import { createVNode, render, VNode, App } from 'vue'
import MessageConstructor from './message.vue'

let seed = 1
const instances: VNode[] = []

const Message = (options: any) => {
  if (typeof options === 'string') {
    options = {
      content: options
    }
  }

  // 计算偏移量，每个消息之间间隔16px
  let verticalOffset = 20
  instances.forEach(({ el }) => {
    verticalOffset += (el?.offsetHeight || 0) + 16
  })

  const id = `message_${seed++}`
  const userOnClose = options.onClose

  const container = document.createElement('div')

  const props = {
    ...options,
    offset: verticalOffset,
    id,
    onClose: () => {
      close(id, userOnClose)
    }
  }

  const vnode = createVNode(MessageConstructor, props)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!.proxy as any
  vnode.props!.offset = verticalOffset
  instances.push(vnode)

  // 使用 nextTick 确保组件已经挂载
  Promise.resolve().then(() => {
    vm.show()
  })

  return {
    close: () => vm.close()
  }
}

// 关闭方法
function close(id: string, userOnClose?: (vm: VNode) => void) {
  const idx = instances.findIndex(({ props }) => props!.id === id)
  if (idx === -1) return

  const vm = instances[idx]
  if (!vm) return

  userOnClose?.(vm)

  // 直接从数组中移除实例，不需要更新其他消息的位置
  instances.splice(idx, 1)
}

// 定义类型
type MessageType = 'success' | 'warning' | 'info' | 'error' | 'loading'
type MessageParams = string | { content: string; duration?: number; onClose?: () => void }

// 创建不同类型的方法
function createMessage(type: MessageType) {
  return (options: MessageParams, duration?: number, onClose?: () => void) => {
    if (typeof options === 'string') {
      return Message({
        type,
        content: options,
        duration: duration || 3000,
        onClose
      })
    }
    return Message({
      type,
      ...options
    })
  }
}

// 导出不同类型的方法
Message.success = createMessage('success')
Message.warning = createMessage('warning')
Message.warn = Message.warning // alias
Message.info = createMessage('info')
Message.error = createMessage('error')
Message.loading = createMessage('loading')

// 全局注册
Message.install = (app: App) => {
  app.config.globalProperties.$message = Message
}

export default Message
