import { takeEvery, call, put } from 'redux-saga/effects';
import { BUILD_DATA } from '../constants';
import { fetchBuildSets } from '../api';
import { setBuildSets, setBuildSetsError } from '../actions';
function* handleBuildsLoad() {
 try {
  const buildSets = yield call(fetchBuildSets);
  yield put(setBuildSets(buildSets));
 } catch (error) {
  yield put(setBuildSetsError(error.toString()));
 }
}

export default function* watchBuildsLoad() {
 yield takeEvery(BUILD_DATA.LOAD, handleBuildsLoad);
}
