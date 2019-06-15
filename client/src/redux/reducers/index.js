import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import commitsReducer from './commitsReducer';
import commitErrorReducer from './commitErrorReducer';
import branchReducer from './branchReducer';
import selectedBranchReducer from './selectedBranchReducer';
import pullsReducer from './pullsReducer';
import commitPageReducer from './commitPageReducer';

const rootReducer = combineReducers({
	isLoading: loadingReducer,
	commits: commitsReducer,
	commitError: commitErrorReducer,
	branches: branchReducer,
	branch: selectedBranchReducer,
	pulls: pullsReducer,
	commitPage: commitPageReducer
});

export default rootReducer;
