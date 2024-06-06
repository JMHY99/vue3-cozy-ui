import DefaultTheme from "vitepress/theme";
import "../../../packages/style/fonts/iconfont.css";
import CozyUI from "../../../packages";
import DemoBlock from "@ruabick/vitepress-demo-block";
import "@ruabick/vitepress-demo-block/dist/style.css";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.use(CozyUI);
    ctx.app.component("demo", DemoBlock);
  },
};
