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
   const filteredBS = commits.map(commit =>
    buildSets.filter(bd => bd.sourcestamps[0].revision === commit.sha)
   );
   const shas = commits.map(commit => commit.sha);
   const output = filteredBS.map((obj, index) => {
    let buildObj = {};
    let filterObj = [];
    obj.forEach(val => {
     filterObj.push(bsID.filter(item => item.buildsetid === val.bsid));
    });
    let buildStatus = [];
    filterObj.forEach(val =>
     val.forEach(build => {
      buildStatus.push(
       buildData.filter(
        bReqId => bReqId.buildrequestid === build.buildrequestid
       )
      );
     })
    );
    buildObj[shas[index]] = buildStatus.flat();
    return buildObj;
   });
   yield put(setBuilds(output));
   //  console.log(output);
  }
 } catch (error) {
  yield put(setBuildSetsError(error.toString()));
 }
}

export default function* watchBuildsLoad() {
 yield takeEvery(COMMITS.LOAD_SUCCESS, handleBuildsLoad);
}
