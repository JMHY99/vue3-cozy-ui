<template>
  <div>
    <c-cascader
      v-model="value"
      :options="options"
      placeholder="请选择"
      show-search
      style="width: 300px"
      @search="onSearch"
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
        children: [
          {
            value: 'chaoyangmen',
            label: '朝阳门'
          },
          {
            value: 'dongdan',
            label: '东单'
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
          },
          {
            value: 'xuanwumen',
            label: '宣武门'
          }
        ]
      }
    ]
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'huangpu',
        label: '黄浦区',
        children: [
          {
            value: 'nanjinglu',
            label: '南京路'
          },
          {
            value: 'waitan',
            label: '外滩'
          }
        ]
      },
      {
        value: 'pudong',
        label: '浦东新区',
        children: [
          {
            value: 'lujiazui',
            label: '陆家嘴'
          },
          {
            value: 'zhangjiang',
            label: '张江'
          }
        ]
      }
    ]
  }
]

const onSearch = (value: string) => {
  console.log('搜索关键词：', value)
}
</script> 