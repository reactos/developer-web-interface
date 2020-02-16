import { BUILD_DATA, JOB_STATUS } from '../constants';


export default function buildsReducer(state = {}, action) {
  if (action.type === BUILD_DATA.LOAD_SUCCESS) {
    const buildsBySha = {}

    for (let [sha, builds] of Object.entries(action.builds)) {
      buildsBySha[sha] = builds.map(b => {
        let isoSuffix, status

        if (b.properties && b.properties.suffix && b.properties.suffix[0]) {
          isoSuffix = b.properties.suffix[0]
        }

        if (!b.complete) status = JOB_STATUS.ONGOING
        else if (b.state_string.includes("success")) status = JOB_STATUS.SUCCESS
        else status = JOB_STATUS.FAILURE

        return {
          builderId: b.builderid,
          buildId: b.buildid,
          number: b.number,
          statusText: b.state_string,
          status,
          isoSuffix
        }
      })
    }

    return buildsBySha
  }

  return state
}
