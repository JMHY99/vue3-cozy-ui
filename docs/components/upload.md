# Upload 上传

用于文件上传的组件。

## 基础用法

最基础的上传组件用法。

<demo src="../demos/upload/upload-01-base.vue"></demo>

## 自定义上传按钮

可以自定义上传按钮的样式。

<demo src="../demos/upload/upload-02-custom.vue"></demo>

## 文件大小限制

通过 maxSize 限制上传文件的大小。

<demo src="../demos/upload/upload-03-limit.vue"></demo>

## 头像上传

用于上传用户头像，只允许上传图片文件。

<demo src="../demos/upload/upload-04-avatar.vue"></demo>

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| action | 上传的地址 | string | - |
| accept | 接受上传的文件类型 | string | - |
| multiple | 是否支持多选文件 | boolean | false |
| maxSize | 文件大小限制，单位MB | number | - |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 文件列表发生变化时触发 | (fileList: UploadFile[]) => void |
| success | 文件上传成功时触发 | (file: UploadFile) => void |
| error | 文件上传失败时触发 | (error: Error) => void |
| remove | 文件被移除时触发 | (file: UploadFile) => void |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义上传按钮 |

### UploadFile 类型 