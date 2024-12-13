<template>
  <c-layout>
    <c-header :style="headerStyle">头部</c-header>
    <c-content :style="contentStyle">内容</c-content>
    <c-footer :style="footerStyle">脚部</c-footer>
  </c-layout>

  <c-layout>
    <c-header :style="headerStyle">头部</c-header>
    <c-layout>
      <c-sider :style="siderStyle">侧边</c-sider>
      <c-content :style="contentStyle">内容</c-content>
    </c-layout>
    <c-footer :style="footerStyle">脚部</c-footer>
  </c-layout>

  <c-layout>
    <c-header :style="headerStyle">头部</c-header>
    <c-layout>
      <c-content :style="contentStyle">内容</c-content>
      <c-sider :style="siderStyle">侧边</c-sider>
    </c-layout>
    <c-footer :style="footerStyle">脚部</c-footer>
  </c-layout>

  <c-layout>
    <c-sider :style="siderStyle">侧边</c-sider>
    <c-layout>
      <c-header :style="headerStyle">头部</c-header>
      <c-content :style="contentStyle">内容</c-content>
      <c-footer :style="footerStyle">脚部</c-footer>
    </c-layout>
  </c-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const headerStyle = ref({
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#92caff",
});

const contentStyle = ref({
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#5bb0ff",
});

const siderStyle = ref({
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#7cc0ff",
});

const footerStyle = ref({
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#92caff",
});
</script>
