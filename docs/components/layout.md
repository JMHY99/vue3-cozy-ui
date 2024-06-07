# Layout 布局

### 概述

使用 html 语义化标签，`section`、`header`、`main`、`aside`、`footer`

- `c-layout`：布局容器，其下可嵌套`c-header`、`c-sider`、`c-content`、`c-footer`或`c-layout` 本身，可以放在任何父容器中。
- `c-header`：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `c-layout` 中。
- `c-sider`：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `c-layout` 中。
- `c-content`：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 `c-layout` 中。
- `c-footer`：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 `c-layout` 中。

### 基础用法

典型的页面布局。

<demo src="../demos/layout/layout-01-base.vue"></demo>

### API

#### c-layout 插槽

| 插槽名  |      说明      |                           子标签                           |
| :-----: | :------------: | :--------------------------------------------------------: |
| default | 自定义默认内容 | `c-header`、`c-sider`、`c-content`、`c-footer`或`c-layout` |

#### c-header 插槽

| 插槽名  |      说明      | 子标签 |
| :-----: | :------------: | :----: |
| default | 自定义默认内容 |  任意  |

#### c-content 插槽

| 插槽名  |      说明      | 子标签 |
| :-----: | :------------: | :----: |
| default | 自定义默认内容 |  任意  |

#### c-sider 插槽

| 插槽名  |      说明      | 子标签 |
| :-----: | :------------: | :----: |
| default | 自定义默认内容 |  任意  |

#### c-footer 插槽

| 插槽名  |      说明      | 子标签 |
| :-----: | :------------: | :----: |
| default | 自定义默认内容 |  任意  |
