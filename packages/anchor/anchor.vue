<template>
  <div
    class="cozy-anchor"
    :class="{
      'cozy-anchor-fixed': affix && !customizeAffix,
      [`cozy-anchor-${direction}`]: true
    }"
    :style="wrapperStyle"
  >
    <!-- 固定位置的包装器 -->
    <div
      v-if="affix && !customizeAffix"
      class="cozy-anchor-wrapper"
      :style="containerStyle"
    >
      <div class="cozy-anchor-ink">
        <!-- 墨条 -->
        <div class="cozy-anchor-ink-ball-visible" :style="inkStyle" ref="inkNode" />
      </div>
      <!-- 锚点链接内容 -->
      <slot></slot>
    </div>
    <!-- 不固定位置的内容 -->
    <template v-else>
      <div class="cozy-anchor-ink">
        <div class="cozy-anchor-ink-ball-visible" :style="inkStyle" ref="inkNode" />
      </div>
      <slot></slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, provide } from 'vue'

defineOptions({
  name: 'CAnchor'
})

// 定义组件属性
interface Props {
  /** 固定模式 */
  affix?: boolean
  /** 距离窗口顶部达到指定偏移量后触发 */
  bounds?: number
  /** 自定义 class */
  customizeAffix?: boolean
  /** 方向 */
  direction?: 'vertical' | 'horizontal'
  /** 指定滚动的容器 */
  getContainer?: () => HTMLElement | Window
  /** 锚点区域边界 */
  offsetBottom?: number
  /** 距离窗口顶部触发偏移量 */
  offsetTop?: number
  /** 是否显示小圆点 */
  showInkInFixed?: boolean
  /** 指定滚动到锚点时的偏移量 */
  targetOffset?: number
  /** 指定最大滚动高度 */
  wrapperStyle?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  affix: true,
  bounds: 5,
  customizeAffix: false,
  direction: 'vertical',
  getContainer: () => window,
  offsetBottom: undefined,
  offsetTop: undefined,
  showInkInFixed: false,
  targetOffset: undefined,
  wrapperStyle: () => ({})
})

// 定义事件
const emit = defineEmits<{
  'click': [e: MouseEvent, link: string]
  'change': [currentActiveLink: string]
}>()

// 组件状态
const activeLink = ref('')
const inkNode = ref<HTMLElement | null>(null)
const links = ref<string[]>([])
const scrollContainer = ref<HTMLElement | Window>(window)
const animating = ref(false)

// 计算样式
const containerStyle = computed(() => ({
  maxHeight: typeof props.offsetBottom === 'number' ?
    `calc(100vh - ${props.offsetBottom}px)` : undefined,
  ...props.wrapperStyle
}))

const inkStyle = computed(() => ({
  top: activeLink.value ? getInkTop() : '0px',
  height: props.direction === 'vertical' ? '8px' : '2px',
  width: props.direction === 'vertical' ? '2px' : '8px',
  transition: animating.value ? 'top 0.3s ease-in-out' : 'none'
}))

// 获取墨条位置
const getInkTop = () => {
  if (!activeLink.value || !inkNode.value) return '0px'
  const linkNode = document.querySelector(`a[href="#${activeLink.value}"]`)
  if (!linkNode) return '0px'

  const { top: inkTop } = inkNode.value.getBoundingClientRect()
  const { top: linkTop } = linkNode.getBoundingClientRect()

  return `${linkTop - inkTop}px`
}

// 注册链接
const registerLink = (link: string) => {
  if (!links.value.includes(link)) {
    links.value.push(link)
  }
}

// 注销链接
const unregisterLink = (link: string) => {
  const index = links.value.indexOf(link)
  if (index !== -1) {
    links.value.splice(index, 1)
  }
}

// 处理点击事件
const handleLinkClick = (e: MouseEvent, link: string) => {
  e.preventDefault()
  e.stopPropagation()

  const element = document.querySelector(link) as HTMLElement
  if (!element) return

  animating.value = true
  activeLink.value = link.slice(1)
  emit('click', e, link)

  const container = props.getContainer()
  const scrollTop = getScroll(container, true)
  const elementOffsetTop = getOffsetTop(element, container)
  const targetOffset = props.targetOffset !== undefined ? props.targetOffset : props.offsetTop || 0

  scrollTo(container, scrollTop, elementOffsetTop - targetOffset)

  // 动画结束后重置状态
  setTimeout(() => {
    animating.value = false
  }, 300)
}

// 获取滚动位置
const getScroll = (target: HTMLElement | Window, top: boolean): number => {
  if (typeof window === 'undefined') return 0

  const prop = top ? 'pageYOffset' : 'pageXOffset'
  const method = top ? 'scrollTop' : 'scrollLeft'
  const isWindow = target === window

  let ret = isWindow ? (target as Window)[prop] : (target as HTMLElement)[method]
  if (isWindow && typeof ret !== 'number') {
    ret = document.documentElement[method]
  }

  return ret
}

// 获取元素相对容器的偏移量
const getOffsetTop = (element: HTMLElement, container: HTMLElement | Window) => {
  if (!element || !container) return 0

  if (container === window) {
    return element.getBoundingClientRect().top + getScroll(window, true)
  }

  return element.getBoundingClientRect().top + getScroll(container as HTMLElement, true)
}

// 滚动到指定位置
const scrollTo = (container: HTMLElement | Window, currentTop: number, targetTop: number) => {
  const startTime = Date.now()
  const frameFunc = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    const nextScrollTop = easeInOutCubic(time > 450 ? 450 : time, currentTop, targetTop, 450)
    if (container === window) {
      window.scrollTo(window.pageXOffset, nextScrollTop)
    } else {
      (container as HTMLElement).scrollTop = nextScrollTop
    }
    if (time < 450) {
      requestAnimationFrame(frameFunc)
    }
  }
  requestAnimationFrame(frameFunc)
}

// 缓动函数
const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
  const cc = c - b
  t /= d / 2
  if (t < 1) {
    return (cc / 2) * t * t * t + b
  }
  return (cc / 2) * ((t -= 2) * t * t + 2) + b
}

// 自定义节流函数
const throttle = (fn: Function, delay: number) => {
  let timer: number | null = null
  let lastTime = 0

  return function (...args: any[]) {
    const now = Date.now()

    if (lastTime && now < lastTime + delay) {
      if (timer) {
        window.clearTimeout(timer)
      }
      timer = window.setTimeout(() => {
        lastTime = now
        fn.apply(this, args)
      }, delay)
    } else {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

// 处理滚动事件
const handleScroll = throttle(() => {
  if (animating.value) return

  const container = props.getContainer()
  const currentTop = getScroll(container, true)

  // 找到当前滚动位置最近的锚点
  let currentActiveLink = ''
  let minDistance = Number.MAX_VALUE

  links.value.forEach(link => {
    const element = document.querySelector(`#${link}`) as HTMLElement
    if (!element) return

    const top = getOffsetTop(element, container)
    const distance = Math.abs(top - currentTop)

    if (distance < minDistance) {
      minDistance = distance
      currentActiveLink = link
    }
  })

  if (currentActiveLink !== activeLink.value) {
    activeLink.value = currentActiveLink
    emit('change', currentActiveLink)
  }
}, 50)

// 监听滚动事件
onMounted(() => {
  scrollContainer.value = props.getContainer()
  scrollContainer.value.addEventListener('scroll', handleScroll)
})

// 清理事件监听
onBeforeUnmount(() => {
  scrollContainer.value.removeEventListener('scroll', handleScroll)
})

// 提供给子组件的方法
provide('anchorContext', {
  registerLink,
  unregisterLink,
  handleLinkClick,
  activeLink
})
</script>
