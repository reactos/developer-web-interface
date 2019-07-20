import { takeEvery, call, put, select } from 'redux-saga/effects';
import { COMMITS } from '../constants';
import { fetchBuildSets, fetchBuildReq, fetchBuilds } from '../api';
import { setBuildSetsError, setBuilds } from '../actions';

/* These functions are used to build an HTTP query string for
 * filtering data on BuildBot side.
 * see BuildBot API: http://docs.buildbot.net/latest/developer/rest.html#filtering
 */
function getBuildQString(builds) {
  return builds
    .map(build => 'buildrequestid__contains=' + build.buildrequestid)
    .join('&');
}

function getBuildReqQString(commits, buildData) {
  return commits
    .flatMap(commit =>
      buildData.filter(bd => bd.sourcestamps[0].revision === commit.sha)
    )
    .map(bd => 'buildsetid__contains=' + bd.bsid)
    .join('&');
}

/* Get a build object for all commit SHAs we have.
 * BuildBot requires us to make at least 3 requests for it:
 * 1st step: get all BuildSets, which contain our SHA in sourcestamps array
 *   NOTE: multiple BuildSets can represent one commit!
 * 2nd step: using all BuildSet IDs (bsid field), fetch all BuildRequests
 *   which belong to BuildsSets
 * 3rd step: using all BuildRequest IDs (buildrequestid field), fetch all Builds
 *   which to our BuildRequests
 * PROFIT! Now just construct a proper object from all of this data
 * See BuildBot API: http://docs.buildbot.net/latest/developer/rest.html#raml-specs
 */
function* handleBuildsLoad() {
  try {
    const commits = yield select(state => state.commits);
    const buildSetsRaw = yield call(fetchBuildSets);
    if (buildSetsRaw.length === 0) {
      yield put(setBuildSetsError('Nothing returned'));
      return;
    }

    const buildReqsRaw = yield call(
      fetchBuildReq,
      getBuildReqQString(commits, buildSetsRaw)
    );

    console.log(buildReqsRaw);
    const buildsRaw = yield call(fetchBuilds, getBuildQString(buildReqsRaw));

    const buildsBySha = {};

    for (let { sha } of commits) {
      const buildSetIds = buildSetsRaw
        .filter(bs => bs.sourcestamps[0].revision === sha)
        .map(bs => bs.bsid);
      const buildReqIds = buildReqsRaw
        .filter(br => buildSetIds.includes(br.buildsetid))
        .map(br => br.buildrequestid);
      const builds = buildsRaw.filter(b =>
        buildReqIds.includes(b.buildrequestid)
      );
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
