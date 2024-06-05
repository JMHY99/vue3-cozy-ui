import {
  demoblockPlugin,
  demoblockVitePlugin,
} from "vitepress-theme-demoblock";
export default {
  // 站点级选项
  lang: "cn-ZH",
  title: "Cozy UI Plus",
  description: "用于Vue 3的轻量级UI组件库",

  themeConfig: {
    // 主题级选项
    logo: "/logo.jpg",
    // 浏览器标签页图标
    head: [["link", { rel: "icon", href: "/favicon.ico" }]],

    // 导航菜单项的配置
    nav: [
      // 直接跳转，'/'为不添加路由，跳转至首页，以/结尾的最终对应的都是/index.html,也就是README.md文件编译后的页面
      { text: "首页", link: "/" },
      // 对应blog/fontend/README.md
      { text: "组件", link: "/components/install" },
      { text: "指南", link: "/components/quick-start" },
      {
        text: "Gitee",
        link: "https://gitee.com/itxiaoming9/vue2-cozy-ui.git",
        target: "_blank",
      },
    ],

    // 设置自动生成侧边栏
    sidebar: {
      "/guide/": [
        {
          title: "指南", // 侧边栏显示的名称
          items: ["", "安装", "快速上手"],
        },
      ],
      "/components/": [
        {
          text: "开发指南", // 侧边栏显示的名称
          items: [
            {
              text: "快速上手",
              link: "/components/quick-start.md",
            },
          ],
        },
        {
          text: "组件",
          collapsable: false,
          sidebarDepth: 1, // 只显示一级标题
          items: [
            {
              text: "基础",
              collapsable: false, //下拉
              sidebarDepth: 1, // 只显示一级标题
              // children: ["color", "icon", "button"],
              items: [
                { text: "Color 色彩", link: "/components/color.md" },
                {
                  text: "Icon 图标",
                  link: "/components/icon.md",
                },
                { text: "Button 按钮", link: "/components/button.md" },
              ],
            },
            // {
            //   text: "布局",
            //   collapsable: false,
            //   sidebarDepth: 1, // 只显示一级标题
            //   children: ["flex", "grid", "layout", "space"],
            // },
            // {
            //   title: "导航",
            //   collapsable: false,
            //   sidebarDepth: 1, // 只显示一级标题
            //   children: ["affix", "anchor", "breadcrumb", "dropdown"],
            // },
            // {
            //   title: "表单",
            //   collapsable: false,
            //   sidebarDepth: 1, // 只显示一级标题
            //   children: ["form", "input", "input-number", "radio", "switch"],
            // },
            // {
            //   title: "视图",
            //   collapsable: false,
            //   sidebarDepth: 1, // 只显示一级标题
            //   children: ["alert", "message", "avatar"],
            // },
          ],
        },
      ],
    },
  },

  markdown: {
    config: (md) => {
      md.use(demoblockPlugin);
    },
  },
  vite: {
    plugins: [demoblockVitePlugin()],
  },
};
