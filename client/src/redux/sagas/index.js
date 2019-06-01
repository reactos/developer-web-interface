import { all } from 'redux-saga/effects';

import commitsSaga from './commitsSaga';

export default function* rootSaga() {
	yield all([commitsSaga()]);
}
