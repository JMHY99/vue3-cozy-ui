<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide } from 'vue'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'CRow',
  props: {
    align: {
      type: String,
      default: 'top',
      validator: (val: string) => ['top', 'middle', 'bottom'].includes(val)
    },
    justify: {
      type: String,
      default: 'start',
      validator: (val: string) => ['start', 'end', 'center', 'space-around', 'space-between'].includes(val)
    },
    gutter: {
      type: [Number, Array],
      default: 0
    },
    wrap: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const getGutter = computed(() => {
      const results: [number, number] = [0, 0]
      const gutter = props.gutter || 0

      if (Array.isArray(gutter)) {
        results[0] = gutter[0] || 0
        results[1] = gutter[1] || 0
      } else {
        results[0] = gutter
      }

      return results
    })

    const classes = computed(() => [
      'cozy-row',
      {
        [`cozy-row-${props.justify}`]: props.justify,
        [`cozy-row-${props.align}`]: props.align,
        'cozy-row-no-wrap': !props.wrap
      }
    ])

    const styles = computed(() => {
      const gutters = getGutter.value
      const styles: CSSProperties = {}

      if (gutters[0] > 0) {
        styles.marginLeft = `${gutters[0] / -2}px`
        styles.marginRight = `${gutters[0] / -2}px`
      }
      if (gutters[1] > 0) {
        styles.marginTop = `${gutters[1] / -2}px`
        styles.marginBottom = `${gutters[1] / -2}px`
      }

      return styles
    })

    // 提供 gutter 值给 Col 组件
    provide('rowContext', {
      getGutter
    })

    return {
      classes,
      styles,
      getGutter
    }
  }
})
</script>
