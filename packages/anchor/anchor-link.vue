<template>
  <div
    class="cozy-anchor-link"
    :class="{
      'cozy-anchor-link-active': active,
    }"
  >
    <a
      :href="'#' + href"
      :title="title"
      class="cozy-anchor-link-title"
      @click.prevent="handleClick"
    >
      {{ title }}
    </a>
    <div class="cozy-anchor-link-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onBeforeUnmount, computed } from 'vue'

defineOptions({
  name: 'CAnchorLink',
})

interface Props {
  /** 锚点链接 */
  href: string
  /** 文字内容 */
  title: string
}

const props = defineProps<Props>()

// 注入父组件数据
const anchor = inject('anchor', {
  activeLink: ref(''),
  registerLink: (_: string) => {},
  unregisterLink: (_: string) => {},
})

// 计算属性
const active = computed(() => anchor.activeLink.value === props.href)

// 方法
const handleClick = (e: MouseEvent) => {
  e.preventDefault()
  const element = document.getElementById(props.href)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    })
  }
}

// 生命周期钩子
onMounted(() => {
  anchor.registerLink(props.href)
})

onBeforeUnmount(() => {
  anchor.unregisterLink(props.href)
})
</script>
