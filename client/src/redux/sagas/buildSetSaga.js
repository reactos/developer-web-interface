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
const buildData = state => state.buildData;
const bsid = state => state.bsid;

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
  const build = yield select(buildData);
  var str = matchSha(commit, build);
  if (str) {
   let bsID = yield call(fetchBuildReq, str);
   yield put(setBsID(bsID));
   //console.log(bsID);
  }
  const build1 = yield select(bsid);
  var str1 = buildStr(build1);
  if (str1) {
   let build2 = yield call(fetchBuilds, str1);
   yield put(setBuilds(build2));
  }
 } catch (error) {
  yield put(setBuildSetsError(error.toString()));
 }
}

export default function* watchBuildsLoad() {
 yield takeEvery(COMMITS.LOAD_SUCCESS, handleBuildsLoad);
}
