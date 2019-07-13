import { takeEvery, call, select, put } from 'redux-saga/effects';
import { fetchBuilds } from '../api';
import { setBuildSetsError, setBuilds } from '../actions';
const bsid = state => state.bsid;

function buildStr(build) {
 let str = build
  .map(build => 'buildrequestid__contains=' + build.buildrequestid)
  .join('&');
 return str;
}

function* handleBuildsLoad() {
 try {
  const build = yield select(bsid);
  var str = buildStr(build);
  if (str) {
   let build = yield call(fetchBuilds, str);
   yield put(setBuilds(build));
  }
 } catch (error) {
  yield put(setBuildSetsError(error.toString()));
 }
}

export default function* watchBuildsLoad() {
 yield takeEvery('BUILD_SET_ID_SUCCESS', handleBuildsLoad);
}
