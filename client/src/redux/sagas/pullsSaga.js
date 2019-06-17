import { takeEvery, call, put, select } from 'redux-saga/effects';
import { PULLS } from '../constants';
import { fetchPulls } from '../api';
import { setPulls, setPullsError, setPages } from '../actions';
const getNewPage = state => parseInt(state.isLoading.newPage, 10);

function* handlePullsLoad() {
	try {
		const newPage = yield select(getNewPage);
		let pulls = yield call(fetchPulls, newPage);
		yield put(setPulls(pulls.pulls.body));
		yield put(
			setPages(
				pulls.page.next !== undefined ? pulls.page.next.page : null,
				pulls.page.prev !== undefined ? pulls.page.prev.page : null
			)
		);
	} catch (error) {
		yield put(setPullsError(error.toString()));
	}
}

export default function* watchPullsLoad() {
	yield takeEvery(PULLS.LOAD, handlePullsLoad);
}
