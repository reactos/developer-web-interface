import { BUILDERS, BUILDER_TYPE } from '../constants';

/*
Builder object, derived from buildbot
{
  "builders": [
    {
      "builderid": 1,
      "description": null,
      "masterids": [1],
      "name": "Build MSVC_x86",
      "tags": []
    },
    <...>
  ]
}
*/

const builderReducer = (state = {}, action) => {
  if (action.type === BUILDERS.LOAD_SUCCESS) {
    const builders = {};

    for (const builder of action.builders) {
      builders[builder.builderid] = {
        builderid: builder.builderid,
        type: builder.name.startsWith("Build") ? BUILDER_TYPE.BUILDER : BUILDER_TYPE.TESTER,
        name: builder.name.substring(builder.name.indexOf(" ")).trim(),
        full_name: builder.name
      }
    }
    return builders;
  }
  return state;
};

export default builderReducer;
