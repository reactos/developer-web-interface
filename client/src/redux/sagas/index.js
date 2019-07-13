import { all } from 'redux-saga/effects';

import commitsSaga from './commitsSaga';
import branchesSaga from './branchesSaga';
import pullsSaga from './pullsSaga';
import buildSetSaga from './buildSetSaga';
import buildReqSaga from './buildReqSaga';
import buildsSaga from './buildsSaga';

export default function* rootSaga() {
 yield all([
  commitsSaga(),
  branchesSaga(),
  pullsSaga(),
  buildSetSaga(),
  buildReqSaga(),
  buildsSaga()
 ]);
}
