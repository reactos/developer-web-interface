import { takeEvery, call, select, put } from 'redux-saga/effects';
import { COMMITS } from '../constants';
import { fetchTests } from '../api';
import { setTestman, setTestmanError } from '../actions';

function* handleTestmanLoad() {
  try {
    const commits = yield select(state => state.commits);
    const page = 1;
    const shas = commits.map(commit => commit.sha);
    const testResults = yield call(fetchTests, shas[9], shas[0], page);
    const testBySha = {};
    for (let { sha } of commits) {
      const testData = testResults.filter(test =>
        sha.startsWith(test.revision._text)
      );
      testBySha[sha] = testData || [];
    }
    yield put(setTestman(testBySha));
  } catch (error) {
    yield put(setTestmanError(error.toString()));
  }
}

export default function* watchTestmanLoad() {
  yield takeEvery(COMMITS.LOAD_SUCCESS, handleTestmanLoad);
}
