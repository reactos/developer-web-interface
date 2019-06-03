import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import commitsReducer from './commitsReducer';
import errorReducer from './errorReducer';
import branchReducer from './branchReducer';

const rootReducer = combineReducers({
	isLoading: loadingReducer,
	commits: commitsReducer,
	error: errorReducer,
	branches: branchReducer
});

export default rootReducer;
