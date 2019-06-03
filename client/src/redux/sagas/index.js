import { all } from 'redux-saga/effects';

import commitsSaga from './commitsSaga';
import branchesSaga from './branchesSaga';

export default function* rootSaga() {
	yield all([commitsSaga(), branchesSaga()]);
}
