<template>
  <c-space direction="vertical">
    <c-space wrap align="center" :size="20">
      <c-avatar :size="64">
        <template #icon>
          <c-icon name="c-user-outlined"></c-icon>
        </template>
      </c-avatar>
      <c-avatar size="large">
        <template #icon>
          <c-icon name="c-user-outlined"></c-icon>
        </template>
      </c-avatar>
      <c-avatar>
        <template #icon>
          <c-icon name="c-user-outlined"></c-icon>
        </template>
      </c-avatar>
      <c-avatar size="small">
        <template #icon>
          <c-icon name="c-user-outlined"></c-icon>
        </template>
      </c-avatar>
    </c-space>
    <c-space wrap align="center" :size="20">
      <c-avatar shape="square" :size="64">
        <template #icon>
          <c-icon name="c-user-outlined"></c-icon>
        </template>
      </c-avatar>
      <c-avatar shape="square" size="large">
        <template #icon>
          <c-icon name="c-user-outlined"></c-icon>
        </template>
      </c-avatar>
      <c-avatar shape="square">
        <template #icon>
          <c-icon name="c-user-outlined"></c-icon>
        </template>
      </c-avatar>
      <c-avatar shape="square" size="small">
        <template #icon>
          <c-icon name="c-user-outlined"></c-icon>
        </template>
      </c-avatar>
    </c-space>
  </c-space>
</template>
