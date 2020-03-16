import { takeEvery, call, put, select } from 'redux-saga/effects';
import { PULLS } from '../constants';
import { fetchPulls } from '../api';
import { setPulls, setPullsError } from '../actions';


function* handlePullsLoad(action) {
  try {
    let pulls = yield call(fetchPulls, action.state, action.newPage);
    yield put(setPulls(pulls.pulls.body));
  } catch (error) {
    yield put(setPullsError(error.toString()));
  }
}

export default function* watchPullsLoad() {
 yield takeEvery(PULLS.LOAD, handlePullsLoad);
}
