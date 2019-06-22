import { takeEvery, call, put, select } from 'redux-saga/effects';
import { COMMITS } from '../constants';
import { fetchCommits } from '../api';
import { setCommits, setCommitsError, setPages } from '../actions';
export const getBranch = state => state.branch;
export const getNewPage = state => parseInt(state.isLoading.newPage, 10);

function* handleCommitsLoad() {
 try {
  const branch = yield select(getBranch);
  const newPage = yield select(getNewPage);
  let commits = yield call(fetchCommits, branch, newPage);
  yield put(setCommits(commits.commits.body));
  yield put(
   setPages(
    commits.page.next !== undefined ? commits.page.next.page : null,
    commits.page.prev !== undefined ? commits.page.prev.page : null
   )
  );
 } catch (error) {
  //dispatch error
  yield put(setCommitsError(error.toString()));
 }
}

export default function* watchCommitsLoad() {
 yield takeEvery(COMMITS.LOAD, handleCommitsLoad);
}
