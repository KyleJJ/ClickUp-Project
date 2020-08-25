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
  
  data$: Observable<Data>;

  constructor(private store: Store<{ data: Data }>) {
    this.data$ = this.store.select('data');
  }

  ngOnInit() {
    const storedState = localStorage.getItem('state');
    if (storedState) {
      this.store.dispatch(new ShowData(JSON.parse(storedState)));
    } else {
      this.store.dispatch(new LoadData());
    }
  }
}
