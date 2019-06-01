import { COMMITS } from '../constants';

const loadCommits = () => ({
	type: COMMITS.LOAD
});

const setCommits = commits => ({
	type: COMMITS.LOAD_SUCCESS,
	commits
});

const setError = error => ({
	type: COMMITS.LOAD_FAIL,
	error
});

export { loadCommits, setCommits, setError };
