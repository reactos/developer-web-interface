import { COMMITS, BRANCHES } from '../constants';

const loadCommits = curr_branch => ({
	type: COMMITS.LOAD,
	curr_branch
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

const setBranchesError = error => ({
	type: BRANCHES.LOAD_FAIL,
	error
});

export {
	loadCommits,
	setCommits,
	setCommitsError,
	loadBranches,
	setBranches,
	setBranchesError
};
