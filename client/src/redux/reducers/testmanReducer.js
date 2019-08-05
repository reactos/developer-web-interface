import { TESTMAN_DATA } from '../constants';
const buildStatusReducer = (state = {}, action) => {
  if (action.type === TESTMAN_DATA.LOAD_SUCCESS) {
    return { ...action.tests };
  }
  return state;
};

export default buildStatusReducer;
