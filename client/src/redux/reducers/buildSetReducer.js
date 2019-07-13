//handling the buildReq endpoint
const buildSetReducer = (state = [], action) => {
 if (action.type === 'BUILD_SET_ID_SUCCESS') {
  return [...action.bsid];
 }
 return state;
};

export default buildSetReducer;
