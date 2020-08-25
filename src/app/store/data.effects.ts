import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { ActionTypes } from './data.actions';
import { DataService } from '../services/data.service';

@Injectable()
export class DataEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) {}
  
  @Effect()
  loadData$ = this.actions$.pipe(
    ofType(ActionTypes.LoadData),
    mergeMap(() =>
      this.dataService.getData().pipe(
        map(data => {
          console.log('loaded data', data);
          return { 
            type: ActionTypes.ShowData, 
            payload: { 
              columns: data,
              sortColumns: []
            }
          };
        }),
        catchError(() => EMPTY)
      )
    )
  );
}