import DefaultTheme from "vitepress/theme";
import "vitepress-theme-demoblock/dist/theme/styles/index.css";
// import { useComponents } from "./useComponents";
import "../../../packages/style/fonts/iconfont.css";
import CozyUI from "../../../packages";
// 插件的组件，主要是demo组件
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    // useComponents(ctx.app);
    ctx.app.component('Demo', Demo)
    ctx.app.component('DemoBlock', DemoBlock)

    ctx.app.use(CozyUI);
  },
};
