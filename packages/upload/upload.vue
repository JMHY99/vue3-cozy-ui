<template>
  <div class="cozy-upload" :class="[`cozy-upload-${listType}`]">
    <!-- 上传触发区域 -->
    <div
      v-if="!disabled"
      class="cozy-upload-select"
      @click="handleClick"
      @drop.prevent="handleDrop"
      @dragover.prevent="handleDragover"
      @dragleave.prevent="handleDragleave"
      :class="{
        'is-dragover': isDragover,
        'cozy-upload-select-picture-card': listType === 'picture-card',
      }"
    >
      <slot>
        <div class="cozy-upload-trigger">
          <span class="cozy-upload-icon">
            <i class="cozy-icon-plus"></i>
          </span>
          <div class="cozy-upload-text">{{ dragText }}</div>
        </div>
      </slot>
    </div>

    <!-- 文件列表 -->
    <div class="cozy-upload-list" v-if="showUploadList && fileList.length">
      <div
        v-for="file in fileList"
        :key="file.uid"
        class="cozy-upload-list-item"
        :class="[
          `cozy-upload-list-item-${file.status}`,
          { 'is-picture': listType.startsWith('picture') },
        ]"
      >
        <!-- 图片预览 -->
        <div
          v-if="listType.startsWith('picture')"
          class="cozy-upload-list-item-thumbnail"
        >
          <img
            v-if="file.url && isImageUrl(file)"
            :src="file.url"
            :alt="file.name"
          />
          <i v-else class="cozy-icon-file" />
        </div>

        <!-- 文件信息 -->
        <div class="cozy-upload-list-item-info">
          <span class="cozy-upload-list-item-name" :title="file.name">
            <i v-if="listType === 'text'" class="cozy-icon-file" />
            {{ file.name }}
          </span>
          <span class="cozy-upload-list-item-size">{{
            formatSize(file.size)
          }}</span>
        </div>

        <!-- 操作按钮 -->
        <div class="cozy-upload-list-item-actions">
          <template v-if="file.status === 'uploading'">
            <span class="cozy-upload-list-item-status">
              <i class="cozy-icon-loading" />
            </span>
          </template>
          <template v-else>
            <span
              v-if="listType.startsWith('picture')"
              class="cozy-upload-list-item-preview"
              @click="handlePreview(file)"
            >
              <i class="cozy-icon-eye" />
            </span>
            <span
              class="cozy-upload-list-item-remove"
              @click="handleRemove(file)"
            >
              <i class="cozy-icon-delete" />
            </span>
          </template>
        </div>
      </div>
    </div>

    <input
      ref="inputRef"
      class="cozy-upload-input"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, PropType } from "vue";

// 定义组件名称
defineOptions({
  name: "CUpload",
});

interface UploadFile {
  uid: string;
  name: string;
  status: "uploading" | "done" | "error";
  url?: string;
  response?: any;
  size?: number;
  raw?: File;
  type?: string;
}

const props = defineProps({
  // 上传地址
  action: {
    type: String,
    required: true,
  },
  // 接受上传的文件类型
  accept: {
    type: String,
    default: "",
  },
  // 是否支持多选文件
  multiple: {
    type: Boolean,
    default: false,
  },
  // 文件大小限制，单位MB
  maxSize: {
    type: Number,
    default: 0,
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 列表类型：text, picture, picture-card
  listType: {
    type: String,
    default: "text",
  },
  // 是否显示文件列表
  showUploadList: {
    type: Boolean,
    default: true,
  },
  // 默认文件列表
  defaultFileList: {
    type: Array as PropType<UploadFile[]>,
    default: () => [],
  },
  // 自定义请求
  customRequest: {
    type: Function,
    default: null,
  },
  // 上传文件之前的钩子
  beforeUpload: {
    type: Function as PropType<
      (file: File, fileList: File[]) => boolean | Promise<File>
    >,
    default: null,
  },
  // 限制文件数量
  maxCount: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["change", "success", "error", "remove", "preview"]);

const inputRef = ref<HTMLInputElement>();
const fileList = ref<UploadFile[]>([]);
const isDragover = ref(false);

const dragText = computed(() => {
  return isDragover.value ? "松开文件即可上传" : "点击或拖拽文件到此处上传";
});

// 处理拖拽相关事件
const handleDragover = () => {
  isDragover.value = true;
};

const handleDragleave = () => {
  isDragover.value = false;
};

const handleDrop = (e: DragEvent) => {
  isDragover.value = false;
  const files = Array.from(e.dataTransfer?.files || []);
  if (files.length) {
    handleUpload(files);
  }
};

const handleClick = () => {
  inputRef.value?.click();
};

const handleChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files?.length) return;
  handleUpload(Array.from(files));
  (event.target as HTMLInputElement).value = "";
};

const handleUpload = (files: File[]) => {
  files.forEach((file) => {
    if (!validateFile(file)) return;

    const uploadFile: UploadFile = {
      uid: generateUid(),
      name: file.name,
      status: "uploading",
      size: file.size,
      type: file.type,
      raw: file,
    };

    fileList.value.push(uploadFile);
    upload(uploadFile);
  });
};

const validateFile = (file: File) => {
  // 检查文件大小
  if (props.maxSize && file.size > props.maxSize * 1024 * 1024) {
    emit("error", new Error(`文件大小不能超过 ${props.maxSize}MB`));
    return false;
  }
  return true;
};

const upload = async (uploadFile: UploadFile) => {
  if (props.beforeUpload) {
    try {
      const result = await props.beforeUpload(
        uploadFile.raw as File,
        fileList.value.map((f) => f.raw as File)
      );
      if (result === false) {
        fileList.value = fileList.value.filter((f) => f.uid !== uploadFile.uid);
        return;
      }
    } catch (err) {
      console.error(err);
      fileList.value = fileList.value.filter((f) => f.uid !== uploadFile.uid);
      return;
    }
  }

  const formData = new FormData();
  formData.append("file", uploadFile.raw as File);

  try {
    const response = await fetch(props.action, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      uploadFile.status = "done";
      uploadFile.response = result;
      uploadFile.url = result.url; // 假设服务器返回的数据中包含 url 字段
      emit("success", uploadFile);
    } else {
      uploadFile.status = "error";
      emit("error", new Error("上传失败"));
    }
  } catch (err) {
    uploadFile.status = "error";
    emit("error", err);
  }

  emit("change", fileList.value);
};

const handleRemove = (file: UploadFile) => {
  fileList.value = fileList.value.filter((f) => f.uid !== file.uid);
  emit("remove", file);
};

const handlePreview = (file: UploadFile) => {
  emit("preview", file);
};

// 生成唯一文件ID
const generateUid = () => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

// 判断是否为图片
const isImageUrl = (file: UploadFile) => {
  if (file.type?.startsWith("image/")) return true;
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext || "");
};

// 格式化文件大小
const formatSize = (size?: number) => {
  if (!size) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
};
</script>
