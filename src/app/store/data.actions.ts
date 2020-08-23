import { Action } from '@ngrx/store';
import { Data, Column } from '../interfaces/data.interface';

export enum ActionTypes {
  LoadData = '[Columns] Load data',
  ShowData = '[Columns] Load success',
  MoveColumn = '[Columns] Move column',
  SortColumn = '[Columns] Sort column'
}

export class LoadData implements Action {
  readonly type = ActionTypes.LoadData;
}

export class ShowData implements Action {
  readonly type = ActionTypes.ShowData;

  constructor(public payload: Column[]) {}
}

export class MoveColumn implements Action {
  readonly type = ActionTypes.MoveColumn;

  constructor(public oldIndex: number, public newIndex: number) {}
}

export class SortColumn implements Action {
  readonly type = ActionTypes.SortColumn;

  constructor(public columnIndex: number) {}
}



export type ActionsUnion = LoadData | ShowData | MoveColumn | SortColumn;