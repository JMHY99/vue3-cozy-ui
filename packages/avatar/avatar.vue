<template>
  <span :class="[
    `cozy-avatar cozy-avatar-${shape}`,
    src ? 'cozy-avatar-img' : '',
  ]" :style="avatarStyle">
    <img v-if="src" :src="src" />
    <span v-else>
      <slot></slot>
      <slot name="icon"></slot>
    </span>

  </span>
</template>

<script setup lang="ts">

import { computed } from 'vue';

defineOptions({
  name: 'CAvatar'
})

interface AvatarProps {
  shape?: 'circle' | 'square';
  src?: string;
  alt?: string;
  size?: number | string;
}

const props = withDefaults(defineProps<AvatarProps>(), {
  shape: 'circle',
  size: 'default',
})

const avatarSize = {
  large: 40,
  small: 24,
  default: 32
}

const avatarStyle = computed(() => {
  let size = 32;
  if (typeof props.size === 'number') {
    size = props.size
  } else if (typeof props.size === 'string') {
    size = avatarSize[props.size] || avatarSize.default
  }
  return {
    width: `${size}px`,
    height: `${size}px`,
    lineHeight: `${size}px`,
    fontSize: `${size > 24 ? size / 2 : 16}px`,
  }
})

</script>
<style lang="scss" scoped>
.cozy-avatar {
  box-sizing: border-box;
  display: inline-block;
  margin: 0;
  padding: 0;
  width: 32px;
  height: 32px;
  overflow: hidden;
  white-space: nowrap;
  line-height: 32px;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  background: #ccc;
  color: #fff;
}

.cozy-avatar-square {
  border-radius: 8px;
}

.cozy-avatar-img {
  background: #fff;
  border: 1px solid #f8f8f8;
}
</style>
