import { takeEvery, call, put, select } from 'redux-saga/effects';
import { COMMITS } from '../constants';
import { fetchCommits } from '../api';
import { setCommits, setCommitsError } from '../actions';
export const getBranch = state => state.branch;

function* handleCommitsLoad() {
	try {
		const branch = yield select(getBranch);
		const commits = yield call(fetchCommits, branch);
		yield put(setCommits(commits));
	} catch (error) {
		//dispatch error
		yield put(setCommitsError(error.toString()));
	}
}

export default function* watchCommitsLoad() {
	yield takeEvery(COMMITS.LOAD, handleCommitsLoad);
}
