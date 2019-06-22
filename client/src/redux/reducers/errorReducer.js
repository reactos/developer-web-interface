import { COMMITS, BRANCHES, PULLS } from '../constants';

const errorReducer = (state = null, action) => {
 switch (action.type) {
  case COMMITS.LOAD_FAIL:
   return action.error;
  case COMMITS.LOAD_SUCCESS:
   return null;
  case COMMITS.LOAD:
   return null;
  case BRANCHES.LOAD_FAIL:
   return action.error;
  case BRANCHES.LOAD_SUCCESS:
   return null;
  case BRANCHES.LOAD:
   return null;
  case PULLS.LOAD_FAIL:
   return action.error;
  case PULLS.LOAD_SUCCESS:
   return null;
  case PULLS.LOAD:
   return null;

  default:
   return state;
 }
};

export default errorReducer;
