import { createVNode, render, VNode, App } from 'vue'
import MessageConstructor from './message.vue'

let seed = 1
const instances: VNode[] = []
const gap = 16 // 消息间距

// 获取消息的当前位置
const getVerticalOffset = (height: number, index: number) => {
  let verticalOffset = gap
  for (let i = 0; i < index; i++) {
    verticalOffset += (instances[i].el?.offsetHeight || 0) + gap
  }
  return verticalOffset
}

// 更新消息位置
const updatePosition = () => {
  for (let i = 0; i < instances.length; i++) {
    const instance = instances[i]
    const verticalOffset = getVerticalOffset(instance.el?.offsetHeight || 0, i)
    instance.component!.props.offset = verticalOffset
  }
}

const Message = (options: any) => {
  if (typeof options === 'string') {
    options = {
      content: options
    }
  }

  const container = document.createElement('div')
  const id = `message_${seed++}`
  const userOnClose = options.onClose

  const props = {
    ...options,
    id,
    offset: instances.length ? instances[instances.length - 1].el?.offsetHeight + gap : gap,
    onClose: () => {
      close(id, userOnClose)
    }
  }

  const vnode = createVNode(MessageConstructor, props)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!.proxy as any
  instances.push(vnode)

  // 使用 nextTick 确保组件已经挂载
  Promise.resolve().then(() => {
    // 更新位置
    updatePosition()
    // 显示消息
    vm.show()
  })

  return {
    close: () => vm.close()
  }
}

// 关闭方法
function close(id: string, userOnClose?: (vm: VNode) => void) {
  const index = instances.findIndex(({ props }) => props!.id === id)
  if (index === -1) return

  const vm = instances[index]
  if (!vm) return

  userOnClose?.(vm)
  instances.splice(index, 1)

  // 更新位置
  if (instances.length) {
    updatePosition()
  }
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

// 全局方法
Message.destroy = () => {
  while (instances.length) {
    const instance = instances[0]
    instance.component?.proxy?.close()
    instances.splice(0, 1)
  }
}

// 全局注册
Message.install = (app: App) => {
  app.config.globalProperties.$message = Message
}

export default Message
