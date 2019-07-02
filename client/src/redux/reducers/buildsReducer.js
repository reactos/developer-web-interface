import { BUILD_DATA } from '../constants';

const buildsReducer = (
 state = { buildSets: null, buildRequests: null, builds: null },
 action
) => {
 if (action.type === BUILD_DATA.LOAD_SUCCESS) {
  return {
   buildSets: action.buildSets,
   buildRequests: action.buildRequests,
   builds: action.builds
  };
 }
 return state;
};

export default buildsReducer;
