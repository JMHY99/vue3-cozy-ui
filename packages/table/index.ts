import CTable from './table.vue';
import CTableColumn from './table-column.vue';

CTable.install = (app: any) => {
  app.component(CTable.name, CTable);
  app.component(CTableColumn.name, CTableColumn);
};

export { CTableColumn };
export default CTable;

export type { TableProps, TableColumnType, TablePaginationConfig, TableRowSelection, TableExpandable } from './interface';
