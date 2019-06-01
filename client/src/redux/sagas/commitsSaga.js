import { takeEvery, call, put } from 'redux-saga/effects';
import { COMMITS } from '../constants';
import { fetchCommits } from '../api';
import { setCommits, setError } from '../actions';

function* handleCommitsLoad() {
	try {
		const commits = yield call(fetchCommits);
		yield put(setCommits(commits));
	} catch (error) {
		//dispatch error
		yield put(setError(error.toString()));
	}
}

export default function* watchCommitsLoad() {
	yield takeEvery(COMMITS.LOAD, handleCommitsLoad);
}
