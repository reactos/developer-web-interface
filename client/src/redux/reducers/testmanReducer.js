import { TESTMAN_DATA } from '../constants';
const testmanReducer = (state = {}, action) => {
  if (action.type === TESTMAN_DATA.LOAD_SUCCESS) {
    return { ...action.tests };
  }
  return state;
};

export default testmanReducer;
