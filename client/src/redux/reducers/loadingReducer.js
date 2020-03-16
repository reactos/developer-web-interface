import { COMMITS, BRANCHES, PULLS, BUILD_DATA, TEST_DATA, BUILDERS, LOAD_STATE } from '../constants';

const defaultState = {
  byCommit: {},
  buildersDataState: LOAD_STATE.NOT_LOADED,
  commitsLoadInfo: {lastState: LOAD_STATE.NOT_LOADED, currentPage: 1, loadedPages: []},
  pullsLoadInfo: {lastState: LOAD_STATE.NOT_LOADED, currentPage: 1, loadedPages: []},
  buildBotLoadInfo: {lastState: LOAD_STATE.NOT_LOADED},
  testManLoadInfo: {lastState: LOAD_STATE.NOT_LOADED}
}

function loadingReducer(state = defaultState, action) {
  switch (action.type) {
    case BUILDERS.LOAD:
      return { ...state, buildersDataState: LOAD_STATE.LOADING }

    case BUILDERS.LOAD_SUCCESS:
      return { ...state, buildersDataState: LOAD_STATE.LOADED }

    case COMMITS.LOAD: {
      const commitsLoadInfo = {
        ...state.commitsLoadInfo,
        lastState: LOAD_STATE.LOADING,
        lastPage: action.newPage
      }

      return { ...state, commitsLoadInfo}
    }
    case COMMITS.LOAD_SUCCESS: {
      const byCommit = {...state.byCommit}

      const commitsLoadInfo = {
        ...state.commitsLoadInfo,
        lastState: LOAD_STATE.LOADED,
        currentPage: state.commitsLoadInfo.lastPage,
        loadedPages: state.commitsLoadInfo.loadedPages.concat([state.commitsLoadInfo.lastPage])
      }

      for(let commit of Object.values(action.commits))
      {
        byCommit[commit.sha] = {buildBot: LOAD_STATE.LOADING, tests: LOAD_STATE.LOADING}
      }

      return { ...state, byCommit, commitsLoadInfo}
    }
    case BUILD_DATA.LOAD: {
      const byCommit = {...state.byCommit}
      for(let sha of Object.keys(byCommit))
      {
        byCommit[sha] = {buildBot: LOAD_STATE.LOADING, tests: byCommit[sha].tests}
      }

      return {...state, byCommit };
    }
    case PULLS.LOAD: {
      const pullsLoadInfo = {
        ...state.pullsLoadInfo,
        lastState: LOAD_STATE.LOADING,
        lastPage: action.newPage
      }

      return { ...state, pullsLoadInfo}
    }
    case PULLS.LOAD_SUCCESS: {
      const pullsLoadInfo = {
        ...state.pullsLoadInfo,
        lastState: LOAD_STATE.LOADED,
        currentPage: state.pullsLoadInfo.lastPage,
        loadedPages: state.pullsLoadInfo.loadedPages.concat([state.pullsLoadInfo.lastPage])
      }

      return { ...state, pullsLoadInfo }
    }
    case BUILD_DATA.LOAD_SUCCESS: {
      const byCommit = {...state.byCommit}
      for(let [sha, build] of Object.entries(action.builds))
      {
        if (byCommit[sha]) {
          byCommit[sha] = {buildBot: LOAD_STATE.LOADED, tests: byCommit[sha].tests}
        }
      }

      return { ...state, byCommit };
    }
    default:
      return state
  }
};

export default loadingReducer;
