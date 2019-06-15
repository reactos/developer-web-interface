import { BRANCHES } from '../constants';
const commitPageReducer = (state = { next: 1, prev: 0 }, action) => {
	switch (action.type) {
		case BRANCHES.CURRENT:
			return {
				next: 1,
				prev: 0
			};
		case 'PAGE_LOAD_SUCCESS':
			return {
				next: action.next,
				prev: action.prev
			};
		default:
			return state;
	}
};

export default commitPageReducer;
