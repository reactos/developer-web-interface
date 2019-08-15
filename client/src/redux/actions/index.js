import {
  COMMITS,
  BRANCHES,
  PULLS,
  BUILD_DATA,
  BUILDERS,
  TESTMAN_DATA
} from '../constants';

export const loadCommits = newPage => ({
  type: COMMITS.LOAD,
  newPage
});

export const setCommits = commits => ({
  type: COMMITS.LOAD_SUCCESS,
  commits
});

export const setCommitsError = error => ({
  type: COMMITS.LOAD_FAIL,
  error
});

export const loadBuildSets = () => ({
  type: BUILD_DATA.LOAD
});
export const setBuilds = build => ({
  type: BUILD_DATA.LOAD_SUCCESS,
  build
});

export const setBuildSetsError = error => ({
  type: BUILD_DATA.LOAD_FAIL,
  error
});

export const loadTestman = () => ({
  type: TESTMAN_DATA.LOAD
});
export const setTestman = tests => ({
  type: TESTMAN_DATA.LOAD_SUCCESS,
  tests
});

export const setTestmanError = error => ({
  type: TESTMAN_DATA.LOAD_FAIL,
  error
});

export const setPages = (next, prev) => ({
  type: 'PAGE_LOAD_SUCCESS',
  next,
  prev
});
export const loadBranches = () => ({
  type: BRANCHES.LOAD
});

export const setBranches = branches => ({
  type: BRANCHES.LOAD_SUCCESS,
  branches
});
export const currBranch = branch => ({
  type: BRANCHES.CURRENT,
  branch
});

export const setBranchesError = error => ({
  type: BRANCHES.LOAD_FAIL,
  error
});

export const loadBuilders = () => ({
  type: BUILDERS.LOAD
});

export const setBuilders = builders => ({
  type: BUILDERS.LOAD_SUCCESS,
  builders
});

export const setBuildersError = error => ({
  type: BUILDERS.LOAD_FAIL,
  error
});

export const currState = pullState => ({
  type: PULLS.CURRENT,
  pullState
});
export const loadPulls = newPage => ({
  type: PULLS.LOAD,
  newPage
});

export const setPulls = pulls => ({
  type: PULLS.LOAD_SUCCESS,
  pulls
});

export const setPullsError = error => ({
  type: PULLS.LOAD_FAIL,
  error
});
