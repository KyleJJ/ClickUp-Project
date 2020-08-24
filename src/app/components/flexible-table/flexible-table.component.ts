import { Component, OnInit, Input } from '@angular/core';
import { Data, Column } from '../../interfaces/data.interface';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { MoveColumn, SortColumn, ResizeColumn } from 'src/app/store/data.actions';

@Component({
  selector: 'flexible-table',
  templateUrl: './flexible-table.component.html',
  styleUrls: ['./flexible-table.component.scss']
})
export class FlexibleTableComponent implements OnInit {

  @Input() data: Data;

  startX = 0;

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
  resizeStart(event) {
    this.startX = event.offsetX;
  }
  resizeEnd(event, i) {
    let pixels = event.offsetX - this.startX;
    this.store.dispatch(new ResizeColumn(i, pixels));
  }

}
