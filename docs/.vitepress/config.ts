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
              items: [
                { text: "Color 色彩", link: "/components/color.md" },
                { text: "Icon 图标", link: "/components/icon.md" },
                { text: "Button 按钮", link: "/components/button.md" },
              ],
            },
            {
              text: "布局",
              items: [
                { text: "Flex 布局", link: "/components/flex.md" },
                { text: "Grid 布局", link: "/components/grid.md" },
                { text: "Layout 布局", link: "/components/layout.md" },
                { text: "Space 间隙", link: "/components/space.md" },
                { text: "Divider 分割线", link: "/components/divider.md" },
              ],
            },
            {
              text: "导航",
              items: [
                { text: "Affix 固钉", link: "/components/affix.md" },
                { text: "Anchor 锚点", link: "/components/anchor.md" },
                {
                  text: "Breadcrumb 面包屑",
                  link: "/components/breadcrumb.md",
                },
                { text: "Dropdown 下拉菜单", link: "/components/dropdown.md" },
                { text: "Menu 导航菜单", link: "/components/menu.md" },
                { text: "PageHeader 页头", link: "/components/page-header.md" },
                { text: "Pagination 分页", link: "/components/pagination.md" },
                { text: "Steps 步骤条", link: "/components/steps.md" },
              ],
            },
            {
              text: "表单",
              items: [
                { text: "Form 表单", link: "/components/form.md" },
                { text: "Input 输入框", link: "/components/input.md" },
                {
                  text: "InputNumber 数字输入框",
                  link: "/components/input-number.md",
                },
                { text: "Radio 单选框", link: "/components/radio.md" },
                { text: "Switch 开关", link: "/components/switch.md" },
                { text: "Checkbox 多选框", link: "/components/checkbox.md" },
                { text: "Select 选择器", link: "/components/select.md" },
                { text: "Rate 评分", link: "/components/rate.md" },
                { text: "Slider 滑动输入条", link: "/components/slider.md" },
                { text: "Upload 上传", link: "/components/upload.md" },
                {
                  text: "DatePicker 日期选择器",
                  link: "/components/date-picker.md",
                },
                {
                  text: "TimePicker 时间选择器",
                  link: "/components/time-picker.md",
                },
              ],
            },
            {
              text: "视图",
              items: [
                { text: "Alert 警告提示", link: "/components/alert.md" },
                { text: "Badge 徽标数", link: "/components/badge.md" },
                { text: "Message 全局提示", link: "/components/message.md" },
                { text: "Avatar 头像", link: "/components/avatar.md" },
                { text: "Calendar 日历", link: "/components/calendar.md" },
                { text: "Card 卡片", link: "/components/card.md" },
                { text: "Carousel 走马灯", link: "/components/carousel.md" },
                { text: "Collapse 折叠面板", link: "/components/collapse.md" },
                { text: "Comment 评论", link: "/components/comment.md" },
                {
                  text: "Descriptions 描述列表",
                  link: "/components/descriptions.md",
                },
                { text: "Empty 空状态", link: "/components/empty.md" },
                { text: "Image 图片", link: "/components/image.md" },
                { text: "List 列表", link: "/components/list.md" },
                { text: "Skeleton 骨架屏", link: "/components/skeleton.md" },
                { text: "Table 表格", link: "/components/table.md" },
                { text: "Tabs 标签页", link: "/components/tabs.md" },
                { text: "Tag 标签", link: "/components/tag.md" },
                { text: "Timeline 时间轴", link: "/components/timeline.md" },
                { text: "Transfer 穿梭框", link: "/components/transfer.md" },
                { text: "Tree 树", link: "/components/tree.md" },
                { text: "Tooltip 文字提示", link: "/components/tooltip.md" },
                { text: "Popover 气泡卡片", link: "/components/popover.md" },
              ],
            },
            {
              text: "虚拟",
              items: [
                {
                  text: "VirtualList 虚拟列表",
                  link: "/components/virtual-list.md",
                },
                {
                  text: "VirtualScroll 虚拟滚动",
                  link: "/components/virtual-scroll.md",
                },
                {
                  text: "VirtualTree 虚拟树",
                  link: "/components/virtual-tree.md",
                },
                {
                  text: "VirtualGrid 虚拟网格",
                  link: "/components/virtual-grid.md",
                },
                {
                  text: "VirtualTable 虚拟表格",
                  link: "/components/virtual-table.md",
                },
                {
                  text: "VirtualSelect 虚拟选择",
                  link: "/components/virtual-select.md",
                },
              ],
            },
            {
              text: "其他",
              items: [
                { text: "Watermark 水印", link: "/components/watermark.md" },
                { text: "Spin 加载中", link: "/components/spin.md" },
              ],
            },
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
