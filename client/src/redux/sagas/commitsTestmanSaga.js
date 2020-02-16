import { takeEvery, call, select, put } from 'redux-saga/effects';
import { TEST_DATA } from '../constants';
import { fetchTests } from '../api';
import { setTestman, setTestmanError } from '../actions';

function* handleTestmanLoad() {
  try {
    const commits = yield select(state => state.commits);
    const builders = yield select(state => state.builders)
    const tests = yield select(state => state.tests)

    let shas = [];
    if (commits.length > 0) {
      shas = [commits[0].sha, ...commits.map(commit => commit.parents[0].sha)];
    }
    const testResults = yield call(fetchTests, shas[shas.length - 1], shas[0], 1);

    // connecting testman entry with buildbot build by testerName + buildNumber
    for (let t of testResults) {
      const buildNumber = parseInt(t.comment._text.match(/Build\s(\d+)/i)[1])
      const testerName = t.source._text.match(/Build\s.*\son\s(Test.*)/i)[1]
      const builder = Object.values(builders).find(b => b.full_name === testerName)
      const builderId = builder.builderid

      for (let shaTests of Object.values(tests)) {
        for (let test of Object.values(shaTests)) {
          if (test.number === buildNumber && test.builderId === builderId)
          {
            t.buildBotId = test.buildBotId
            t.testerName = builder.name
            break
          }
        }
        if (t.buildBotId) break
      }
    }

    const testBySha = {};
    for (let sha of shas) {
      testBySha[sha] = testResults.filter(test =>
        sha.startsWith(test.revision._text)
      );
    }
    yield put(setTestman(testBySha));
  } catch (error) {
    yield put(setTestmanError(error.toString()));
  }
}

export default function* watchTestmanLoad() {
  yield takeEvery(TEST_DATA.LOAD_SUCCESS, handleTestmanLoad);
}
