import { COMMITS } from '../constants';

const branchReducer = (state = null, action) => {
	switch (action.type) {
	case COMMITS.LOAD_SUCCESS:
		return state;
	default:
		return state;
	}
};

export default branchReducer;
