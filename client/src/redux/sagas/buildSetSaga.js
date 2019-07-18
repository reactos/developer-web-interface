import { takeEvery, call, put, select } from 'redux-saga/effects';
import { COMMITS } from '../constants';
import { fetchBuildSets, fetchBuildReq, fetchBuilds } from '../api';
import { setBuildSetsError, setBuilds } from '../actions';

const commitSha = state => state.commits;
function buildStr(builds) {
 return builds
  .map(build => 'buildrequestid__contains=' + build.buildrequestid)
  .join('&');
}

function getBuildSetReqString(commits, buildData) {
 return commits
  .map(commit =>
   buildData.filter(bd => bd.sourcestamps[0].revision === commit.sha)
  )
  .flat()
  .map(bd => 'buildsetid__contains=' + bd.bsid)
  .join('&');
}

//=>matchShaToBuild matches buildsetid from filteredBS and bsID
//=>then bsID.buildrequestid is matched with buildData.buildrequestid
//=>An object is array of object is created with key === sha and
//=> value === array of objects containing buildData filtered and stored in buildStatus

function matchShaToBuild(buildData, filteredBS, bsID, shas) {
 return filteredBS.map((obj, index) => {
  let buildObj = {};
  let filterObj = [];
  obj.forEach(val => {
   filterObj.push(bsID.filter(item => item.buildsetid === val.bsid));
  });
  console.log(filterObj);
  let buildStatus = [];
  filterObj.forEach(val =>
   val.forEach(build => {
    buildStatus.push(
     buildData.filter(bReqId => bReqId.buildrequestid === build.buildrequestid)
    );
   })
  );
  buildObj[shas[index]] = buildStatus.flat();
  return buildObj;
 });
}

function* handleBuildsLoad() {
 try {
  const buildSets = yield call(fetchBuildSets);
  const commits = yield select(commitSha);
  let buildReqStr = getBuildSetReqString(commits, buildSets);
  if (buildReqStr.length > 0) {
   var bsID = yield call(fetchBuildReq, buildReqStr);
  }
  let buildstr = buildStr(bsID);
  if (buildstr.length > 0) {
   let buildData = yield call(fetchBuilds, buildstr);
   let shas = [];
   const filteredBS = commits.map(commit => {
    shas.push(commit.sha);
    return buildSets.filter(bd => bd.sourcestamps[0].revision === commit.sha);
   });
   //filteredBS contains builsets corresponding to each sha
   const output = matchShaToBuild(buildData, filteredBS, bsID, shas);
   yield put(setBuilds(output));
  }
 } catch (error) {
  yield put(setBuildSetsError(error.toString()));
 }
}

export default function* watchBuildsLoad() {
 yield takeEvery(COMMITS.LOAD_SUCCESS, handleBuildsLoad);
}
