export interface Data {
  columns: Column[];
  sortColumns: number[];
  pageIndex: number;
}

export interface Column {
  header: string;
  tooltip: string;
  width: number;
  stats: string[]
}
