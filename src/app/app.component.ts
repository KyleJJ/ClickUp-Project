import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Data, Column } from './interfaces/data.interface';
import { LoadData, ShowData } from './store/data.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // data: Data = { 
  //   columns: [],
  //   sortColumns: [],
  //   search: ''
  // };
  data$: Observable<Data>;

  constructor(private store: Store<{ data: Data }>) {
    // this.store.pipe(select('data')).subscribe(data => {
    //   console.log('this.data = ', data);
    //   this.data = data;
    // });
    // this.data$ = this.store.pipe(select('data'));
    this.data$ = this.store.select('data');
  }

  ngOnInit() {
    const storedState = localStorage.getItem('state');
    if (storedState) {
      console.log('show data', JSON.parse(storedState));
      this.store.dispatch(new ShowData(JSON.parse(storedState)));
    } else {
      console.log('load data');
      this.store.dispatch(new LoadData());
    }
  }
}
