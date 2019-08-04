import { takeEvery, call, select } from 'redux-saga/effects';
import { COMMITS } from '../constants';
import { fetchTests } from '../api';

function* handleTestmanLoad() {
  try {
    const commits = yield select(state => state.commits);
    const page = 1;
    const shas = commits.map(commit => commit.sha);
    const testResults = yield call(fetchTests, shas[9], shas[0], page);
    const testBySha = {};
    for (let { sha } of commits) {
      const testData = testResults.filter(test =>
        sha.includes(test.revision._text)
      );
      testBySha[sha] = testData;
    }
    console.log(testBySha);
  } catch (error) {}
}

export default function* watchTestmanLoad() {
  yield takeEvery(COMMITS.LOAD_SUCCESS, handleTestmanLoad);
}
