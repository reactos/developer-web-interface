//handling the buildset endpoint
import { BUILD_DATA } from '../constants';
const buildsReducer = (state = [], action) => {
 if (action.type === BUILD_DATA.LOAD_SUCCESS) {
  return [...action.buildSets];
 }
 return state;
};

export default buildsReducer;
