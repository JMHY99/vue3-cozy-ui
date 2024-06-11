import { createApp, h, Teleport } from "vue";
import { onMounted, onUnmounted, ref } from "vue";
import MessageComponent from "./message.vue";

let messageContainer: HTMLElement | null = null;
let messageIndex = 0;

const createMessage = (
  content: any,
  options: { type: string; duration?: number }
) => {
  const id = `message_${messageIndex++}`;
  const vnode = h(
    MessageComponent,
    {
      key: id,
      type: options.type,
      duration: options.duration,
    },
    content
  );

  const app = createApp({
    setup() {
      const visible = ref(true);

      const handleClose = () => {
        visible.value = false;
        setTimeout(() => {
          app.unmount(); // 卸载应用，清理资源
        }, 500);
      };

      onMounted(() => {
        setTimeout(handleClose, options.duration);
      });

      return {
        visible,
      };
    },
    render() {
      return h(Teleport, { to: messageContainer ? messageContainer : "body" }, [
        vnode,
      ]);
    },
  });

  app.mount(document.createElement("div"));
};

const Message = {
  success(content: any, duration?: number) {
    createMessage(content, { type: "success", duration });
  },
  error(content: any, duration?: number) {
    createMessage(content, { type: "error", duration });
  },
  warning(content: any, duration?: number) {
    createMessage(content, { type: "warning", duration });
  },
  info(content: any, duration?: number) {
    createMessage(content, { type: "info", duration });
  },
};

export default Message;
