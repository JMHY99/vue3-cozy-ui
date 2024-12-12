<template>
  <c-affix :offset-bottom="20" @change="change">
    <c-button type="primary">底部固钉</c-button>
  </c-affix>
</template>
<script>
  export default {
    methods: {
      change(affixed) {
        console.log(affixed);
      },
    },
  };
</script>
