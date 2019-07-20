import { BUILDERS } from '../constants';

const builderReducer = (state = [], action) => {
 if (action.type === BUILDERS.LOAD_SUCCESS) {
  return [...action.builders];
 }
 return state;
};

export default builderReducer;
