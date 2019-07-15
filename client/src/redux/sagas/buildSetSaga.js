import { takeEvery, call, put, select } from 'redux-saga/effects';
import { COMMITS } from '../constants';
import { fetchBuildSets, fetchBuildReq, fetchBuilds } from '../api';
import {
 setBuildSets,
 setBuildSetsError,
 setBsID,
 setBuilds
} from '../actions';

const commitSha = state => state.commits;
function buildStr(build) {
 let str = build
  .map(build => 'buildrequestid__contains=' + build.buildrequestid)
  .join('&');
 return str;
}

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
 // console.log(filterBs);

 var merged = [].concat.apply([], filterBs);
 //console.log(merged);
 let str = merged.map(bsid => 'buildsetid__contains=' + bsid.bsid).join('&');
 return str;
}

function* handleBuildsLoad() {
 try {
  const buildSets = yield call(fetchBuildSets);
  yield put(setBuildSets(buildSets));
  const commit = yield select(commitSha);
  var buildReqStr = matchSha(commit, buildSets);
  if (buildReqStr) {
   var bsID = yield call(fetchBuildReq, buildReqStr);
   yield put(setBsID(bsID));
  }
  var buildstr = buildStr(bsID);
  if (buildstr) {
   let buildData = yield call(fetchBuilds, buildstr);
   yield put(setBuilds(buildData));
  }
 } catch (error) {
  yield put(setBuildSetsError(error.toString()));
 }
}

export default function* watchBuildsLoad() {
 yield takeEvery(COMMITS.LOAD_SUCCESS, handleBuildsLoad);
}
