import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import commitsReducer from './commitsReducer';
import errorReducer from './errorReducer';
import branchReducer from './branchReducer';
import builderReducer from './builderReducer';
import selectedBranchReducer from './selectedBranchReducer';
import pullsReducer from './pullsReducer';
import pageReducer from './pageReducer';
import pullStateReducer from './pullStateReducer';
import buildStatusReducer from './buildStatusReducer';
import testmanReducer from './testmanReducer';

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  commits: commitsReducer,
  error: errorReducer,
  branches: branchReducer,
  builders: builderReducer,
  branch: selectedBranchReducer,
  pulls: pullsReducer,
  pullState: pullStateReducer,
  page: pageReducer,
  build: buildStatusReducer,
  testData: testmanReducer
});

export default rootReducer;
