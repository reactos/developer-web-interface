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
  const commits = yield select(commitSha);
  const buildSetsRaw = yield call(fetchBuildSets);
  if (buildSetsRaw.length === 0) {
   yield put(setBuildSetsError('Nothing returned'));
   return;
  }
  const buildReqStr = getBuildSetReqString(commits, buildSetsRaw);
  const buildReqsRaw = yield call(fetchBuildReq, buildReqStr);
  const buildsStr = buildStr(buildReqsRaw);
  const buildsRaw = yield call(fetchBuilds, buildsStr);
  const buildsBySha = {};
  for (let { sha } of commits) {
   const buildSetIds = buildSetsRaw
    .filter(bs => bs.sourcestamps[0].revision === sha)
    .map(bs => bs.bsid);
   const buildReqIds = buildReqsRaw
    .filter(br => buildSetIds.includes(br.buildsetid))
    .map(br => br.buildrequestid);
   const builds = buildsRaw.filter(b => buildReqIds.includes(b.buildrequestid));
   buildsBySha[sha] = builds;
  }
  yield put(setBuilds(buildsBySha));
 } catch (error) {
  yield put(setBuildSetsError(error.toString()));
 }
}

export default function* watchBuildsLoad() {
 yield takeEvery(COMMITS.LOAD_SUCCESS, handleBuildsLoad);
}
