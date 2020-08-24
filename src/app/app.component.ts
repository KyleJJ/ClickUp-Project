import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Data, Column } from './interfaces/data.interface';
import { LoadData, ShowData } from './store/data.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  data: Data = { 
    columns: [],
    sortColumns: [],
    search: ''
  };

  constructor(private store: Store<{ data: Data }>) {
    this.store.pipe(select('data')).subscribe(data => {
      console.log('this.data = ', data);
      this.data = data;
    });
  }

  ngOnInit() {
    let storedState = localStorage.getItem('state');
    if (storedState) {
      this.store.dispatch(new ShowData(JSON.parse(storedState)));
    } else {
      this.store.dispatch(new LoadData());
    }
  }
}
