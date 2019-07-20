import { all } from 'redux-saga/effects';

import commitsSaga from './commitsSaga';
import branchesSaga from './branchesSaga';
import pullsSaga from './pullsSaga';
import buildersSaga from './buildersSaga';
import buildSetSaga from './buildSetSaga';

export default function* rootSaga() {
  yield all([
    commitsSaga(),
    branchesSaga(),
    pullsSaga(),
    buildersSaga(),
    buildSetSaga()
  ]);
}
