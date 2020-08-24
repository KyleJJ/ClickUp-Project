import { ActionsUnion, ActionTypes } from './data.actions';
import { Column, Data } from '../interfaces/data.interface';

export const initialState = {
  columns: [],
  sortColumns: []
};

export function DataReducer(state = initialState, action: ActionsUnion) {

  // Copy state
  let newState: Data = JSON.parse(JSON.stringify(state));
  let columns: Column[] = JSON.parse(JSON.stringify(state.columns));
  let sortColumns: number[] = JSON.parse(JSON.stringify(state.sortColumns));

  switch (action.type) {

    // Show data after it's been loaded
    case ActionTypes.ShowData:
      return action.payload;
    
    // Move column from oldIndex to newIndex
    case ActionTypes.MoveColumn:
      let temp = columns[action.oldIndex];
      if (action.oldIndex > action.newIndex) { // shift columns right
        for (let i = action.oldIndex; i > action.newIndex; i--) {
          newState.columns[i] = columns[i - 1];
        }
      } else { // shift columns left
        for (let i = action.oldIndex; i < action.newIndex; i++) {
          newState.columns[i] = columns[i + 1];
        }
      }
      // Place column in new position
      newState.columns[action.newIndex] = temp;
      // Save in local storage
      localStorage.setItem('state', JSON.stringify(newState));
      // Return new state
      return newState;

    // Sort column
    case ActionTypes.SortColumn:
      console.log('sort column ' + action.columnIndex);
      // Remove new column if already being sorted
      if (sortColumns.includes(action.columnIndex)) {
        newState.sortColumns.splice(sortColumns.indexOf(action.columnIndex), 1)
      } else { // Otherwise add the new column with least priority
        newState.sortColumns.push(action.columnIndex);
      }
      // Sort for each selected column
      let sortIndex = 0;
      while (sortIndex < newState.sortColumns.length) {
        let stats = columns[newState.sortColumns[sortIndex]].stats;
        // Create and sort array of indices
        let indices = new Array(stats.length)
        for (let i = 0; i < indices.length; i++) {
          indices[i] = i;
        }
        indices.sort((a, b) => stats[a] < stats[b] ? 1 : stats[a] > stats[b] ? -1 : 0);
        // Update all columns with sorted indices
        for (let i = 0; i < columns.length; i++) {
          for (let j = 0; j < stats.length; j++) {
            newState.columns[i].stats[j] = state.columns[i].stats[indices[j]];
          }
        }
        sortIndex++;
      }
      // Save in local storage
      localStorage.setItem('state', JSON.stringify(newState));
      // Return new state
      return newState;

    // Load data
    default:
      let storedState = localStorage.getItem('state');
      if (storedState) {
        return JSON.parse(storedState);
      } else {
        return state;
      }
  }
}