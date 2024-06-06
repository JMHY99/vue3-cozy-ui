<template>
  <div class="icon-list">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="copy(item.font_class)"
      >
        <c-icon size="36" :name="'c-' + item.font_class"></c-icon>
        <span class="icon-name">{{ "c-" + item.font_class }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import iconJson from "../../../packages/style/src/fonts/iconfont.json";
import "../../../packages/style/src/fonts/iconfont.css";
export default {
  name: "IconList",
  data() {
    return {
      list: [],
    };
  },

  mounted() {
    this.list = iconJson.glyphs;
  },

  methods: {
    copy(icon) {
      let copyText = `<c-icon size="36" name="${"c-" + icon}"></c-icon>`;
      this.copyToClipboard(copyText);
    },

    // 复制
    copyToClipboard(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.$message.success("复制成功");
        })
        .catch((error) => {
          this.$message.error("复制失败");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-list {
  padding: 20px 0;
}
.icon-list ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.icon-list ul li {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 136px;
  height: 136px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  &:hover {
    background: #1890ff;
    color: #ffffff;
    border-radius: 5px;
  }
  span {
    text-align: center;
    flex: 1;
  }
  .icon-name {
    word-wrap: break-all;
  }
}
</style>
