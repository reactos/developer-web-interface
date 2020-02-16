import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import commitsReducer from './commitsReducer';
import errorReducer from './errorReducer';
import branchReducer from './branchReducer';
import builderReducer from './builderReducer';
import pullsReducer from './pullsReducer';
import pageReducer from './pageReducer';
import builds from './builds';
import tests from './tests'

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  commits: commitsReducer,
  error: errorReducer,
  branches: branchReducer,
  builders: builderReducer,
  pulls: pullsReducer,
  page: pageReducer,
  builds,
  tests
});

export default rootReducer;
