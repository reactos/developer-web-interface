import { BRANCHES } from '../constants';

const branchReducer = (state = [], action) => {
	if (action.type === BRANCHES.LOAD_SUCCESS) {
		return [...state, ...action.branches];
	}
	return state;
};

export default branchReducer;
