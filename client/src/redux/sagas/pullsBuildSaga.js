import { takeEvery, call, put, select } from 'redux-saga/effects';
import { PULLS } from '../constants';
import { fetchBuildSets, fetchBuildReq, fetchBuilds } from '../api';
import { setBuildSetsError, setBuilds } from '../actions';

function convertIsoToUnixTime(isoF, isoL) {
  let unixF = Date.parse(isoF.created_at) / 1000 + 30000;
  let unixL = Date.parse(isoL.created_at) / 1000;
  return '&submitted_at__le=' + unixF + '&submitted_at__ge=' + unixL;
}

function getBuildQString(builds) {
  return builds
    .map(build => 'buildrequestid__contains=' + build.buildrequestid)
    .join('&');
}

function getBuildReqQString(pulls, buildSetsRaw) {
  var a = pulls
    .flatMap(pull =>
      buildSetsRaw.filter(
        build =>
          build.sourcestamps[0].branch === `refs/pull/${pull.number}/head` ||
          build.sourcestamps[0].branch === `refs/pull/${pull.number}/merge` ||
          build.sourcestamps[0].revision === `${pull.merge_commit_sha}`
      )
    )
    .map(bd => 'buildsetid__contains=' + bd.bsid)
    .join('&');
  return a;
}

function* handlePullsBuildLoad() {
  try {
    const pulls = yield select(state => state.pulls);
    const buildSetsRaw = yield call(
      fetchBuildSets,
      convertIsoToUnixTime(pulls[0], pulls[9])
    );
    if (buildSetsRaw.length === 0) {
      yield put(setBuildSetsError('Nothing returned'));
      return;
    }

    const buildReqsRaw = yield call(
      fetchBuildReq,
      getBuildReqQString(pulls, buildSetsRaw)
    );

    const buildsRaw = yield call(fetchBuilds, getBuildQString(buildReqsRaw));

    const buildsByPR = {};
    for (let { number, merge_commit_sha } of pulls) {
      const buildSetIds = buildSetsRaw
        .filter(
          bs =>
            bs.sourcestamps[0].branch === `refs/pull/${number}/head` ||
            bs.sourcestamps[0].branch === `refs/pull/${number}/merge` ||
            bs.sourcestamps[0].revision === `${merge_commit_sha}`
        )
        .map(bs => bs.bsid);
      const buildReqIds = buildReqsRaw
        .filter(br => buildSetIds.includes(br.buildsetid))
        .map(br => br.buildrequestid);
      const builds = buildsRaw.filter(b =>
        buildReqIds.includes(b.buildrequestid)
      );
      buildsByPR[number] = builds;
    }
    yield put(setBuilds(buildsByPR));
  } catch (error) {
    yield put(setBuildSetsError(error.toString()));
  }
}

export default function* watchPullsBuildLoad() {
  yield takeEvery(PULLS.LOAD_SUCCESS, handlePullsBuildLoad);
}
