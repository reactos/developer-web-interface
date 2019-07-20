import { takeEvery, call, put } from 'redux-saga/effects';
import { BUILDERS } from '../constants';
import { fetchBuilders } from '../api';
import { setBuilders, setBuildersError } from '../actions';

function* handleBuildersLoad() {
  try {
    const builders = yield call(fetchBuilders);
    yield put(setBuilders(builders));
  } catch (error) {
    yield put(setBuildersError(error.toString()));
  }
}

export default function* watchBuildersLoad() {
  yield takeEvery(BUILDERS.LOAD, handleBuildersLoad);
}
