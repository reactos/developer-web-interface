import { TEST_DATA, TESTMAN_DATA, JOB_STATUS } from '../constants';


export default function testsReducer(state = {}, action) {
  if (action.type === TEST_DATA.LOAD_SUCCESS) {
    const newState = {}

    for (let [sha, tests] of Object.entries(action.tests)) {
      const testsOfSha = {}

      for (let test of tests) {
        let status

        if (!test.complete) status = JOB_STATUS.ONGOING
        else if (test.state_string.includes("success")) status = JOB_STATUS.SUCCESS
        else status = JOB_STATUS.FAILURE

        testsOfSha[test.buildid] = {
          builderId: test.builderid,
          buildBotId: test.buildid,
          number: test.number,
          statusText: test.state_string,
          status,
          testManData: null,
          parentBuild: test.parentBuild
        }
      }

      newState[sha] = testsOfSha
    }
    return newState
  }
  else if (action.type === TESTMAN_DATA.LOAD_SUCCESS) {
    const newState = {...state}

    for (let [sha, tests] of Object.entries(action.testmanTests)) {
      for (let t of tests) {
        if (newState[sha] && newState[sha][t.buildBotId]) {
          newState[sha][t.buildBotId].testManData = {
            id: parseInt(t.id._text),
            platform: t.platform._text,
            count: parseInt(t.count._text),
            failures: parseInt(t.failures._text)
          }
        }
      }
    }

    return newState
  }

  return state
}
