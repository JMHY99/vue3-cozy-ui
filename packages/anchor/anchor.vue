<template>
  <div
    ref="rootRef"
    :class="[
      'cozy-anchor',
      {
        'cozy-anchor-slider': type === 'slider',
        'is-affix': affix,
        'is-static': !affix
      },
    ]"
  >
    <div
      v-if="type === 'slider'"
      class="cozy-anchor-slider-line"
      :style="{ height: containerHeight + 'px' }"
    >
      <div
        class="cozy-anchor-slider-ball"
        :style="{
          top: sliderOffset + 'px',
          height: sliderHeight + 'px',
        }"
      />
    </div>
    <div class="cozy-anchor-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  provide,
  nextTick,
  watch,
} from 'vue'

defineOptions({
  name: 'CAnchor',
})

interface Props {
  /** 容器滚动的监听目标 */
  container?: string | HTMLElement
  /** 滚动偏移量 */
  offset?: number
  /** 滚动边界 */
  bounds?: number
  /** 锚点滑动模式 */
  type?: 'slider' | 'line'
  /** 是否浮动 */
  affix?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  container: 'window',
  offset: 0,
  bounds: 5,
  type: 'line',
  affix: true
})

// 组件状态
const rootRef = ref<HTMLElement>()
const activeLink = ref('')
const links = ref<string[]>([])
const sections = ref<{ link: string; top: number }[]>([])
const containerHeight = ref(0)
const sliderHeight = ref(0)
const sliderOffset = ref(0)
let scrollTimer: number | null = null

// 计算属性
const getContainer = computed(() => {
  if (props.container === 'window') {
    return window
  }
  if (typeof props.container === 'string') {
    return document.querySelector(props.container)
  }
  return props.container
})

// 方法
const registerLink = (link: string) => {
  if (!links.value.includes(link)) {
    links.value.push(link)
    nextTick(() => {
      initSections()
      updateSlider()
    })
  }
}

const unregisterLink = (link: string) => {
  const index = links.value.indexOf(link)
  if (index !== -1) {
    links.value.splice(index, 1)
    nextTick(() => {
      initSections()
      updateSlider()
    })
  }
}

const updateSlider = () => {
  if (!rootRef.value || !activeLink.value || props.type !== 'slider') return

  const linkEl = rootRef.value.querySelector(
    `[href="#${activeLink.value}"]`
  ) as HTMLElement
  if (linkEl) {
    sliderOffset.value = linkEl.offsetTop
    sliderHeight.value = linkEl.offsetHeight
  }
}

const handleScroll = () => {
  if (scrollTimer) {
    window.clearTimeout(scrollTimer)
  }

  scrollTimer = window.setTimeout(() => {
    if (!rootRef.value) return

    const container = getContainer.value
    const scrollTop = container === window
      ? document.documentElement.scrollTop
      : (container as HTMLElement).scrollTop

    // 更新滑块位置
    const activeSection = sections.value.find((section) => {
      const top = section.top - props.offset - props.bounds
      const nextSection = sections.value[sections.value.indexOf(section) + 1]
      const bottom = nextSection ? nextSection.top - props.offset - props.bounds : Infinity
      return scrollTop >= top && scrollTop < bottom
    })

    if (activeSection && activeSection.link !== activeLink.value) {
      activeLink.value = activeSection.link
      updateSlider()
    }
  }, 100)
}

const initSections = () => {
  sections.value = links.value.map((link) => {
    const el = document.getElementById(link)
    return {
      link,
      top: el ? el.offsetTop : 0,
    }
  }).sort((a, b) => a.top - b.top)
}

const updateContainer = () => {
  if (!rootRef.value) return
  containerHeight.value = rootRef.value.offsetHeight
  updateSlider()
}

// 生命周期钩子
onMounted(() => {
  nextTick(() => {
    initSections()
    updateContainer()
    handleScroll()
    getContainer.value?.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateContainer)
  })
})

onBeforeUnmount(() => {
  if (scrollTimer) {
    window.clearTimeout(scrollTimer)
  }
  getContainer.value?.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateContainer)
})

// 监听属性变化
watch(links, () => {
  nextTick(() => {
    initSections()
    handleScroll()
  })
})

// 向子组件提供数据
provide('anchor', {
  activeLink,
  registerLink,
  unregisterLink,
})

defineExpose({
  handleScroll,
})
</script>
