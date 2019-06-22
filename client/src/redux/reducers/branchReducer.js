import { BRANCHES } from '../constants';

const branchReducer = (state = [], action) => {
 if (action.type === BRANCHES.LOAD_SUCCESS) {
  return [...action.branches];
 }
 return state;
};

export default branchReducer;
