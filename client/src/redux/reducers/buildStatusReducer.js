//handling builds endpoint
const buildStatusReducer = (state = [], action) => {
 if (action.type === 'BUILD_ID_LOAD_SUCCESS') {
  return [...action.build];
 }
 return state;
};

export default buildStatusReducer;
