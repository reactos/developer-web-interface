import { COMMITS } from '../constants';

const errorReducer = (state = null, action) => {
	switch (action.type) {
	case COMMITS.LOAD_FAIL:
		return action.error;
	case COMMITS.LOAD_SUCCESS:
		return null;
	case COMMITS.LOAD:
		return null;

	default:
		return state;
	}
};

export default errorReducer;
