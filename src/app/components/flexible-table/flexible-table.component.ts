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

  // Update state when user reorders column
  dropColumn(event: CdkDragDrop<string[]>) {
    this.store.dispatch(new MoveColumn(event.previousIndex, event.currentIndex));
  }

  // Update state when user sorts column
  sortColumn(columnIndex: number) {
    this.store.dispatch(new SortColumn(columnIndex));
  }

  // Resize column
  resize(event, i) {
    console.log('resize', event);
    // this.store.dispatch(new ResizeColumn(columnIndex));

  }

}
