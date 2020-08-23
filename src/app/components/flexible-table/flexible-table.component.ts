import { Component, OnInit, Input } from '@angular/core';
import { Data, Column } from '../../interfaces/data.interface';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { MoveColumn, SortColumn } from 'src/app/store/data.actions';

@Component({
  selector: 'flexible-table',
  templateUrl: './flexible-table.component.html',
  styleUrls: ['./flexible-table.component.scss']
})
export class FlexibleTableComponent implements OnInit {

  @Input() data: Data;

  constructor(private store: Store<Data>) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    this.store.dispatch(new MoveColumn(event.previousIndex, event.currentIndex));
  }

  sort(columnIndex: number) {
    this.store.dispatch(new SortColumn(columnIndex));
  }

}
