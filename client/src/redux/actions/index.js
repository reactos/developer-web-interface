import { COMMITS, BRANCHES, PULLS } from '../constants';

const loadCommits = () => ({
	type: COMMITS.LOAD
});

const setCommits = commits => ({
	type: COMMITS.LOAD_SUCCESS,
	commits
});

const setCommitsError = error => ({
	type: COMMITS.LOAD_FAIL,
	error
});

const loadBranches = () => ({
	type: BRANCHES.LOAD
});

const setBranches = branches => ({
	type: BRANCHES.LOAD_SUCCESS,
	branches
});
const currBranch = branch => ({
	type: BRANCHES.CURRENT,
	branch
});

const setBranchesError = error => ({
	type: BRANCHES.LOAD_FAIL,
	error
});

const loadPulls = () => ({
	type: PULLS.LOAD
});

const setPulls = pulls => ({
	type: PULLS.LOAD_SUCCESS,
	pulls
});

const setPullsError = error => ({
	type: PULLS.LOAD_FAIL,
	error
});

export {
	loadCommits,
	setCommits,
	setCommitsError,
	loadBranches,
	setBranches,
	setBranchesError,
	currBranch,
	loadPulls,
	setPulls,
	setPullsError
};
