import { COMMITS } from '../constants';

const commitsReducer = (state = [], action) => {
 if (action.type === COMMITS.LOAD_SUCCESS) {
  return [...action.commits];
 }

 return state;
};

export default commitsReducer;
