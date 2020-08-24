export interface Data {
  columns: Column[];
  sortColumns: number[];
  search: string;
}

export interface Column {
  header: string;
  tooltip: string;
  width: number;
  stats: string[]
}
