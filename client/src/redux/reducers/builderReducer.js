import { BUILDERS } from '../constants';

const builderReducer = (state = {}, action) => {
  if (action.type === BUILDERS.LOAD_SUCCESS) {
    const builders = {};
    for (const builder of action.builders) {
      builders[action.builders.builderid] = builder;
    }
    return builders;
  }
  return state;
};

export default builderReducer;
