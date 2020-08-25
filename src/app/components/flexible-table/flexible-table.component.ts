import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Data, Column } from '../../interfaces/data.interface';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { MoveColumn, SortColumn, ResizeColumn } from 'src/app/store/data.actions';

@Component({
  selector: 'flexible-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './flexible-table.component.html',
  styleUrls: ['./flexible-table.component.scss']
})
export class FlexibleTableComponent implements OnInit {

  @Input() data: Data;

  public columns: Column[] = [];
  public sortColumns: number[] = [];
  public startX = 0;
  public searchInput: string = '';

  constructor(private store: Store<Data>) { }

  ngOnInit(): void {
    // this.columns = this.columns;
  }

  ngOnChanges(changes) {
    console.log('changes', changes);
    this.columns = changes.data.currentValue.columns;
    this.sortColumns = changes.data.currentValue.sortColumns;
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

  // Filter columns for search term
  searchTable() {
    // Check for invalid search input
    let splitInput = this.searchInput.toLowerCase().split(':');
    if (splitInput.length < 2) {
      this.columns = this.data.columns;
    } else if (splitInput[1].length < 2) {
      this.columns = this.data.columns;
    }
    let header = splitInput[0];
    let condition = splitInput[1];
    // Get stats for column matching input header
    let stats = this.data.columns.find(column => column.header.toLowerCase() === header).stats;
    // Initialize of array of indices to filter
    let indices = stats.map((v, i, a) => i);
    // Filter indices if stats satisfy input condition
    if (condition.charAt(0) === '<') {
      indices = indices.filter(a => parseFloat(stats[a]) < parseFloat(condition.substr(1)));
    } else if (condition.charAt(0) === '>') {
      indices = indices.filter(a => parseFloat(stats[a]) > parseFloat(condition.substr(1)));
    } else {
      indices = indices.filter(a => ('' + stats[a]).toLowerCase().search(condition) > 0);
    }
    // Filter all columns with filtered indices
    let newColumns = JSON.parse(JSON.stringify(this.data.columns));
    for (let i = 0; i < newColumns.length; i++) {
      newColumns[i].stats = [];
    }
    for (let i = 0; i < indices.length; i++) {
      for (let j = 0; j < this.data.columns.length; j++) {
        newColumns[j].stats.push(this.data.columns[j].stats[indices[i]]);
      }
    }
    // Update columns
    this.columns = newColumns;
  } 

}
