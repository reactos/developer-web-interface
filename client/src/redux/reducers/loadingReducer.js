import { COMMITS } from '../constants';

const loadingReducer = (state = false, action) => {
	switch (action.type) {
	case COMMITS.LOAD:
		return true;
	case COMMITS.LOAD_SUCCESS:
		return false;
	case COMMITS.LOAD_FAIL:
		return false;

	default:
		return state;
	}
};

export default loadingReducer;
