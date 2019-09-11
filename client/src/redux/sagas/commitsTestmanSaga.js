import { takeEvery, call, select, put } from 'redux-saga/effects';
import { COMMITS } from '../constants';
import { fetchTests } from '../api';
import { setTestman, setTestmanError } from '../actions';

function* handleTestmanLoad() {
  try {
    const commits = yield select(state => state.commits);
    let shas = [];
    if (commits.length > 0) {
      shas = [commits[0].sha, ...commits.map(commit => commit.parents[0].sha)];
    }
    const testResults = yield call(fetchTests, shas[shas.length - 1], shas[0], 1);
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
  yield takeEvery(COMMITS.LOAD_SUCCESS, handleTestmanLoad);
}
