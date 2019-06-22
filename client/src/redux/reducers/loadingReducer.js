import { COMMITS, BRANCHES, PULLS } from '../constants';

const loadingReducer = (state = { newPage: 1, load: false }, action) => {
 switch (action.type) {
  case COMMITS.LOAD:
   return { newPage: action.newPage, load: true };
  case PULLS.LOAD:
   return { newPage: action.newPage, load: true };
  case BRANCHES.LOAD_SUCCESS:
   return { newPage: action.newPage, load: true };
  case COMMITS.LOAD_SUCCESS:
   return { ...state, load: false };
  case PULLS.LOAD_SUCCESS:
   return { ...state, load: false };
  case COMMITS.LOAD_FAIL:
   return { ...state, load: false };
  case PULLS.LOAD_FAIL:
   return { ...state, load: false };

  default:
   return { ...state, load: false };
 }
};

export default loadingReducer;
