import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import commitsReducer from './commitsReducer';
import errorReducer from './errorReducer';
import branchReducer from './branchReducer';
import builderReducer from './builderReducer';
import pullsReducer from './pullsReducer';
import pageReducer from './pageReducer';
import buildStatusReducer from './buildStatusReducer';
import testmanReducer from './testmanReducer';

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  commits: commitsReducer,
  error: errorReducer,
  branches: branchReducer,
  builders: builderReducer,
  pulls: pullsReducer,
  page: pageReducer,
  build: buildStatusReducer,
  testData: testmanReducer
});

export default rootReducer;
