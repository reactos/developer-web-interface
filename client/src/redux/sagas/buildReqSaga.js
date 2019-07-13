import { takeEvery, call, select, put } from 'redux-saga/effects';
import { COMMITS } from '../constants';
import { fetchBuildReq } from '../api';
import { setBuildSetsError, setBsID } from '../actions';
const commitSha = state => state.commits;
const buildData = state => state.buildData;

function matchSha(commits, buildData) {
 let cs = commits.map(commit => {
  return commit.sha;
 });
 let bs = buildData.map(builds => {
  return builds;
 });
 var filterBs = [];
 cs.forEach(val => {
  filterBs.push(
   bs
    .map(obj => {
     return obj;
    })
    .filter(item => item.sourcestamps[0].revision === val)
  );
 });

 var merged = [].concat.apply([], filterBs);

 let str = merged.map(bsid => 'buildsetid__contains=' + bsid.bsid).join('&');
 return str;
}

function* handleBuildReqLoad() {
 try {
  const commit = yield select(commitSha);
  const build = yield select(buildData);
  var str = matchSha(commit, build);
  if (str) {
   let bsID = yield call(fetchBuildReq, str);
   yield put(setBsID(bsID));
   //console.log(bsID);
  }
 } catch (error) {
  yield put(setBuildSetsError(error.toString()));
 }
}

export default function* watchBuildsLoad() {
 yield takeEvery(COMMITS.LOAD_SUCCESS, handleBuildReqLoad);
}
