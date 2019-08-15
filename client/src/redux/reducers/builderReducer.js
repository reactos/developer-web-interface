import { BUILDERS } from '../constants';

const builderReducer = (state = {}, action) => {
  if (action.type === BUILDERS.LOAD_SUCCESS) {
    const builders = {};
    for (const builder of action.builders) {
      builders[builder.builderid] = builder;
    }
    return builders;
  }
  return state;
};

export default builderReducer;
