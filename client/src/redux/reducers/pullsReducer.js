import { PULLS } from '../constants';

const pullsReducer = (state = [], action) => {
 if (action.type === PULLS.LOAD_SUCCESS) {
  return [...action.pulls];
 }
 return state;
};

export default pullsReducer;
