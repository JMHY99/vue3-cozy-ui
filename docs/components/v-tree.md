# 虚拟树 VTree

### 概述
::: tip
虚拟树组件用于展示大量树形数据时优化性能，通过只渲染可视区域内的节点来减少 DOM 节点数量。
:::

### 实现思路

虚拟树的核心实现原理如下：

1. 数据处理
   - 扁平化处理：将树形数据根据展开状态转换为一维数组
   - 节点信息扩展：为每个节点添加层级、父节点等信息
   - 动态维护：展开/收起时重新计算扁平化数据

2. 虚拟滚动实现
   - 容器结构：同虚拟列表
   - 可视区域计算：考虑节点缩进和展开状态
   - 节点定位：使用绝对定位和 transform 控制位置
   - 缓冲区处理：上下添加额外节点减少白屏

3. 树形特性实现
   - 展开/收起：维护展开节点的状态
   - 节点选择：支持单选和多选模式
   - 复选框：实现父子节点联动
   - 缩进线：根据层级计算缩进距离

4. 性能优化
   - 按需更新：仅在必要时重新计算扁平化数据
   - 高效渲染：使用 key 优化节点更新
   - 滚动优化：使用 RAF 处理滚动事件
   - 状态缓存：缓存计算结果避免重复计算

5. 交互增强
   - 键盘操作：支持方向键导航
   - 展开动画：平滑的展开/收起效果
   - 滚动定位：支持滚动到指定节点
   - 搜索高亮：支持节点内容搜索

### 基础用法

最基础的虚拟树用法。

<demo src="../demos/v-tree/v-tree-01-basic.vue"></demo>

### 可选择

通过 `checkable` 属性启用复选框功能。

<demo src="../demos/v-tree/v-tree-02-checkable.vue"></demo>

### 自定义节点内容

使用 `title` 插槽自定义节点内容。

<demo src="../demos/v-tree/v-tree-03-custom.vue"></demo>

### API

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| treeData | 树形数据 | TreeNode[] | [] |
| itemHeight | 节点高度 | number | 28 |
| height | 容器高度 | number \| string | 400 |
| bufferSize | 预加载的节点数量 | number | 20 |
| indentSize | 缩进宽度 | number | 24 |
| expandedKeys | 展开的节点keys（受控） | (string \| number)[] | [] |
| selectedKeys | 选中的节点keys（受控） | (string \| number)[] | [] |
| checkedKeys | 勾选的节点keys（受控） | (string \| number)[] | [] |
| checkable | 是否显示复选框 | boolean | false |
| defaultExpandAll | 默认展开所有节点 | boolean | false |
| multiple | 是否支持多选 | boolean | false |

#### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:expandedKeys | 展开节点改变时触发 | (keys: (string \| number)[]) => void |
| update:selectedKeys | 选中节点改变时触发 | (keys: (string \| number)[]) => void |
| update:checkedKeys | 勾选节点改变时触发 | (keys: (string \| number)[]) => void |
| expand | 展开/收起节点时触发 | (expandedKeys: (string \| number)[], node: TreeNode) => void |
| select | 选择节点时触发 | (selectedKeys: (string \| number)[], node: TreeNode) => void |
| check | 勾选节点时触发 | (checkedKeys: (string \| number)[], node: TreeNode) => void |

#### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| scrollToKey | 滚动到指定key的节点 | (key: string \| number) => void |
| expandToKey | 展开指定节点到根节点的路径 | (key: string \| number) => void |

#### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| title | 自定义节点内容 | { node: TreeNode } |

#### TreeNode 数据结构

```ts
interface TreeNode {
  key: string | number;
  title: string;
  children?: TreeNode[];
  isLeaf?: boolean;
} 