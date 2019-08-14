import { TESTMAN_DATA } from '../constants';
const testmanReducer = (state = {}, action) => {
  if (action.type === TESTMAN_DATA.LOAD_SUCCESS) {
    let cleanedTestmanData = {};
    for (const sha in action.tests) {
      if (action.tests[sha].length > 0) {
        const dataPerSha = [];
        for (const testArray of action.tests[sha]) {
          let reducedKeyVal = {};
          for (const key in testArray) {
            reducedKeyVal[key] = testArray[key]._text;
          }
          dataPerSha.push(reducedKeyVal);
        }
        cleanedTestmanData[sha] = dataPerSha;
      } else {
        cleanedTestmanData[sha] = [];
      }
    }
    return { ...cleanedTestmanData };
  }
  return state;
};

export default testmanReducer;
