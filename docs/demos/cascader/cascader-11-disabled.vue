<template>
  <div>
    <c-cascader
      v-model="value"
      :options="options"
      placeholder="请选择"
      style="width: 300px"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string>()

const options = [
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'dongcheng',
        label: '东城区',
        disabled: true,
        children: [
          {
            value: 'chaoyangmen',
            label: '朝阳门'
          }
        ]
      },
      {
        value: 'xicheng',
        label: '西城区',
        children: [
          {
            value: 'xidan',
            label: '西单'
          }
        ]
      }
    ]
  },
  {
    value: 'shanghai',
    label: '上海',
    disabled: true,
    children: [
      {
        value: 'huangpu',
        label: '黄浦区',
        children: [
          {
            value: 'nanjinglu',
            label: '南京路'
          }
        ]
      }
    ]
  }
]
</script> 