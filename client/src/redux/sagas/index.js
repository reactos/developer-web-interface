import { all } from 'redux-saga/effects';

import commitsSaga from './commitsSaga';
import branchesSaga from './branchesSaga';
import pullsSaga from './pullsSaga';

export default function* rootSaga() {
	yield all([commitsSaga(), branchesSaga(), pullsSaga()]);
}
