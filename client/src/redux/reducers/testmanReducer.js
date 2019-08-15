import { TESTMAN_DATA } from '../constants';
const testmanReducer = (state = {}, action) => {
  if (action.type === TESTMAN_DATA.LOAD_SUCCESS) {
    let cleanedTestmanData = {};
    for (const [sha, tests] of Object.entries(action.tests)) {
      cleanedTestmanData[sha] = tests.map(t => {
        let reducedKeyVal = {};
        for (const [k, v] of Object.entries(t)) {
          reducedKeyVal[k] = v._text;
        }
        return reducedKeyVal;
      })
    }
    return cleanedTestmanData;
  }

  return state;
};

export default testmanReducer;
