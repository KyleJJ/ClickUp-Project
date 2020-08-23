export interface Data {
  columns: Column[];
}

export interface Column {
  header: string;
  stats: string[]
}
