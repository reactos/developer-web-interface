import { BUILDERS } from '../constants';

const builderReducer = (state = {}, action) => {
  if (action.type === BUILDERS.LOAD_SUCCESS) {
    const builders = {};
    for (const builder of action.builders) {
      console.log(builder);
      builders[builder.builderid] = builder;
    }
    return builders;
  }
  return state;
};

export default builderReducer;
