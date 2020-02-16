import { takeEvery, call, put, select } from 'redux-saga/effects';
import { COMMITS, BUILDER_TYPE } from '../constants';
import { fetchBuildSets, fetchBuildReq, fetchBuilds } from '../api';
import { setBuildsError, setBuilds, setTests } from '../actions';

/* These functions are used to build an HTTP query string for
 * filtering data on BuildBot side.
 * see BuildBot API: http://docs.buildbot.net/latest/developer/rest.html#filtering
 */

/* The function convertIsoToUnixTime takes two parameters (committer.data)
 * first[0] and last commit[9] of the page and converts it to unix time format
 * and is sent along with  fetchBuildSets, and loads only 20-30 datasets into
 * the memory,which is easy to process.
 * +5000 is done to normalize the diffrence between committ date and build triggered.
 * see BuildBot API: http://docs.buildbot.net/latest/developer/rest.html#filtering
 */

function convertIsoToUnixTime(isoF, isoL) {
  let unixF = Date.parse(isoF.commit.committer.date) / 1000 + 5000;
  let unixL = Date.parse(isoL.commit.committer.date) / 1000;
  return '&submitted_at__le=' + unixF + '&submitted_at__ge=' + unixL;
}

function getBuildQString(builds) {
  // besides buildRequestId filtering, we need to get a suffix property from a build
  return "property=suffix&" + builds
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
    const builders = yield select(state => state.builders)

    const buildSetsRaw = yield call(
      fetchBuildSets,
      convertIsoToUnixTime(commits[0], commits[9])
    );
    if (buildSetsRaw.length === 0) {
      yield put(setBuildsError('Nothing returned'));
      return;
    }

    const buildReqsRaw = yield call(
      fetchBuildReq,
      getBuildReqQString(commits, buildSetsRaw)
    );
    const buildsRaw = yield call(fetchBuilds, getBuildQString(buildReqsRaw));

    // populate builds with buildSetId
    for (let b of buildsRaw) {
      b.bsid = buildReqsRaw.find(br => br.buildrequestid === b.buildrequestid).buildsetid
    }

    const buildsBySha = {};
    const testsBySha = {}

    for (let { sha } of commits) {
      const buildSetIds = buildSetsRaw
        .filter(bs => bs.sourcestamps[0].revision === sha)
        .map(bs => bs.bsid);

      // here we separate "test" builds from "build" builds
      // because they are processed by different reducers
      buildsBySha[sha] = buildsRaw.filter(b => 
        builders[b.builderid].type === BUILDER_TYPE.BUILDER && buildSetIds.includes(b.bsid));

      testsBySha[sha] = buildsRaw.filter(b =>
        builders[b.builderid].type === BUILDER_TYPE.TESTER && buildSetIds.includes(b.bsid));

      // populate the parent build data
      for (let t of testsBySha[sha]) {
        const parentBuildId = buildSetsRaw.find(bs => bs.bsid === t.bsid).parent_buildid
        t.parentBuild = buildsBySha[sha].find(b => b.buildid === parentBuildId)
      }
    }

    yield put(setBuilds(buildsBySha));
    yield put(setTests(testsBySha));
  } catch (error) {
    yield put(setBuildsError(error.toString()));
  }
}

export default function* watchBuildsLoad() {
  yield takeEvery(COMMITS.LOAD_SUCCESS, handleBuildsLoad);
}
