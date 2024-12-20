/** 表格列的配置接口 */
export interface TableColumnType {
  /** 列标题 */
  title: string;
  /** 列数据在数据项中对应的路径 */
  dataIndex?: string;
  /** 列的键值 */
  key?: string;
  /** 列宽度 */
  width?: number | string;
  /** 设置列的对齐方式 */
  align?: 'left' | 'right' | 'center';
  /** 是否固定列 */
  fixed?: 'left' | 'right';
  /** 表头的自定义渲染 */
  slots?: {
    title?: string;
    customRender?: string;
  };
  /** 排序函数 */
  sorter?: boolean | ((a: any, b: any) => number);
  /** 筛选菜单项 */
  filters?: {
    text: string;
    value: string | number | boolean;
  }[];
  /** 子列 */
  children?: TableColumnType[];
  /** 列的样式类名 */
  className?: string;
  /** 列的样式对象 */
  style?: Record<string, string | number>;
  /** 自定义渲染函数 */
  customRender?: (text: any, record: any, index: number) => any;
  /** 列的排序方式 */
  sortOrder?: 'ascend' | 'descend' | null;
  /** 列的筛选值 */
  filteredValue?: any[];
  /** 列的筛选方法 */
  onFilter?: (value: any, record: any) => boolean;
  /** 列的排序方法 */
  sortDirections?: ('ascend' | 'descend')[];
  /** 列的默认筛选值 */
  defaultFilteredValue?: any[];
  /** 列的默认排序顺序 */
  defaultSortOrder?: 'ascend' | 'descend' | null;
  /** 列的提示信息 */
  tooltip?: string;
  /** 列的跨列数 */
  colSpan?: number;
  /** 列的跨行数 */
  rowSpan?: number;
}

/** 表格行选择配置 */
export interface TableRowSelection {
  /** 选中项的 key 数组 */
  selectedRowKeys?: (string | number)[];
  /** 选中项发生变化时的回调 */
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: any[]) => void;
  /** 用户手动选择/取消选择所有行的回调 */
  onSelectAll?: (selected: boolean, selectedRows: any[], changeRows: any[]) => void;
  /** 用户手动选择/取消选择某行的回调 */
  onSelect?: (record: any, selected: boolean, selectedRows: any[], nativeEvent: Event) => void;
  /** 自定义选择项的渲染 */
  selections?: boolean | any[];
  /** 多选/单选 */
  type?: 'checkbox' | 'radio';
  /** 是否保留已选择的选项 */
  preserveSelectedRowKeys?: boolean;
  /** 选择框的列固定 */
  fixed?: boolean;
  /** 选择框的列宽 */
  columnWidth?: number | string;
  /** 选择框的列标题 */
  columnTitle?: string;
}

/** 表格属性接口 */
export interface TableProps {
  /** 表格列的配置描述 */
  columns?: TableColumnType[];
  /** 数据数组 */
  data?: any[];
  /** 表格行 key 的取值 */
  rowKey?: string | ((record: any) => string);
  /** 表格大小 */
  size?: 'large' | 'middle' | 'small';
  /** 是否展示外边框和列边框 */
  bordered?: boolean;
  /** 表格标题 */
  title?: string;
  /** 表格尾部 */
  footer?: string;
  /** 页面是否加载中 */
  loading?: boolean;
  /** 分页器配置 */
  pagination?: false | TablePaginationConfig;
  /** 是否固定表头 */
  scroll?: { x?: number | string | true; y?: number | string };
  /** 表格行的类名 */
  rowClassName?: string | ((record: any, index: number) => string);
  /** 表格行的样式 */
  rowStyle?: Record<string, string | number> | ((record: any, index: number) => Record<string, string | number>);
  /** 表格单元格的类名 */
  cellClassName?: string | ((record: any, index: number) => string);
  /** 表格单元格的样式 */
  cellStyle?: Record<string, string | number> | ((record: any, index: number) => Record<string, string | number>);
  /** 表格的方向 */
  direction?: 'ltr' | 'rtl';
  /** 行选择配置 */
  rowSelection?: TableRowSelection;
  /** 展开行配置 */
  expandable?: TableExpandable;
}

/** 分页器配置接口 */
export interface TablePaginationConfig {
  /** 当前页数 */
  current?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 数据总数 */
  total?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示较少页面内容 */
  simple?: boolean;
  /** 是否显示快速跳转 */
  showQuickJumper?: boolean;
  /** 是否显示数据总量 */
  showTotal?: (total: number, range: [number, number]) => string;
  /** 是否显示页码 */
  showSizeChanger?: boolean;
  /** 指定每页可以显示多少条 */
  pageSizeOptions?: string[];
  /** 当为 small 时，是否显示较少页面内容 */
  size?: 'default' | 'small';
  /** 用于自定义页码的结构 */
  itemRender?: (page: number, type: 'page' | 'prev' | 'next', originalElement: any) => any;
  /** 当添加该属性时，显示为简单分页 */
  hideOnSinglePage?: boolean;
}

/** 排序结果接口 */
export interface SorterResult {
  /** 排序的列 */
  column?: TableColumnType;
  /** 排序的顺序 */
  order?: 'ascend' | 'descend' | null;
  /** 排序的字段 */
  field?: string | string[];
  /** 排序的列的键值 */
  columnKey?: string;
}

/** 展开行配置接口 */
export interface TableExpandable {
  /** 展开的行的 key 数组 */
  expandedRowKeys?: (string | number)[];
  /** 展开的行变化时触发 */
  onExpandedRowsChange?: (expandedRows: any[]) => void;
  /** 点击展开图标时触发 */
  onExpand?: (expanded: boolean, record: any) => void;
  /** 展开行的内容渲染函数 */
  expandedRowRender?: (record: any, index: number, indent: number, expanded: boolean) => any;
  /** 是否允许点击行展开 */
  expandRowByClick?: boolean;
  /** 展开图标的列固定 */
  fixed?: boolean;
  /** 展开图标的列宽 */
  columnWidth?: number | string;
  /** 展开图标的列标题 */
  columnTitle?: string;
}
