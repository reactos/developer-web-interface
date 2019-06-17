import { COMMITS, BRANCHES } from '../constants';

const loadingReducer = (state = { newPage: 1, load: false }, action) => {
	switch (action.type) {
		case COMMITS.LOAD:
			return { newPage: action.newPage, load: true };
		case BRANCHES.LOAD_SUCCESS:
			return { newPage: action.newPage, load: true };
		case COMMITS.LOAD_SUCCESS:
			return { ...state, load: false };
		case COMMITS.LOAD_FAIL:
			return state;

		default:
			return { ...state, load: false };
	}
};

export default loadingReducer;
