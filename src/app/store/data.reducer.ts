import { ActionsUnion, ActionTypes } from './data.actions';
import { Column, Data } from '../interfaces/data.interface';

export const initialState = {
  columns: [],
  sortColumns: []
};

export function DataReducer(state = initialState, action: ActionsUnion) {

  switch (action.type) {

    // Show data after it's been loaded
    case ActionTypes.ShowData:
      return action.payload;
    
    // Move column from oldIndex to newIndex
    case ActionTypes.MoveColumn:
      // Copy state
      let stateMove: Data = JSON.parse(JSON.stringify(state));
      // If column landing spot is sorted shift accordingly
      let newSortIndex = state.sortColumns.indexOf(action.newIndex);
      if (newSortIndex !== -1) {
        stateMove.sortColumns[newSortIndex] += action.oldIndex > action.newIndex ? 1 : -1;
      }
      // If column old spot is sorted update sorted indices array
      let oldSortIndex = state.sortColumns.indexOf(action.oldIndex);
      if (oldSortIndex !== -1) {
        stateMove.sortColumns[oldSortIndex] = action.newIndex;
      }
      // Reorder columns by shifting then placing moved column
      let temp = state.columns[action.oldIndex];
      if (action.oldIndex > action.newIndex) { // shift columns right
        for (let i = action.oldIndex; i > action.newIndex; i--) {
          // Update sorted indices
          let iSortIndex = state.sortColumns.indexOf(i);
          if (iSortIndex !== -1 && i !== action.oldIndex) {
            stateMove.sortColumns[iSortIndex] += 1;
          }
          stateMove.columns[i] = state.columns[i - 1];
        }
      } else { // shift columns left
        for (let i = action.oldIndex; i < action.newIndex; i++) {
          let iSortIndex = state.sortColumns.indexOf(i);
          if (iSortIndex !== -1 && i !== action.oldIndex) {
            stateMove.sortColumns[iSortIndex] -= 1;
          }
          stateMove.columns[i] = state.columns[i + 1];
        }
      }
      // Place column in new position
      stateMove.columns[action.newIndex] = temp;
      // Save in local storage
      localStorage.setItem('state', JSON.stringify(stateMove));
      // Return new state
      return stateMove;

    // Sort column
    case ActionTypes.SortColumn:
      // Copy state
      let stateSort: Data = JSON.parse(JSON.stringify(state));
      // Remove new column if already being sorted
      let colSortIndex = state.sortColumns.indexOf(action.columnIndex)
      if (colSortIndex !== -1) {
        stateSort.sortColumns.splice(colSortIndex, 1)
      } else { // Otherwise add the new column with least priority
        stateSort.sortColumns.push(action.columnIndex);
      }
      // Sort for each selected column
      let sortIndex = 0;
      while (sortIndex < stateSort.sortColumns.length) {
        let stats = state.columns[stateSort.sortColumns[sortIndex]].stats;
        // Create and sort array of indices
        let sortIndices = stats.map((v, i, a) => i);
        sortIndices.sort((a, b) => stats[a] < stats[b] ? 1 : stats[a] > stats[b] ? -1 : 0);
        // Update all columns with sorted indices
        for (let i = 0; i < state.columns.length; i++) {
          for (let j = 0; j < stats.length; j++) {
            stateSort.columns[i].stats[j] = state.columns[i].stats[sortIndices[j]];
          }
        }
        sortIndex++;
      }
      // Save in local storage
      localStorage.setItem('state', JSON.stringify(stateSort));
      // Return new state
      return stateSort;


    case ActionTypes.ResizeColumn:
      // Copy state
      let stateResize: Data = JSON.parse(JSON.stringify(state));
      stateResize.columns[action.columnIndex].width += action.pixels;
      return stateResize;

    // Load data
    default:
      return state;
  }
}