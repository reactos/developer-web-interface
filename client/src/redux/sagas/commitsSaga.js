import { throttle, call, put, select } from 'redux-saga/effects';
import { COMMITS } from '../constants';
import { fetchCommits } from '../api';
import { setCommits, setCommitsError } from '../actions';


function* handleCommitsLoad(action) {
  try {
    let commits = yield call(fetchCommits, action.branch, action.newPage)
    yield put(setCommits(commits.commits.body));
  } catch (error) {
    //dispatch error
    yield put(setCommitsError(error.toString()));
  }
}

export default function* watchCommitsLoad() {
  yield throttle(500, COMMITS.LOAD, handleCommitsLoad);
}
