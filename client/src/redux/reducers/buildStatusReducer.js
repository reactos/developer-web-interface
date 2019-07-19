//handling builds endpoint
import { BUILD_DATA } from '../constants';
const buildStatusReducer = (state = {}, action) => {
 if (action.type === BUILD_DATA.LOAD_SUCCESS) {
  return { ...action.build };
 }
 return state;
};

export default buildStatusReducer;
