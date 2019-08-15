import { takeEvery, call, select, put } from 'redux-saga/effects';
import { PULLS } from '../constants';
import { fetchTests } from '../api';
import { setTestman, setTestmanError } from '../actions';

function* handleTestmanLoad() {
  try {
    const pulls = yield select(state => state.pulls);
    const shas = pulls.map(pull => pull.merge_commit_sha);
    const testResults = yield call(fetchTests, shas[9], shas[0], 1);
    const testByPulls = {};
    for (let sha of shas) {
      const testData = testResults.filter(test =>
        sha.startsWith(test.revision._text)
      );
      testByPulls[sha] = testData || [];
    }
    yield put(setTestman(testByPulls));
  } catch (error) {
    yield put(setTestmanError(error.toString()));
  }
}

export default function* watchTestmanLoad() {
  yield takeEvery(PULLS.LOAD_SUCCESS, handleTestmanLoad);
}
