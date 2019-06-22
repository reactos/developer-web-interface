import { takeEvery, call, put } from 'redux-saga/effects';
import { BRANCHES } from '../constants';
import { fetchBranches } from '../api';
import { setBranches, setBranchesError } from '../actions';

function* handleBranchesLoad() {
 try {
  const branches = yield call(fetchBranches);
  yield put(setBranches(branches));
 } catch (error) {
  //dispatch error
  yield put(setBranchesError(error.toString()));
 }
}

export default function* watchBranchesLoad() {
 yield takeEvery(BRANCHES.LOAD, handleBranchesLoad);
}
