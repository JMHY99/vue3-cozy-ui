<template>
  <div class="cozy-anchor-link">
    <!-- 链接标题 -->
    <a
      :class="{
        'cozy-anchor-link-title': true,
        'cozy-anchor-link-title-active': active
      }"
      :href="href"
      :title="title"
      @click="handleClick"
    >
      {{ title }}
    </a>
    <!-- 子链接 -->
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onBeforeUnmount } from 'vue'

defineOptions({
  name: 'CAnchorLink'
})

// 定义组件属性
interface Props {
  /** 锚点链接 */
  href: string
  /** 文字内容 */
  title: string
}

const props = defineProps<Props>()

// 注入父组件提供的上下文
const {
  registerLink,
  unregisterLink,
  handleLinkClick,
  activeLink
} = inject('anchorContext', {
  registerLink: (link: string) => {},
  unregisterLink: (link: string) => {},
  handleLinkClick: (e: MouseEvent, link: string) => {},
  activeLink: computed(() => '')
})

// 计算当前链接是否激活
const active = computed(() => {
  const href = props.href.startsWith('#') ? props.href.slice(1) : props.href
  return href === activeLink.value
})

// 处理点击事件
const handleClick = (e: MouseEvent) => {
  handleLinkClick(e, props.href)
}

// 组件挂载时注册链接
onMounted(() => {
  const href = props.href.startsWith('#') ? props.href.slice(1) : props.href
  registerLink(href)
})

// 组件卸载时注销链接
onBeforeUnmount(() => {
  const href = props.href.startsWith('#') ? props.href.slice(1) : props.href
  unregisterLink(href)
})
</script>
