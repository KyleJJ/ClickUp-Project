import { Pipe, PipeTransform } from '@angular/core';
import { Column } from 'src/app/interfaces/data.interface';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  transform(columns: Column[], searchInput: string): Column[] {
    // Return unfilterd columns if invalid search input
    let splitInput = searchInput.split(':');
    if (splitInput.length < 2) {
      return columns;
    } else if (splitInput[1].length < 2) {
      return columns;
    }
    let header = splitInput[0];
    let condition = splitInput[1];

    // Get stats for column matching input header
    let stats = columns.find(column => column.header.toLowerCase() === header).stats;

    // Initialize of array of indices to filter
    let indices = new Array(stats.length);
    for (let i = 0; i < indices.length; i++) {
      indices[i] = i;
    }
    // Filter indices if stats satisfy input condition
    if (condition.charAt(0) === '<') {
      indices.filter(a => parseFloat(stats[a]) < parseFloat(condition.substr(1)));
    } else if (condition.charAt(0) === '>') {
      indices.filter(a => parseFloat(stats[a]) > parseFloat(condition.substr(1)));
    } else {
      indices.filter(a => ('' + stats[a]).search(condition) > 0);
    }

    // Filter columns
    let newColumns = JSON.parse(JSON.stringify(columns));
    for (let i = 0; i < newColumns.length; i++) {
      newColumns[i].stats = [];
    }
    for (let i = 0; i < indices.length; i++) {
      for (let j = 0; j < columns.length; j++) {
        newColumns[j].stats.push(columns[j].stats[indices[i]]);
      }
    }
    
    return newColumns;
  }

}
