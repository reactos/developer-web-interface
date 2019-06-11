import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import commitsReducer from './commitsReducer';
import commitErrorReducer from './commitErrorReducer';
import branchReducer from './branchReducer';
import selectedBranchReducer from './selectedBranchReducer';
import pullsReducer from './pullsReducer';

const rootReducer = combineReducers({
	isLoading: loadingReducer,
	commits: commitsReducer,
	commitError: commitErrorReducer,
	branches: branchReducer,
	branch: selectedBranchReducer,
	pulls: pullsReducer
});

export default rootReducer;
