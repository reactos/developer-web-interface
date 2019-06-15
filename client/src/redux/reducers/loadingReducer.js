import { COMMITS } from '../constants';

const loadingReducer = (state = { newPage: null, load: false }, action) => {
	switch (action.type) {
		case COMMITS.LOAD:
			return { newPage: action.newPage, load: true };
		case COMMITS.LOAD_SUCCESS:
			return { ...state, load: false };
		case COMMITS.LOAD_FAIL:
			return state;

		default:
			return state;
	}
};

export default loadingReducer;
