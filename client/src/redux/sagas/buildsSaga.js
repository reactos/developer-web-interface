import { takeEvery, all, call, put } from 'redux-saga/effects';
import { BUILD_DATA } from '../constants';
import { fetchBuildSets, fetchBuildReq, fetchBuilds } from '../api';
import { setBuilds, setBuildError } from '../actions';
function* handleBuildsLoad() {
 try {
  const { buildSets, buildRequests, builds } = yield all({
   buildSets: call(fetchBuildSets),
   buildRequests: call(fetchBuildReq),
   builds: call(fetchBuilds)
  });
  yield put(setBuilds(buildSets, buildRequests, builds));
 } catch (error) {
  yield put(setBuildError(error.toString()));
 }
}

export default function* watchBuildsLoad() {
 yield takeEvery(BUILD_DATA.LOAD, handleBuildsLoad);
}
