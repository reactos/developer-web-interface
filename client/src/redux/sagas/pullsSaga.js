import { takeEvery, call, put } from 'redux-saga/effects';
import { PULLS } from '../constants';
import { fetchPulls } from '../api';
import { setPulls, setPullsError } from '../actions';

function* handlePullsLoad() {
	try {
		const pulls = yield call(fetchPulls);
		yield put(setPulls(pulls));
	} catch (error) {
		yield put(setPullsError(error.toString()));
	}
}

export default function* watchPullsLoad() {
	yield takeEvery(PULLS.LOAD, handlePullsLoad);
}
