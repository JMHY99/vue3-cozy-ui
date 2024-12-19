<template>
  <c-comment
    author="Han Solo"
    avatar="https://foruda.gitee.com/avatar/1713970336200040602/9810895_itxiaoming9_1713970336.png"
    content="We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
    datetime="a minute ago"
  >
    <template #actions>
      <span @click="like">
        <c-icon name="like" :style="{ color: likes > 0 ? '#1890ff' : '' }" />
        <span style="padding-left: 8px; cursor: 'auto'">{{ likes }}</span>
      </span>
      <span @click="dislike">
        <c-icon name="dislike" :style="{ color: dislikes > 0 ? '#1890ff' : '' }" />
        <span style="padding-left: 8px; cursor: 'auto'">{{ dislikes }}</span>
      </span>
      <span>Reply to</span>
    </template>
  </c-comment>
</template>

<script lang="ts" setup>
/**
 * @title 配置操作
 * @description 可以在评论下方配置操作项，比如点赞、回复等。
 */
import { ref } from 'vue'

const likes = ref(0)
const dislikes = ref(0)

const like = () => {
  likes.value = 1
  dislikes.value = 0
}

const dislike = () => {
  likes.value = 0
  dislikes.value = 1
}
</script> 