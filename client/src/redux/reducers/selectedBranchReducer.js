import { BRANCHES } from '../constants';

const selectedBranchReducer = (state = 'master', action) => {
 if (action.type === BRANCHES.CURRENT) {
  return action.branch;
 }
 return state;
};

export default selectedBranchReducer;
