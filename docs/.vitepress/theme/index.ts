import DefaultTheme from "vitepress/theme";
import "../../../packages/style/src/fonts/iconfont.css";
import CozyUI from "../../../packages";
import "../../../packages/style/src/index.scss";
import DemoBlock from "@ruabick/vitepress-demo-block";
import "@ruabick/vitepress-demo-block/dist/style.css";
import IconList from "../components/IconList.vue";
import ColorDemo from "../components/ColorDemo.vue";
import ColorDemo1 from "../components/ColorDemo1.vue";
import ColorDemo2 from "../components/ColorDemo2.vue";
import "./styles/index.scss"

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.use(CozyUI);
    ctx.app.component("demo", DemoBlock);
    ctx.app.component("IconList", IconList);
    ctx.app.component("ColorDemo", ColorDemo);
    ctx.app.component("ColorDemo1", ColorDemo1);
    ctx.app.component("ColorDemo2", ColorDemo2);
  },
};
