import { all } from 'redux-saga/effects';

import commitsSaga from './commitsSaga';
import branchesSaga from './branchesSaga';
import pullsSaga from './pullsSaga';
import buildsSaga from './buildsSaga';
import buildReqSaga from './buildReqSaga';

export default function* rootSaga() {
 yield all([
  commitsSaga(),
  branchesSaga(),
  pullsSaga(),
  buildsSaga(),
  buildReqSaga()
 ]);
}
