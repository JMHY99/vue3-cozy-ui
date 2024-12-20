<template>
  <c-list
    :data-source="data"
    :loading="loading"
    :pagination="pagination"
    @change="handleChange"
  >
    <template #item="{ item }">
      <c-list-item>
        <template #meta>
          <template #title>
            <a href="javascript:;">{{ item.name.last }}</a>
          </template>
          <template #description>{{ item.email }}</template>
        </template>
        <template #actions>
          <a href="javascript:;">编辑</a>
          <a href="javascript:;">更多</a>
        </template>
      </c-list-item>
    </template>
  </c-list>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const data = ref([])
const pagination = ref({
  onChange: (page) => {
    fetchData(page)
  },
  pageSize: 3,
})

const fetchData = (page = 1) => {
  loading.value = true
  fetch(`https://randomuser.me/api/?results=3&page=${page}`)
    .then(res => res.json())
    .then(res => {
      data.value = res.results
      loading.value = false
    })
}

fetchData(1)

const handleChange = (page) => {
  fetchData(page)
}
</script> 