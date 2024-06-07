import { applyPlugins } from "@ruabick/md-demo-plugins";
export default {
  base: "/vue3-cozy-ui/",
  // 站点级选项
  lang: "cn-ZH",
  title: "Cozy UI Plus",
  description: "用于Vue 3的轻量级UI组件库",

  themeConfig: {
    // 主题级选项
    logo: "/logo.jpg",
    // 浏览器标签页图标
    head: [["link", { rel: "icon", href: "/favicon.ico" }]],
    outlineTitle: "页面目录",
    outline: 3,

    // 导航菜单项的配置
    nav: [
      // 直接跳转，'/'为不添加路由，跳转至首页，以/结尾的最终对应的都是/index.html,也就是README.md文件编译后的页面
      { text: "首页", link: "/" },
      // 对应blog/fontend/README.md
      { text: "组件", link: "/components/color" },
      { text: "指南", link: "/components/quick-start" },
    ],
    // 社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/JMHY99/vue3-cozy-ui" },
      {
        icon: {
          svg: '<svg t="1717739562853" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4252" width="128" height="128"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="4253"></path></svg>',
        },
        link: "https://gitee.com/maoxiaojiu9/vue3-cozy-ui",
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

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    // 页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2018-present ZhuJiuming",
    },
  },

  markdown: {
    config: (md) => {
      applyPlugins(md);
    },
  },
};
