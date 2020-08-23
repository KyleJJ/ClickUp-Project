import { ActionsUnion, ActionTypes } from './data.actions';

export const initialState = {
  columns: []
};

export function DataReducer(state = initialState, action: ActionsUnion) {
  switch (action.type) {

    // Show data after it's been loaded
    case ActionTypes.ShowData:
      return {
        columns: action.payload
      };
    
    // Move column from oldIndex to newIndex
    case ActionTypes.MoveColumn:
      let columns = [...state.columns];
      let temp = columns[action.oldIndex];
      if (action.oldIndex > action.newIndex) { // shift columns right
        for (let i = action.oldIndex; i > action.newIndex; i--) {
          columns[i] = columns[i - 1];
        }
      } else { // shift columns left
        for (let i = action.oldIndex; i < action.newIndex; i++) {
          columns[i] = columns[i + 1];
        }
      }
      columns[action.newIndex] = temp;

      // Save in local storage
      localStorage.setItem('state', JSON.stringify({columns: columns}));

      return {
        columns: columns
      }

    default:
      let storedState = localStorage.getItem('state');
      if (storedState) {
        console.log('load stored state:', storedState);
        return JSON.parse(storedState);
      } else {
        console.log('load state: ', state);
        return state;
      }
  }
}